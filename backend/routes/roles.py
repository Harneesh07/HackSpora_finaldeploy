from fastapi import APIRouter
from services.role_recommender import recommender
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/api/roles", tags=["Roles"])

class RecommendRolesRequest(BaseModel):
    candidate_skills: List[str]

@router.get("/list")
async def get_roles():
    return {
        "status": "success",
        "roles": recommender.roles
    }

@router.post("/recommend")
async def recommend_roles_endpoint(req: RecommendRolesRequest):
    recs = recommender.recommend_roles(req.candidate_skills)
    return {
        "status": "success",
        "recommendations": recs
    }
