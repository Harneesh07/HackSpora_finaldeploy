from fastapi import APIRouter, UploadFile, File, HTTPException
from services.resume_parser import parser
from services.role_recommender import recommender
from services.ai_service import ai_service

from pydantic import BaseModel

router = APIRouter(prefix="/api/resume", tags=["Resume"])

class TextResumeRequest(BaseModel):
    text: str

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        filename = file.filename
        
        parsed = parser.parse_file(contents, filename)
        
        skill_names = [s["name"] for s in parsed["skills"]]
        role_recommendations = recommender.recommend_roles(skill_names)
        parsed["role_recommendations"] = role_recommendations
        
        return {
            "status": "success",
            "candidate": parsed
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/parse-text")
async def parse_text_resume(req: TextResumeRequest):
    try:
        if not req.text or len(req.text.strip()) < 10:
            raise HTTPException(status_code=400, detail="Resume text is too short.")
        
        parsed = parser.parse_text(req.text, "Pasted Resume Text")
        skill_names = [s["name"] for s in parsed["skills"]]
        role_recommendations = recommender.recommend_roles(skill_names)
        parsed["role_recommendations"] = role_recommendations
        
        return {
            "status": "success",
            "candidate": parsed
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/demo")
async def get_demo_resume():
    try:
        demo = parser.get_demo_resume()
        skill_names = [s["name"] for s in demo["skills"]]
        role_recommendations = recommender.recommend_roles(skill_names)
        demo["role_recommendations"] = role_recommendations
        
        return {
            "status": "success",
            "candidate": demo,
            "is_demo": True
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

