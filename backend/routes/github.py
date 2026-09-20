from fastapi import APIRouter, HTTPException
from models.github import GitHubAnalyzeRequest, GitHubAnalyzeResponse
from services.github_service import github_service
from services.github_ai_analyzer import github_ai_analyzer
import logging

router = APIRouter(prefix="/api/github", tags=["github"])
logger = logging.getLogger(__name__)

@router.post("/analyze", response_model=GitHubAnalyzeResponse)
async def analyze_github_profile(request: GitHubAnalyzeRequest):
    try:
        username = github_service.extract_username(request.githubUrl)
        if not username:
            raise HTTPException(status_code=400, detail="Invalid GitHub URL format.")
            
        # Optional: fetch user profile to verify existence
        profile = github_service.fetch_user_profile(username)
        
        # Fetch repos
        repos = github_service.fetch_user_repositories(username)
        if not repos:
            raise HTTPException(status_code=404, detail="No public repositories found for this user.")
            
        # Analyze
        analysis_response = github_ai_analyzer.analyze_repositories(repos, request.targetRole)
        
        # Update summary username
        analysis_response.summary.username = username
        
        return analysis_response

    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))
    except PermissionError as pe:
        raise HTTPException(status_code=403, detail=str(pe))
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"GitHub Analysis Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to analyze GitHub profile. Please check the URL and try again.")

@router.get("/profile")
async def get_github_profile(url: str):
    username = github_service.extract_username(url)
    if not username:
        raise HTTPException(status_code=400, detail="Invalid GitHub URL")
    try:
        return github_service.fetch_user_profile(username)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
