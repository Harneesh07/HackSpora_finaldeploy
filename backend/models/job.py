from pydantic import BaseModel, Field
from typing import List, Optional

class JobListing(BaseModel):
    id: str
    source: str  # linkedin, indeed, naukri, demo
    title: str
    company: str
    location: str
    description: str
    posted_at: str
    work_mode: str = "Hybrid"  # On-site, Hybrid, Remote
    required_skills: List[str] = []
    preferred_skills: List[str] = []
    apply_url: str
    distance_km: Optional[float] = None
    is_demo: bool = False

class JobMatchResult(BaseModel):
    job: JobListing
    match_score: int
    score_breakdown: dict = Field(default_factory=dict)
    matched_skills: List[str] = []
    missing_skills: List[str] = []
    match_category: str = "Best"  # Best (80-100), Strong (65-79), Potential (50-64), Skill-Building (<50)
    match_reason: str = ""

class JobSearchQuery(BaseModel):
    location: str = "Coimbatore, Tamil Nadu, India"
    distance_km: int = 100
    roles: List[str] = []
    candidate_skills: List[str] = []
    work_mode: Optional[str] = None
    recency_days: int = 7
    platform: str = "All"
