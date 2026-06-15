import pdfplumber
import docx2txt
import google.generativeai as genai
import os
import json
import re
from dotenv import load_dotenv

load_dotenv()

_api_key = os.getenv("GEMINI_API_KEY")
if not _api_key:
    raise RuntimeError("GEMINI_API_KEY is not set. Add it to backend/.env")

genai.configure(api_key=_api_key)
model = genai.GenerativeModel("gemini-2.5-flash")


def extract_text(file_path: str, ext: str) -> dict:
    text = ""

    if ext == "pdf":
        try:
            with pdfplumber.open(file_path) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
        except Exception as e:
            return {"error": f"Could not parse PDF: {e}"}

    elif ext == "docx":
        try:
            text = docx2txt.process(file_path)
        except Exception as e:
            return {"error": f"Could not parse DOCX: {e}"}

    text = text.strip()
    if not text:
        return {"error": "No readable text found. Make sure it's not a scanned image PDF."}

    print(f"[parser] Extracted {len(text)} characters. Sending to Gemini...")
    return analyze_with_llm(text)


def analyze_with_llm(text: str) -> dict:
    text = text[:4000]

    prompt = f"""You are an expert ATS resume analyzer and senior technical recruiter.

Analyze this resume and return ONLY a JSON object. No markdown, no code fences, no explanation. Just the raw JSON.

Resume:
{text}

Return this exact JSON structure with real values filled in:
{{
  "score": 78,
  "ats_compatibility": "Good",
  "sections": [
    {{"name": "Work Experience", "pct": 70, "color": "#7c6af7"}},
    {{"name": "Technical Skills", "pct": 85, "color": "#22c97a"}},
    {{"name": "Education", "pct": 80, "color": "#38bdf8"}},
    {{"name": "Projects", "pct": 75, "color": "#f59e0b"}},
    {{"name": "Formatting", "pct": 72, "color": "#f05252"}}
  ],
  "strengths": ["Python", "React", "Node.js"],
  "weaknesses": ["No metrics on achievements", "Missing summary section"],
  "missing_keywords": ["Docker", "CI/CD", "TypeScript"],
  "improvements": [
    {{"title": "Add measurable achievements", "desc": "Replace vague bullet points with quantified results, e.g. 'Reduced load time by 40%'."}},
    {{"title": "Add a professional summary", "desc": "A 2-3 line summary at the top significantly boosts ATS score and recruiter attention."}},
    {{"title": "Include missing keywords", "desc": "Add Docker, CI/CD, and TypeScript where applicable — they appear in most job descriptions."}},
    {{"title": "Standardize date formats", "desc": "Use consistent date format throughout, e.g. 'Jan 2024 – Present'."}},
    {{"title": "Strengthen project descriptions", "desc": "For each project, mention the tech stack, your role, and the measurable outcome."}}
  ],
  "ats_issues": [
    {{"status": "pass", "label": "Contact info present", "desc": "Email and phone number found in header."}},
    {{"status": "pass", "label": "No graphics detected", "desc": "Clean text layout — ATS will parse correctly."}},
    {{"status": "warn", "label": "Non-standard header", "desc": "Rename 'About Me' to 'Summary' for better ATS recognition."}},
    {{"status": "fail", "label": "Missing LinkedIn URL", "desc": "Add your LinkedIn profile — most ATS systems expect it."}}
  ],
  "recruiter_verdict": "This is a solid fresher resume with good technical skills. The main gaps are lack of quantified achievements and a few missing keywords. With targeted improvements this resume would rank well for entry-level software roles."
}}

Rules:
- "score": integer 0-100 based on ACTUAL resume quality
- "ats_compatibility": one of "Excellent", "Good", "Average", "Poor"  
- "sections[].pct": real scores based on what is ACTUALLY in the resume
- "strengths": actual technologies/skills found in the resume
- "weaknesses": actual problems found in the resume
- "missing_keywords": important keywords NOT found in the resume
- "improvements": 5 specific tips based on THIS resume
- "ats_issues": 4-6 checks based on THIS resume
- "recruiter_verdict": honest 2-3 sentence assessment of THIS resume
"""

    try:
        response = model.generate_content(prompt)
        raw = response.text.strip()
        print(f"[parser] Gemini responded. First 200 chars: {raw[:200]}")

        # Strip any markdown fences Gemini might add
        raw = re.sub(r"^```(?:json)?\s*\n?", "", raw)
        raw = re.sub(r"\n?```\s*$", "", raw)
        raw = raw.strip()

        # Extract JSON object
        start = raw.find("{")
        end = raw.rfind("}") + 1
        if start != -1 and end > start:
            raw = raw[start:end]

        result = json.loads(raw)
        print(f"[parser] Success. Score={result.get('score')}, ATS={result.get('ats_compatibility')}")
        return result

    except json.JSONDecodeError as e:
        print(f"[parser] JSON parse failed: {e}")
        print(f"[parser] Raw was: {response.text[:600]}")
        return {"error": f"AI returned invalid JSON. Try again. Detail: {str(e)}"}

    except Exception as e:
        print(f"[parser] Error calling Gemini: {e}")
        return {"error": f"Gemini API error: {str(e)}"}
