from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from utils.parser import extract_text
import os
import tempfile

app = FastAPI(title="ResumeAI API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "https://resumelensai.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"status": "ok", "service": "ResumeAI API v2"}


@app.get("/health")
def health():
    """Quick check — open this in browser to confirm backend is running."""
    api_key_set = bool(os.getenv("GEMINI_API_KEY"))
    return {"status": "ok", "gemini_api_key_set": api_key_set}


@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    filename = file.filename or ""
    ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""

    if ext not in ("pdf", "docx"):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported.")

    content = await file.read()
    if len(content) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large. Max 5 MB.")

    print(f"[main] Received file: {filename} ({len(content)} bytes)")

    with tempfile.NamedTemporaryFile(delete=False, suffix=f".{ext}") as tmp:
        tmp.write(content)
        tmp_path = tmp.name

    try:
        analysis = extract_text(tmp_path, ext)
    finally:
        os.unlink(tmp_path)

    print(f"[main] Returning analysis: {str(analysis)[:200]}")
    return {"analysis": analysis}
