from pydantic import BaseModel, HttpUrl
from typing import List, Optional

class GitHubAnalyzeRequest(BaseModel):
    githubUrl: str
    targetRole: str

class AnalyzedRepository(BaseModel):
    name: str
    description: Optional[str] = None
    languages: List[str]
    technologies: List[str]
    stars: int
    forks: int
    activity: str # "High", "Medium", "Low"
    detectedSkills: List[str]
    roleRelevance: str # "High", "Medium", "Low"
    url: str

class RecommendedProject(BaseModel):
    title: str
    reason: str
    skillsAdded: List[str]
    technologies: List[str]
    difficulty: str # "Beginner", "Intermediate", "Advanced"

class CategoryScore(BaseModel):
    category: str
    score: int

class RoadmapStep(BaseModel):
    step: int
    title: str
    description: str

class GitHubSummary(BaseModel):
    username: str
    totalRepositories: int
    languages: List[str]
    projectsAnalyzed: int
    targetRole: str
    roleMatchScore: int

class GitHubAnalyzeResponse(BaseModel):
    score: int
    scoreBreakdown: List[CategoryScore]
    skillsDetected: List[str]
    missingSkills: List[dict] # { skill: str, reason: str }
    repositories: List[AnalyzedRepository]
    recommendedProjects: List[RecommendedProject]
    roadmap: List[RoadmapStep]
    summary: GitHubSummary
    aiExplanation: str
