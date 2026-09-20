from typing import List, Dict, Any
from urllib.parse import quote

class LearningRecommender:
    def recommend(self, skill_gaps: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        recommendations = []

        project_templates = {
            "Docker": "Containerize a full-stack React + Node.js application using Docker Compose and multi-stage builds.",
            "AWS": "Deploy a serverless Python FastAPI app on AWS Lambda with S3 storage and API Gateway.",
            "TypeScript": "Refactor an existing JavaScript React app to TypeScript with strict type checking and custom interfaces.",
            "Redis": "Implement session caching and rate-limiting middleware in a Node.js or FastAPI backend using Redis.",
            "Kubernetes": "Deploy a multi-container app on local Minikube / K8s with deployment manifests and ingress controller.",
            "PostgreSQL": "Design a relational schema with indexing, foreign key constraints, and raw SQL query optimization.",
            "React": "Build a modular dashboard with React 19, custom hooks, and state management.",
            "Python": "Build an asynchronous REST microservice with FastAPI, Pydantic validation, and SQLite/PostgreSQL."
        }

        # Process ALL skill gaps (suggest all lagging skills)
        for gap in skill_gaps:
            s_name = gap["skill"]
            m_pct = gap["market_demand_pct"]
            prio = gap.get("learning_priority", "High" if m_pct >= 40 else "Medium")

            proj = project_templates.get(
                s_name,
                f"Build a hands-on production application using {s_name} and push the repository to GitHub."
            )

            # Direct exact training links for each platform
            platforms = [
                {
                    "name": "Infosys Springboard",
                    "description": f"Infosys Springboard official course catalog & direct training modules for {s_name}.",
                    "url": f"https://www.google.com/search?q=site%3Ainfyspringboard.onwingspan.com+{quote(s_name)}+course",
                    "portal_url": f"https://infyspringboard.onwingspan.com/web/en/page/search?query={quote(s_name)}",
                    "has_certificate": True,
                    "certificate_label": "Earn Certificate (Free)",
                    "certificate_note": "Has Certificate",
                    "type": "Enterprise Course"
                },
                {
                    "name": "Cisco Networking Academy",
                    "description": f"Cisco Networking Academy & SkillsForAll specialized course catalog for {s_name}.",
                    "url": f"https://www.netacad.com/courses",
                    "direct_url": f"https://www.google.com/search?q=site%3Anetacad.com+{quote(s_name)}+course",
                    "has_certificate": True,
                    "certificate_label": "Earn Certificate (Free)",
                    "certificate_note": "Has Certificate",
                    "type": "Guided Track"
                },
                {
                    "name": "Coursera Professional Certifications",
                    "description": f"Top university & industry specialization courses for {s_name}.",
                    "url": f"https://www.coursera.org/search?query={quote(s_name)}",
                    "has_certificate": True,
                    "certificate_label": "Earn Certificate",
                    "certificate_note": "Has Certificate",
                    "type": "Professional Certificate"
                },
                {
                    "name": "Udemy Hands-on Masterclass",
                    "description": f"Project-based interactive video course for {s_name}.",
                    "url": f"https://www.udemy.com/courses/search/?q={quote(s_name)}",
                    "has_certificate": True,
                    "certificate_label": "Earn Certificate",
                    "certificate_note": "Has Certificate",
                    "type": "Paid Masterclass"
                },
                {
                    "name": "NPTEL / Swayam Government Portal",
                    "description": f"NPTEL IIT certified computer science course for {s_name}.",
                    "url": f"https://swayam.gov.in/nc_details/NPTEL?keyword={quote(s_name)}",
                    "has_certificate": True,
                    "certificate_label": "Earn Certificate",
                    "certificate_note": "Has Certificate",
                    "type": "NPTEL IIT Course"
                },
                {
                    "name": "freeCodeCamp Open Certification",
                    "description": f"Interactive coding tutorials & exercises for {s_name}.",
                    "url": f"https://www.freecodecamp.org/news/search/?query={quote(s_name)}",
                    "has_certificate": True,
                    "certificate_label": "Earn Certificate (Free)",
                    "certificate_note": "Has Certificate",
                    "type": "Interactive Certification"
                },
                {
                    "name": "YouTube Full Workshop Video",
                    "description": f"Free comprehensive video tutorial playlist for {s_name}.",
                    "url": f"https://www.youtube.com/results?search_query={quote(s_name)}+full+course+beginners+tutorial",
                    "has_certificate": False,
                    "certificate_label": "No Certificate",
                    "certificate_note": "You won't earn a certificate for this",
                    "type": "Video Playlist"
                }
            ]

            # 4-Step Completion Roadmap for this skill
            completion_roadmap = [
                {
                    "step_number": 1,
                    "title": "Core Fundamentals & Concept Mastery",
                    "estimated_hours": 4,
                    "description": f"Learn syntax, primitive types, key architecture rules, and foundational patterns of {s_name}."
                },
                {
                    "step_number": 2,
                    "title": "Hands-on Project Implementation",
                    "estimated_hours": 6,
                    "description": f"Build: {proj}"
                },
                {
                    "step_number": 3,
                    "title": "Platform Verification & Assessment",
                    "estimated_hours": 2,
                    "description": f"Complete platform assessment quiz on Infosys Springboard, Cisco Academy, or Coursera to verify knowledge."
                },
                {
                    "step_number": 4,
                    "title": "Resume & Market Vector Integration",
                    "estimated_hours": 1,
                    "description": f"Add {s_name} project repository link and evidence bullet points to your candidate profile to boost job match scores."
                }
            ]

            recommendations.append({
                "skill": s_name,
                "priority": prio,
                "market_demand_pct": m_pct,
                "recommendation": f"Master {s_name} through direct platform courses or video options to resolve this skill gap.",
                "estimated_hours": 13 if prio == "High" else 8,
                "suggested_project": proj,
                "platforms": platforms,
                "completion_roadmap": completion_roadmap
            })

        return recommendations

learning_recommender = LearningRecommender()



