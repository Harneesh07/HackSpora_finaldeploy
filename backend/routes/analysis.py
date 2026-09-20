from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from services.job_market.aggregator import aggregator
from data_science.market_analysis import market_analyzer
from data_science.ranking import job_ranker
from services.skill_gap_analyzer import gap_analyzer
from services.learning_recommender import learning_recommender
from services.job_description_analyzer import jd_analyzer

router = APIRouter(prefix="/api/analysis", tags=["Analysis"])

class MarketMatchRequest(BaseModel):
    candidate_skills: List[str]
    location: str = "Coimbatore, Tamil Nadu, India"
    distance_km: int = 100

class JDAnalyzeRequest(BaseModel):
    job_description: str
    candidate_skills: List[str]

@router.post("/market-match")
async def perform_market_match(req: MarketMatchRequest):
    # Fetch job dataset
    market_data = aggregator.fetch_all_jobs(location=req.location, distance_km=req.distance_km)
    jobs = market_data["jobs"]
    
    # Pandas market frequency & matrix analysis
    analysis_res = market_analyzer.analyze_market(jobs, req.candidate_skills)
    
    # Rank jobs via NumPy
    ranked_jobs = job_ranker.rank_jobs(req.candidate_skills, jobs)
    
    # Gap analysis
    gaps = gap_analyzer.analyze_gaps(req.candidate_skills, analysis_res["skill_frequencies"])
    
    # One-Skill-Away Engine
    one_skill_away = gap_analyzer.find_one_skill_away(req.candidate_skills, ranked_jobs)
    
    # Personalized Learning Recommendations
    learning_roadmap = learning_recommender.recommend(gaps)

    return {
        "status": "success",
        "market_summary": {
            "total_listings": market_data["total_listings"],
            "platform_counts": market_data["platform_counts"],
            "location": market_data["search_location"]
        },
        "ranked_jobs": ranked_jobs,
        "skill_frequencies": analysis_res["skill_frequencies"],
        "comparison_table": analysis_res["comparison_table"],
        "skill_gaps": gaps,
        "one_skill_away": one_skill_away,
        "learning_roadmap": learning_roadmap
    }

@router.post("/jd-analyze")
async def analyze_job_description(req: JDAnalyzeRequest):
    res = jd_analyzer.analyze_jd(req.job_description, req.candidate_skills)
    return {
        "status": "success",
        "analysis": res
    }
