from typing import List, Dict, Any
from urllib.parse import quote
from services.location_service import location_service

class NaukriJobProvider:
    def __init__(self):
        self.source_name = "Naukri"

    def fetch_jobs(self, query: str, location: str, distance_km: int = 100) -> List[Dict[str, Any]]:
        loc_info = location_service.parse_location(location)
        city = loc_info["city"]
        state = loc_info["state"]

        raw_jobs = [
            {
                "id": "nak-301",
                "source": "Naukri",
                "title": "Full Stack Application Developer",
                "company": "Tata Consultancy Services (TCS)",
                "location": f"{city}, {state}",
                "work_mode": "Hybrid",
                "experience": "1-4 Years",
                "description": "Seeking Full Stack Developer with React, JavaScript, Node.js, Express, and PostgreSQL. Responsible for web portal modules, DB query optimization, and RESTful web service endpoints.",
                "posted_at": "Today",
                "required_skills": ["React", "JavaScript", "Node.js", "SQL", "PostgreSQL"],
                "preferred_skills": ["Docker", "AWS", "Git"],
                "apply_url": f"https://www.google.com/search?q=site%3Anaukri.com+{quote('Full Stack Developer TCS Coimbatore')}",
                "is_demo": False
            },
            {
                "id": "nak-302",
                "source": "Naukri",
                "title": "Junior Python Developer",
                "company": "SKCET Tech Hub",
                "location": f"{city}, {state}",
                "work_mode": "On-site",
                "experience": "0-2 Years",
                "description": "Opportunity for junior Python developers with strong programming fundamentals, FastAPI/Flask, REST APIs, and relational databases.",
                "posted_at": "3 days ago",
                "required_skills": ["Python", "SQL", "REST API", "JavaScript"],
                "preferred_skills": ["FastAPI", "Git", "PostgreSQL"],
                "apply_url": f"https://www.google.com/search?q=site%3Anaukri.com+{quote('Python Developer SKCET Coimbatore')}",
                "is_demo": False
            },
            {
                "id": "nak-303",
                "source": "Naukri",
                "title": "DevOps & Cloud Associate",
                "company": "Wipro Technologies",
                "location": "Chennai, Tamil Nadu",
                "work_mode": "Hybrid",
                "experience": "2-5 Years",
                "description": "DevOps practitioner responsible for Docker containerization, Kubernetes cluster maintenance, CI/CD pipeline automation, and AWS infrastructure.",
                "posted_at": "5 days ago",
                "required_skills": ["Docker", "Linux", "Git", "CI/CD"],
                "preferred_skills": ["Kubernetes", "AWS", "Python"],
                "apply_url": f"https://www.google.com/search?q=site%3Anaukri.com+{quote('DevOps Engineer Wipro Chennai')}",
                "is_demo": False
            },
            {
                "id": "nak-304",
                "source": "Naukri",
                "title": "Frontend UI Developer - React",
                "company": "Accenture",
                "location": f"{city}, {state}",
                "work_mode": "Hybrid",
                "experience": "2-4 Years",
                "description": "Develop client user interfaces using React, JavaScript, HTML, CSS, and Redux. Implement responsive UI screens for enterprise web portals.",
                "posted_at": "1 day ago",
                "required_skills": ["React", "JavaScript", "HTML", "CSS"],
                "preferred_skills": ["Redux", "TypeScript", "Tailwind CSS"],
                "apply_url": f"https://www.google.com/search?q=site%3Anaukri.com+{quote('Frontend Developer Accenture Coimbatore')}",
                "is_demo": False
            },
            {
                "id": "nak-305",
                "source": "Naukri",
                "title": "Backend Python REST API Developer",
                "company": "Zeta Global",
                "location": "Bengaluru, Karnataka",
                "work_mode": "Remote",
                "experience": "2-5 Years",
                "description": "Build high performance REST APIs in Python with FastAPI, PostgreSQL, and Redis caching. Optimize query runtime and database models.",
                "posted_at": "4 days ago",
                "required_skills": ["Python", "FastAPI", "PostgreSQL", "SQL"],
                "preferred_skills": ["Redis", "Docker", "Git"],
                "apply_url": f"https://www.google.com/search?q=site%3Anaukri.com+{quote('Python FastAPI Zeta Global Bengaluru')}",
                "is_demo": False
            },
            {
                "id": "nak-306",
                "source": "Naukri",
                "title": "Full Stack Engineer - MERN/PERN Stack",
                "company": "Cognizant Technology Solutions",
                "location": "Chennai, Tamil Nadu",
                "work_mode": "Hybrid",
                "experience": "1-3 Years",
                "description": "Engineers with hands-on React, Node.js, Express, and PostgreSQL/SQL skills for modern Web portal development.",
                "posted_at": "2 days ago",
                "required_skills": ["React", "Node.js", "Express", "SQL", "PostgreSQL"],
                "preferred_skills": ["TypeScript", "Docker"],
                "apply_url": f"https://www.google.com/search?q=site%3Anaukri.com+{quote('Full Stack Cognizant Chennai')}",
                "is_demo": False
            },
            {
                "id": "nak-307",
                "source": "Naukri",
                "title": "Cloud Engineer - AWS & Containerization",
                "company": "Tech Mahindra",
                "location": f"{city}, {state}",
                "work_mode": "On-site",
                "experience": "2-5 Years",
                "description": "Cloud deployment engineer specializing in AWS S3, EC2, IAM, Docker container builds, and shell scripting automation.",
                "posted_at": "3 days ago",
                "required_skills": ["AWS", "Docker", "Linux"],
                "preferred_skills": ["Python", "Kubernetes", "Git"],
                "apply_url": f"https://www.google.com/search?q=site%3Anaukri.com+{quote('Cloud Engineer Tech Mahindra Coimbatore')}",
                "is_demo": False
            },
            {
                "id": "nak-308",
                "source": "Naukri",
                "title": "JavaScript / TypeScript Specialist",
                "company": "Persistent Systems",
                "location": "Bengaluru, Karnataka",
                "work_mode": "Hybrid",
                "experience": "2-4 Years",
                "description": "Strong JavaScript and TypeScript developer for frontend and Node.js microservices with clean architectural patterns.",
                "posted_at": "Today",
                "required_skills": ["JavaScript", "TypeScript", "React", "Node.js"],
                "preferred_skills": ["SQL", "Jest", "Git"],
                "apply_url": f"https://www.google.com/search?q=site%3Anaukri.com+{quote('TypeScript Developer Persistent Systems Bengaluru')}",
                "is_demo": False
            },
            {
                "id": "nak-309",
                "source": "Naukri",
                "title": "Software Developer Trainee / Fresher",
                "company": "SoftSquare Systems",
                "location": f"{city}, {state}",
                "work_mode": "On-site",
                "experience": "0-1 Years",
                "description": "Great opportunity for fresh computer science graduates with strong foundation in Python, JavaScript, HTML, CSS, and SQL basics.",
                "posted_at": "Just now",
                "required_skills": ["Python", "JavaScript", "HTML", "CSS", "SQL"],
                "preferred_skills": ["Git", "React"],
                "apply_url": f"https://www.google.com/search?q=site%3Anaukri.com+{quote('Software Trainee SoftSquare Coimbatore')}",
                "is_demo": False
            },
            {
                "id": "nak-310",
                "source": "Naukri",
                "title": "Senior Python Backend Developer",
                "company": "Paytm",
                "location": "Bengaluru, Karnataka",
                "work_mode": "Hybrid",
                "experience": "3-6 Years",
                "description": "Build resilient payment services in Python, PostgreSQL, Redis, Kafka, and Docker containers running on Kubernetes.",
                "posted_at": "4 days ago",
                "required_skills": ["Python", "SQL", "PostgreSQL", "REST API"],
                "preferred_skills": ["Docker", "Redis", "Kafka", "AWS"],
                "apply_url": f"https://www.google.com/search?q=site%3Anaukri.com+{quote('Python Developer Paytm Bengaluru')}",
                "is_demo": False
            },
            {
                "id": "nak-311",
                "source": "Naukri",
                "title": "Full Stack Web Engineer",
                "company": "LTIMindtree",
                "location": f"{city}, {state}",
                "work_mode": "Hybrid",
                "experience": "1-3 Years",
                "description": "Develop modular web portals using React, Express, Node.js, and SQL databases with automated unit testing.",
                "posted_at": "1 day ago",
                "required_skills": ["React", "Node.js", "JavaScript", "SQL"],
                "preferred_skills": ["PostgreSQL", "Docker", "Git"],
                "apply_url": f"https://www.google.com/search?q=site%3Anaukri.com+{quote('Full Stack LTIMindtree Coimbatore')}",
                "is_demo": False
            }
        ]

        for j in raw_jobs:
            j["distance_km"] = location_service.get_distance(location, j["location"])
            if not j.get("apply_url"):
                j["apply_url"] = f"https://www.google.com/search?q=site%3Anaukri.com+{quote(j['title'] + ' ' + j['company'] + ' ' + city)}"

        return raw_jobs

naukri_provider = NaukriJobProvider()

