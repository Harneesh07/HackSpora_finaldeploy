from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import resume, jobs, analysis, roles, location

app = FastAPI(
    title="ResumeIQ Career Intelligence Engine API",
    description="AI Resume Analyzer + Live Job Market Intelligence + Skill Gap Detector",
    version="1.0.0"
)

# Enable CORS for frontend Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API Routers
app.include_router(resume.router)
app.include_router(jobs.router)
app.include_router(analysis.router)
app.include_router(roles.router)
app.include_router(location.router)
from routes import github
app.include_router(github.router)

@app.get("/")
def read_root():
    return {
        "app": "ResumeIQ Engine",
        "status": "online",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
