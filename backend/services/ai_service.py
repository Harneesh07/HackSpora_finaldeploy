from typing import Dict, Any, List

class AIService:
    def generate_candidate_summary(self, name: str, skills: List[str], experience: List[Dict[str, Any]]) -> str:
        skill_str = ", ".join(skills[:5]) if skills else "modern web technologies"
        exp_title = experience[0]["title"] if experience else "Software Engineer"
        
        summary = (
            f"{name} is a skilled {exp_title} with solid proficiency in {skill_str}. "
            f"Demonstrates strong experience building modular application components, REST APIs, and database structures."
        )
        return summary

ai_service = AIService()
