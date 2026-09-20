from fastapi import APIRouter
from models.job import JobSearchQuery
from services.job_market.aggregator import aggregator
from data_science.ranking import job_ranker

router = APIRouter(prefix="/api/jobs", tags=["Jobs"])

@router.post("/search")
async def search_jobs(query: JobSearchQuery):
    # Fetch from aggregator
    raw_res = aggregator.fetch_all_jobs(
        query="Developer",
        location=query.location,
        distance_km=query.distance_km
    )
    
    cand_skills = query.candidate_skills or ["React", "JavaScript", "Node.js", "SQL", "Python"]
    
    # Rank jobs using NumPy matching algorithm
    ranked_jobs = job_ranker.rank_jobs(cand_skills, raw_res["jobs"])

    # Split into categories
    best_matches = [j for j in ranked_jobs if j["match_category"] == "Best"]
    strong_matches = [j for j in ranked_jobs if j["match_category"] == "Strong"]
    potential_matches = [j for j in ranked_jobs if j["match_category"] == "Potential"]
    skill_building = [j for j in ranked_jobs if j["match_category"] == "Skill-Building"]

    return {
        "status": "success",
        "total_listings": raw_res["total_listings"],
        "platform_counts": raw_res["platform_counts"],
        "search_location": raw_res["search_location"],
        "distance_km": raw_res["distance_km"],
        "ranked_jobs": ranked_jobs,
        "categories": {
            "best": best_matches,
            "strong": strong_matches,
            "potential": potential_matches,
            "skill_building": skill_building
        }
    }
