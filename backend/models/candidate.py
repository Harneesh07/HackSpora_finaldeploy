from pydantic import BaseModel, Field
from typing import List, Optional

class EducationItem(BaseModel):
    degree: str
    institution: str
    year: Optional[str] = None
    field_of_study: Optional[str] = None

class ExperienceItem(BaseModel):
    title: str
    company: str
    duration: Optional[str] = None
    description: Optional[str] = None

class ProjectItem(BaseModel):
    name: str
    description: str
    technologies: List[str] = []

class CandidateSkill(BaseModel):
    name: str
    category: str
    evidence: str = "Strong"  # Strong, Moderate, Limited
    context: Optional[str] = None

class CandidateProfile(BaseModel):
    name: str = "Candidate"
    email: Optional[str] = None
    phone: Optional[str] = None
    location: str = "Coimbatore, Tamil Nadu, India"
    education: List[EducationItem] = []
    experience: List[ExperienceItem] = []
    projects: List[ProjectItem] = []
    certifications: List[str] = []
    skills: List[CandidateSkill] = []
    detected_roles: List[str] = []
    ai_summary: str = ""
    resume_score: int = 80
    score_breakdown: dict = Field(default_factory=dict)
