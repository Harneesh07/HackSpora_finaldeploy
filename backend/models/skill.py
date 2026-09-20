from pydantic import BaseModel
from typing import List, Optional

class SkillDemand(BaseModel):
    skill: str
    category: str
    mention_count: int
    total_jobs: int
    frequency_pct: float
    platform_breakdown: dict = {}  # e.g. {"LinkedIn": 65, "Indeed": 58, "Naukri": 60}
    demand_level: str = "MEDIUM"  # HIGH (>=60%), MEDIUM (30-59%), LOW (<30%)

class SkillGap(BaseModel):
    skill: str
    market_demand_pct: float
    candidate_evidence: str  # Strong, Moderate, Missing
    role_importance: str  # High, Medium, Optional
    learning_priority: str  # High, Medium, Low
    reason: str

class LearningRecommendation(BaseModel):
    skill: str
    priority: str
    market_demand_pct: float
    recommendation: str
    estimated_hours: int = 15
    suggested_project: str
