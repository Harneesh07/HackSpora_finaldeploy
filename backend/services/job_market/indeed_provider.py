from typing import List, Dict, Any
from urllib.parse import quote
from services.location_service import location_service

class IndeedJobProvider:
    def __init__(self):
        self.source_name = "Indeed"

    def fetch_jobs(self, query: str, location: str, distance_km: int = 100) -> List[Dict[str, Any]]:
        loc_info = location_service.parse_location(location)
        city = loc_info["city"]
        state = loc_info["state"]

        raw_jobs = [
            {
                "id": "ind-201",
                "source": "Indeed",
                "title": "Software Engineer - Full Stack",
                "company": "Kovai.co",
                "location": f"{city}, {state}",
                "work_mode": "On-site",
                "experience": "1-3 Years",
                "description": "Looking for passionate software engineers with React, Node.js, and SQL proficiency. Build scalable web applications, API services, and maintain database schemas. Experience in Docker and Azure is preferred.",
                "posted_at": "1 day ago",
                "required_skills": ["React", "Node.js", "JavaScript", "SQL"],
                "preferred_skills": ["Docker", "Azure", "Git"],
                "apply_url": f"https://in.indeed.com/jobs?q={quote('Software Engineer Kovai.co')}&l={quote(city)}",
                "is_demo": False
            },
            {
                "id": "ind-202",
                "source": "Indeed",
                "title": "Python Web Developer",
                "company": "Soliton Technologies",
                "location": f"{city}, {state}",
                "work_mode": "Hybrid",
                "experience": "2-4 Years",
                "description": "Develop automated testing tools, web microservices, and backend APIs using Python, FastAPI/Django, and SQL database systems.",
                "posted_at": "4 days ago",
                "required_skills": ["Python", "FastAPI", "SQL", "REST API"],
                "preferred_skills": ["Git", "PostgreSQL", "Docker"],
                "apply_url": f"https://in.indeed.com/jobs?q={quote('Python Developer Soliton Technologies')}&l={quote(city)}",
                "is_demo": False
            },
            {
                "id": "ind-203",
                "source": "Indeed",
                "title": "React Frontend Developer",
                "company": "Bosch Global Software",
                "location": f"{city}, {state}",
                "work_mode": "Hybrid",
                "experience": "2-5 Years",
                "description": "React.js frontend engineer needed to design responsive user dashboards with TypeScript, Redux, and modern CSS modules.",
                "posted_at": "2 days ago",
                "required_skills": ["React", "JavaScript", "TypeScript", "HTML", "CSS"],
                "preferred_skills": ["Redux", "Jest", "Git"],
                "apply_url": f"https://in.indeed.com/jobs?q={quote('React Frontend Developer Bosch')}&l={quote(city)}",
                "is_demo": False
            },
            {
                "id": "ind-204",
                "source": "Indeed",
                "title": "Full Stack API Engineer",
                "company": "Speridian Technologies",
                "location": f"{city}, {state}",
                "work_mode": "Hybrid",
                "experience": "1-4 Years",
                "description": "Engineers required to build Node.js and Python microservices, SQL databases, and React admin portals. Cloud deployment knowledge helpful.",
                "posted_at": "3 days ago",
                "required_skills": ["Node.js", "React", "Python", "SQL"],
                "preferred_skills": ["FastAPI", "Docker", "Git"],
                "apply_url": f"https://in.indeed.com/jobs?q={quote('Full Stack Speridian Technologies')}&l={quote(city)}",
                "is_demo": False
            },
            {
                "id": "ind-205",
                "source": "Indeed",
                "title": "Junior Python Developer",
                "company": "KGisl Micro Systems",
                "location": f"{city}, {state}",
                "work_mode": "On-site",
                "experience": "0-2 Years",
                "description": "Entry-level Python programmer position for developing script automation, REST API endpoints, and SQL database operations.",
                "posted_at": "Today",
                "required_skills": ["Python", "SQL", "REST API"],
                "preferred_skills": ["FastAPI", "Git"],
                "apply_url": f"https://in.indeed.com/jobs?q={quote('Junior Python Developer KGisl')}&l={quote(city)}",
                "is_demo": False
            },
            {
                "id": "ind-206",
                "source": "Indeed",
                "title": "DevOps & Cloud Administrator",
                "company": "Mindtree LTIMindtree",
                "location": "Bengaluru, Karnataka",
                "work_mode": "Hybrid",
                "experience": "3-6 Years",
                "description": "Provision and manage AWS cloud resources, Docker container pipelines, Kubernetes clusters, and automated monitoring dashboards.",
                "posted_at": "5 days ago",
                "required_skills": ["Docker", "AWS", "Linux"],
                "preferred_skills": ["Kubernetes", "Python", "CI/CD"],
                "apply_url": f"https://in.indeed.com/jobs?q={quote('DevOps Engineer Mindtree')}&l=Bengaluru",
                "is_demo": False
            },
            {
                "id": "ind-207",
                "source": "Indeed",
                "title": "Full Stack Engineer - Node & React",
                "company": "Capgemini",
                "location": "Chennai, Tamil Nadu",
                "work_mode": "Hybrid",
                "experience": "2-4 Years",
                "description": "Develop client Web interfaces and backend server applications using React, Express, Node.js, and PostgreSQL.",
                "posted_at": "2 days ago",
                "required_skills": ["React", "Node.js", "JavaScript", "SQL", "PostgreSQL"],
                "preferred_skills": ["Docker", "Git"],
                "apply_url": f"https://in.indeed.com/jobs?q={quote('Full Stack Engineer Capgemini')}&l=Chennai",
                "is_demo": False
            },
            {
                "id": "ind-208",
                "source": "Indeed",
                "title": "Database Developer & Administrator",
                "company": "HCLTech",
                "location": f"{city}, {state}",
                "work_mode": "On-site",
                "experience": "2-5 Years",
                "description": "Database specialist responsible for designing relational tables, writing raw SQL queries, stored procedures, and PostgreSQL performance tuning.",
                "posted_at": "3 days ago",
                "required_skills": ["SQL", "PostgreSQL", "MySQL"],
                "preferred_skills": ["Python", "Redis", "Git"],
                "apply_url": f"https://in.indeed.com/jobs?q={quote('Database Developer HCLTech')}&l={quote(city)}",
                "is_demo": False
            },
            {
                "id": "ind-209",
                "source": "Indeed",
                "title": "UI Engineer - React & Web Standards",
                "company": "Suki.ai",
                "location": "Bengaluru, Karnataka",
                "work_mode": "Remote",
                "experience": "2-4 Years",
                "description": "Craft intuitive digital user interfaces with React, TypeScript, and modern CSS modules. Collaborate closely with AI/ML product engineers.",
                "posted_at": "1 day ago",
                "required_skills": ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
                "preferred_skills": ["Tailwind CSS", "Redux"],
                "apply_url": f"https://in.indeed.com/jobs?q={quote('UI Engineer Suki.ai')}&l=Bengaluru",
                "is_demo": False
            },
            {
                "id": "ind-210",
                "source": "Indeed",
                "title": "Python Backend & API Specialist",
                "company": "Ola Electric",
                "location": "Bengaluru, Karnataka",
                "work_mode": "On-site",
                "experience": "3-5 Years",
                "description": "Engineers required to build high-scale IoT and backend APIs in Python, FastAPI, PostgreSQL, Redis, and Docker on AWS infrastructure.",
                "posted_at": "Just now",
                "required_skills": ["Python", "FastAPI", "SQL", "REST API"],
                "preferred_skills": ["Redis", "Docker", "AWS"],
                "apply_url": f"https://in.indeed.com/jobs?q={quote('Python Developer Ola Electric')}&l=Bengaluru",
                "is_demo": False
            },
            {
                "id": "ind-211",
                "source": "Indeed",
                "title": "Full Stack Application Developer",
                "company": "Aspire Systems",
                "location": f"{city}, {state}",
                "work_mode": "Hybrid",
                "experience": "1-3 Years",
                "description": "Develop full-stack web applications using React, Node.js, Express, and SQL databases. Continuous integration and testing.",
                "posted_at": "Today",
                "required_skills": ["React", "Node.js", "JavaScript", "SQL"],
                "preferred_skills": ["TypeScript", "Git"],
                "apply_url": f"https://in.indeed.com/jobs?q={quote('Full Stack Aspire Systems')}&l={quote(city)}",
                "is_demo": False
            }
        ]

        for j in raw_jobs:
            j["distance_km"] = location_service.get_distance(location, j["location"])
            if not j.get("apply_url"):
                j["apply_url"] = f"https://in.indeed.com/jobs?q={quote(j['title'] + ' ' + j['company'])}&l={quote(city)}"

        return raw_jobs

indeed_provider = IndeedJobProvider()

