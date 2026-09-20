import json
import os
import re

class SkillNormalizer:
    def __init__(self, taxonomy_path: str = None):
        if not taxonomy_path:
            base_dir = os.path.dirname(os.path.dirname(__file__))
            taxonomy_path = os.path.join(base_dir, "data", "skill_taxonomy.json")
        
        self.categories = {}
        self.aliases = {}
        self.load_taxonomy(taxonomy_path)

    def load_taxonomy(self, path: str):
        if os.path.exists(path):
            with open(path, "r", encoding="utf-8") as f:
                data = json.load(f)
                self.categories = data.get("categories", {})
                self.aliases = data.get("aliases", {})
        else:
            self.categories = {
                "Programming": ["Python", "JavaScript", "TypeScript", "Java", "C++", "SQL"],
                "Frontend": ["React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
                "Backend": ["Node.js", "Express", "FastAPI", "Django", "REST API"],
                "Database": ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
                "Cloud": ["AWS", "Google Cloud", "Azure", "Docker"],
                "DevOps": ["Docker", "Kubernetes", "CI/CD", "Git"]
            }
            self.aliases = {
                "reactjs": "React", "react.js": "React", "js": "JavaScript", "javascript": "JavaScript",
                "ts": "TypeScript", "typescript": "TypeScript", "nodejs": "Node.js", "node": "Node.js",
                "py": "Python", "python3": "Python", "postgres": "PostgreSQL", "mongo": "MongoDB"
            }

    def normalize(self, raw_skill: str) -> str:
        clean = raw_skill.strip().lower()
        # Direct alias lookup
        if clean in self.aliases:
            return self.aliases[clean]
        
        # Check canonical matching case-insensitively
        for cat, skills in self.categories.items():
            for skill in skills:
                if skill.lower() == clean:
                    return skill
        
        # Default capitalization if unknown
        return raw_skill.strip().title()

    def get_category(self, normalized_skill: str) -> str:
        for cat, skills in self.categories.items():
            if normalized_skill in skills:
                return cat
        return "Tools & Technologies"

normalizer = SkillNormalizer()
