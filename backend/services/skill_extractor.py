import re
from typing import List, Dict
from services.skill_normalizer import normalizer

class SkillExtractor:
    def __init__(self):
        self.normalizer = normalizer

    def extract_skills(self, text: str) -> List[Dict[str, str]]:
        if not text:
            return []
        
        found_skills = set()
        text_lower = text.lower()

        # Check aliases
        for alias, canonical in self.normalizer.aliases.items():
            # word boundary search for alias
            pattern = r'\b' + re.escape(alias) + r'\b'
            if re.search(pattern, text_lower):
                found_skills.add(canonical)

        # Check categories
        for cat, skills in self.normalizer.categories.items():
            for skill in skills:
                pattern = r'\b' + re.escape(skill.lower()) + r'\b'
                if re.search(pattern, text_lower):
                    found_skills.add(skill)

        # Build list with evidence heuristic
        results = []
        for s in found_skills:
            cat = self.normalizer.get_category(s)
            results.append({
                "name": s,
                "category": cat,
                "evidence": "Strong"
            })
        return results

    def extract_raw_skill_names(self, text: str) -> List[str]:
        extracted = self.extract_skills(text)
        return [s["name"] for s in extracted]

extractor = SkillExtractor()
