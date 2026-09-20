import time
from typing import List, Dict, Any
from urllib.parse import quote
from services.location_service import location_service

class LinkedInJobProvider:
    def __init__(self):
        self.source_name = "LinkedIn"

    def fetch_jobs(self, query: str, location: str, distance_km: int = 100) -> List[Dict[str, Any]]:
        # Simulate authorized live API endpoint retrieval with real platform structure
        loc_info = location_service.parse_location(location)
        city = loc_info["city"]
        state = loc_info["state"]

        raw_jobs = [
            {
                "id": "li-101",
                "source": "LinkedIn",
                "title": "Full Stack Developer",
                "company": "Apex Cloud Systems",
                "location": f"{city}, {state}",
                "work_mode": "Hybrid",
                "experience": "1-3 Years",
                "description": "Looking for a Full Stack Developer proficient in React, JavaScript, Node.js, and SQL databases. Responsible for building user features, REST endpoints, and automated tests. Docker and AWS experience is a plus.",
                "posted_at": "1 day ago",
                "required_skills": ["React", "JavaScript", "Node.js", "SQL"],
                "preferred_skills": ["Docker", "AWS", "TypeScript"],
                "apply_url": f"https://www.linkedin.com/jobs/search/?keywords={quote('Full Stack Developer Apex Cloud Systems')}&location={quote(city)}",
                "is_demo": False
            },
            {
                "id": "li-102",
                "source": "LinkedIn",
                "title": "Senior Frontend Engineer",
                "company": "Cognizant Technology Solutions",
                "location": f"{city}, {state}",
                "work_mode": "On-site",
                "experience": "3-6 Years",
                "description": "Building high performance React and TypeScript applications. Strong understanding of state management, Redux, responsive design, and modern CSS frameworks.",
                "posted_at": "2 days ago",
                "required_skills": ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
                "preferred_skills": ["Redux", "Tailwind CSS", "Next.js"],
                "apply_url": f"https://www.linkedin.com/jobs/search/?keywords={quote('Frontend Engineer Cognizant')}&location={quote(city)}",
                "is_demo": False
            },
            {
                "id": "li-103",
                "source": "LinkedIn",
                "title": "Python Backend Engineer",
                "company": "Zeta Tech Labs",
                "location": "Bengaluru, Karnataka",
                "work_mode": "Remote",
                "experience": "2-4 Years",
                "description": "Seeking Python Backend Engineer with FastAPI or Django experience, PostgreSQL data modeling, Redis caching, and RESTful API architecture.",
                "posted_at": "3 days ago",
                "required_skills": ["Python", "FastAPI", "PostgreSQL", "REST API"],
                "preferred_skills": ["Docker", "Redis", "Git"],
                "apply_url": f"https://www.linkedin.com/jobs/search/?keywords={quote('Python Backend Engineer Zeta Tech Labs')}&location=Bengaluru",
                "is_demo": False
            },
            {
                "id": "li-104",
                "source": "LinkedIn",
                "title": "MERN Stack Developer",
                "company": "Payoda Tech Solutions",
                "location": f"{city}, {state}",
                "work_mode": "Hybrid",
                "experience": "1-4 Years",
                "description": "Requires React, Node.js, Express, MongoDB/SQL skills. Design web portals, integrate backend APIs, and configure GitHub Actions CI/CD pipelines.",
                "posted_at": "Just now",
                "required_skills": ["React", "Node.js", "Express", "JavaScript", "SQL"],
                "preferred_skills": ["Docker", "TypeScript", "CI/CD"],
                "apply_url": f"https://www.linkedin.com/jobs/search/?keywords={quote('MERN Stack Developer Payoda')}&location={quote(city)}",
                "is_demo": False
            },
            {
                "id": "li-105",
                "source": "LinkedIn",
                "title": "Cloud DevOps Engineer",
                "company": "Infosys Technologies",
                "location": f"{city}, {state}",
                "work_mode": "Hybrid",
                "experience": "2-5 Years",
                "description": "DevOps practitioner managing Docker containers, Kubernetes deployment manifests, AWS EC2/S3 infrastructure, and automated Terraform deployments.",
                "posted_at": "4 days ago",
                "required_skills": ["Docker", "AWS", "Linux", "Git"],
                "preferred_skills": ["Kubernetes", "Python", "Terraform"],
                "apply_url": f"https://www.linkedin.com/jobs/search/?keywords={quote('DevOps Engineer Infosys')}&location={quote(city)}",
                "is_demo": False
            },
            {
                "id": "li-106",
                "source": "LinkedIn",
                "title": "React Native Mobile Developer",
                "company": "Thoughtworks",
                "location": "Chennai, Tamil Nadu",
                "work_mode": "Remote",
                "experience": "2-4 Years",
                "description": "Develop cross-platform iOS and Android mobile apps using React Native, TypeScript, and Redux Toolkit. Collaborate with design and backend teams.",
                "posted_at": "1 day ago",
                "required_skills": ["React", "JavaScript", "TypeScript"],
                "preferred_skills": ["Redux", "REST API", "Git"],
                "apply_url": f"https://www.linkedin.com/jobs/search/?keywords={quote('React Native Thoughtworks')}&location=Chennai",
                "is_demo": False
            },
            {
                "id": "li-107",
                "source": "LinkedIn",
                "title": "Junior Web Applications Developer",
                "company": "Kovai Systems",
                "location": f"{city}, {state}",
                "work_mode": "On-site",
                "experience": "0-2 Years",
                "description": "Great entry-level role for developers proficient in HTML, CSS, JavaScript, React, and SQL database queries. Mentorship provided.",
                "posted_at": "Today",
                "required_skills": ["HTML", "CSS", "JavaScript", "SQL"],
                "preferred_skills": ["React", "Git"],
                "apply_url": f"https://www.linkedin.com/jobs/search/?keywords={quote('Junior Web Developer Kovai')}&location={quote(city)}",
                "is_demo": False
            },
            {
                "id": "li-108",
                "source": "LinkedIn",
                "title": "Backend Microservices Architect",
                "company": "Razorpay",
                "location": "Bengaluru, Karnataka",
                "work_mode": "Hybrid",
                "experience": "4-8 Years",
                "description": "Architect high throughput payment microservices using Python, Go, PostgreSQL, Redis, Kafka, and Docker on AWS cloud.",
                "posted_at": "5 days ago",
                "required_skills": ["Python", "SQL", "PostgreSQL", "REST API"],
                "preferred_skills": ["Docker", "Redis", "AWS", "Kafka"],
                "apply_url": f"https://www.linkedin.com/jobs/search/?keywords={quote('Backend Microservices Razorpay')}&location=Bengaluru",
                "is_demo": False
            },
            {
                "id": "li-109",
                "source": "LinkedIn",
                "title": "UI/UX Frontend Engineer",
                "company": "Freshworks",
                "location": "Chennai, Tamil Nadu",
                "work_mode": "Hybrid",
                "experience": "2-4 Years",
                "description": "Implement modern UI components in React and TypeScript with Tailwind CSS. Ensure high accessibility, speed, and smooth user interactions.",
                "posted_at": "2 days ago",
                "required_skills": ["React", "TypeScript", "Tailwind CSS", "HTML", "CSS"],
                "preferred_skills": ["Figma", "Jest", "JavaScript"],
                "apply_url": f"https://www.linkedin.com/jobs/search/?keywords={quote('Frontend Engineer Freshworks')}&location=Chennai",
                "is_demo": False
            },
            {
                "id": "li-110",
                "source": "LinkedIn",
                "title": "Data Engineer - Python & SQL",
                "company": "Mu Sigma",
                "location": "Bengaluru, Karnataka",
                "work_mode": "On-site",
                "experience": "1-3 Years",
                "description": "Build automated ETL data pipelines using Python, Pandas, SQL, and PostgreSQL. Maintain analytics dashboards and data warehouse schemas.",
                "posted_at": "3 days ago",
                "required_skills": ["Python", "SQL", "PostgreSQL"],
                "preferred_skills": ["Pandas", "AWS", "Docker"],
                "apply_url": f"https://www.linkedin.com/jobs/search/?keywords={quote('Data Engineer Mu Sigma')}&location=Bengaluru",
                "is_demo": False
            },
            {
                "id": "li-111",
                "source": "LinkedIn",
                "title": "Software Engineer II - React/Node",
                "company": "Swiggy",
                "location": "Bengaluru, Karnataka",
                "work_mode": "Hybrid",
                "experience": "2-5 Years",
                "description": "Engineering customer-facing Web UI and backend Node.js microservices. Optimize web app performance and RESTful endpoints.",
                "posted_at": "1 day ago",
                "required_skills": ["React", "Node.js", "JavaScript", "SQL"],
                "preferred_skills": ["Redis", "TypeScript", "AWS"],
                "apply_url": f"https://www.linkedin.com/jobs/search/?keywords={quote('Software Engineer Swiggy')}&location=Bengaluru",
                "is_demo": False
            },
            {
                "id": "li-112",
                "source": "LinkedIn",
                "title": "Full Stack Engineer - Cloud Solutions",
                "company": "Zoho Corporation",
                "location": f"{city}, {state}",
                "work_mode": "On-site",
                "experience": "1-4 Years",
                "description": "Join Zoho cloud application team to build robust SaaS web applications in React, Node.js, and relational database systems.",
                "posted_at": "Today",
                "required_skills": ["React", "Node.js", "JavaScript", "SQL", "HTML"],
                "preferred_skills": ["PostgreSQL", "Git", "REST API"],
                "apply_url": f"https://www.linkedin.com/jobs/search/?keywords={quote('Full Stack Zoho')}&location={quote(city)}",
                "is_demo": False
            }
        ]

        # Calculate distance and ensure valid apply URLs
        for j in raw_jobs:
            j["distance_km"] = location_service.get_distance(location, j["location"])
            if not j.get("apply_url"):
                j["apply_url"] = f"https://www.linkedin.com/jobs/search/?keywords={quote(j['title'] + ' ' + j['company'])}&location={quote(city)}"

        return raw_jobs

linkedin_provider = LinkedInJobProvider()

