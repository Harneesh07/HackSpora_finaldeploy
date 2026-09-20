from models.github import (
    GitHubAnalyzeResponse, AnalyzedRepository, RecommendedProject, 
    CategoryScore, RoadmapStep, GitHubSummary
)
from typing import List, Dict, Any
import math

class GitHubAIAnalyzer:
    ROLE_SKILLS_MAP = {
        "Java Developer": ["Java", "Spring Boot", "REST API", "SQL", "MySQL", "PostgreSQL", "Git", "DSA", "Backend Development", "Testing", "Authentication", "Microservices", "JUnit", "Docker"],
        "Backend Developer": ["Python", "Java", "Node.js", "REST API", "GraphQL", "SQL", "NoSQL", "Docker", "Kubernetes", "Redis", "Microservices", "AWS"],
        "Full Stack Developer": ["React", "Node.js", "Express", "MongoDB", "SQL", "REST API", "HTML", "CSS", "JavaScript", "TypeScript", "Git", "Docker"],
        "Frontend Developer": ["React", "Vue", "Angular", "HTML", "CSS", "JavaScript", "TypeScript", "Redux", "Tailwind CSS", "Webpack", "Vite", "Jest"],
        "React Developer": ["React", "JavaScript", "TypeScript", "Redux", "React Router", "Next.js", "Tailwind CSS", "Jest", "HTML", "CSS"],
        "Spring Boot Developer": ["Java", "Spring Boot", "Spring Data JPA", "Spring Security", "REST API", "Microservices", "MySQL", "PostgreSQL", "JUnit", "Docker"],
        "Python Developer": ["Python", "Django", "Flask", "FastAPI", "SQL", "PostgreSQL", "REST API", "Docker", "Git", "Testing", "Pytest"],
        "AI/ML Engineer": ["Python", "TensorFlow", "PyTorch", "Scikit-Learn", "Pandas", "NumPy", "Machine Learning", "Deep Learning", "NLP", "Computer Vision"],
        "Data Analyst": ["Python", "SQL", "Pandas", "Excel", "Tableau", "Power BI", "Data Visualization", "Statistics", "Data Cleaning"],
        "Data Scientist": ["Python", "R", "Machine Learning", "Statistics", "SQL", "Pandas", "Scikit-Learn", "Data Modeling", "A/B Testing"],
        "DevOps Engineer": ["Linux", "Docker", "Kubernetes", "CI/CD", "Jenkins", "GitHub Actions", "AWS", "Terraform", "Ansible", "Bash", "Python"],
        "Cloud Engineer": ["AWS", "Azure", "GCP", "Linux", "Docker", "Kubernetes", "Networking", "Terraform", "CI/CD", "Serverless"],
        "Mobile App Developer": ["Flutter", "React Native", "Swift", "Kotlin", "Android", "iOS", "Dart", "Firebase", "REST API"],
        "Cybersecurity Engineer": ["Networking", "Linux", "Python", "Security", "Penetration Testing", "Cryptography", "Firewalls", "SIEM"],
        "Database Developer": ["SQL", "MySQL", "PostgreSQL", "Oracle", "MongoDB", "Database Design", "Performance Tuning", "ETL"],
        "Software Developer": ["Java", "Python", "JavaScript", "C++", "C#", "Git", "SQL", "Data Structures", "Algorithms", "REST API"],
        "Software Engineer": ["Java", "Python", "JavaScript", "C++", "C#", "Git", "SQL", "Data Structures", "Algorithms", "System Design"]
    }

    # Fallback generic skills if role is custom
    GENERIC_SKILLS = ["Git", "REST API", "SQL", "Docker", "Testing", "CI/CD", "Cloud", "JavaScript", "Python"]

    def _get_target_skills(self, role: str) -> List[str]:
        # Case insensitive match
        for key, value in self.ROLE_SKILLS_MAP.items():
            if role.lower() in key.lower():
                return value
        return self.GENERIC_SKILLS

    def analyze_repositories(self, repos: List[Dict[str, Any]], target_role: str) -> GitHubAnalyzeResponse:
        target_skills_lower = [s.lower() for s in self._get_target_skills(target_role)]
        all_detected_skills = set()
        analyzed_repos = []
        
        total_stars = 0
        total_forks = 0
        repo_languages = set()
        
        for repo in repos:
            if repo.get('fork', False):
                continue # Skip forked repos for analysis if we want to focus on their own projects
                
            name = repo.get('name', '')
            desc = repo.get('description', '') or ''
            language = repo.get('language')
            topics = repo.get('topics', [])
            stars = repo.get('stargazers_count', 0)
            forks = repo.get('forks_count', 0)
            
            total_stars += stars
            total_forks += forks
            
            if language:
                repo_languages.add(language)
                
            repo_text = f"{name} {desc} {language} {' '.join(topics)}".lower()
            
            repo_detected_skills = []
            for skill in self._get_target_skills(target_role):
                if skill.lower() in repo_text or skill.lower().replace(" ", "") in repo_text:
                    repo_detected_skills.append(skill)
                    all_detected_skills.add(skill)
            
            # Additional common tech
            techs = []
            if language: techs.append(language)
            for topic in topics: techs.append(topic.capitalize())
            
            activity = "High" if stars > 10 else "Medium" if stars > 0 or forks > 0 else "Low"
            relevance = "High" if len(repo_detected_skills) >= 2 else "Medium" if len(repo_detected_skills) == 1 else "Low"
            
            if relevance != "Low" or stars > 0:
                analyzed_repos.append(AnalyzedRepository(
                    name=name,
                    description=desc,
                    languages=[language] if language else [],
                    technologies=list(set(techs))[:5],
                    stars=stars,
                    forks=forks,
                    activity=activity,
                    detectedSkills=repo_detected_skills,
                    roleRelevance=relevance,
                    url=repo.get('html_url', '')
                ))

        # Sort repos by relevance and stars
        analyzed_repos.sort(key=lambda x: (x.roleRelevance == "High", x.stars), reverse=True)
        top_repos = analyzed_repos[:10] # Take top 10

        target_skills_original = self._get_target_skills(target_role)
        detected_list = list(all_detected_skills)
        missing_skills_list = []
        
        for skill in target_skills_original:
            if skill not in detected_list:
                missing_skills_list.append({
                    "skill": skill,
                    "reason": f"Important for {target_role} but not found in your public repositories."
                })

        # Calculate scores
        match_ratio = len(detected_list) / max(len(target_skills_original), 1)
        tech_score = int(match_ratio * 100)
        
        proj_rel = 100 if len([r for r in top_repos if r.roleRelevance == "High"]) > 2 else 70 if top_repos else 40
        proj_div = min(100, len(repo_languages) * 20 + len(top_repos) * 5)
        doc_score = min(100, sum(1 for r in top_repos if r.description) * 10)
        
        overall_score = int((tech_score * 0.4) + (proj_rel * 0.3) + (proj_div * 0.15) + (doc_score * 0.15))

        score_breakdown = [
            CategoryScore(category="Technical Skills", score=tech_score),
            CategoryScore(category="Project Relevance", score=proj_rel),
            CategoryScore(category="Project Diversity", score=proj_div),
            CategoryScore(category="Documentation", score=doc_score),
            CategoryScore(category="Role Alignment", score=overall_score)
        ]

        # Generate Recommendations
        recommended = []
        roadmap = []
        
        missing_names = [m["skill"] for m in missing_skills_list]
        
        if len(missing_names) >= 2:
            recommended.append(RecommendedProject(
                title=f"Advanced {target_role} Integration Project",
                reason="To bridge the gap in your current skill set.",
                skillsAdded=missing_names[:3],
                technologies=missing_names[:3],
                difficulty="Advanced"
            ))
            
        recommended.append(RecommendedProject(
            title=f"Real-World {target_role} System",
            reason="Demonstrate production-ready capabilities.",
            skillsAdded=target_skills_original[:2] + missing_names[-1:] if missing_names else target_skills_original[:3],
            technologies=target_skills_original[:2],
            difficulty="Intermediate"
        ))

        # Roadmap
        step = 1
        if tech_score < 50:
            roadmap.append(RoadmapStep(step=step, title=f"Strengthen Core {target_role} Skills", description=f"Focus on fundamentals like {', '.join(target_skills_original[:3])}."))
            step += 1
            
        if missing_names:
            roadmap.append(RoadmapStep(step=step, title=f"Learn Missing Technologies", description=f"Start incorporating {', '.join(missing_names[:2])} into your projects."))
            step += 1
            
        roadmap.append(RoadmapStep(step=step, title="Build a Capstone Project", description="Create a comprehensive project that combines multiple technologies."))
        step += 1
        roadmap.append(RoadmapStep(step=step, title="Improve Documentation", description="Add detailed READMEs with setup instructions and architecture diagrams to your repos."))

        ai_explanation = f"Your GitHub profile shows a {overall_score}% match for the {target_role} role. "
        if detected_list:
            ai_explanation += f"You have demonstrated proficiency in {', '.join(detected_list[:3])}. "
        if missing_names:
            ai_explanation += f"However, adding projects that utilize {', '.join(missing_names[:2])} would significantly strengthen your profile for this position."

        return GitHubAnalyzeResponse(
            score=overall_score,
            scoreBreakdown=score_breakdown,
            skillsDetected=detected_list,
            missingSkills=missing_skills_list,
            repositories=top_repos,
            recommendedProjects=recommended,
            roadmap=roadmap,
            summary=GitHubSummary(
                username="", # Filled by route
                totalRepositories=len(repos),
                languages=list(repo_languages)[:5],
                projectsAnalyzed=len(top_repos),
                targetRole=target_role,
                roleMatchScore=overall_score
            ),
            aiExplanation=ai_explanation
        )

github_ai_analyzer = GitHubAIAnalyzer()
