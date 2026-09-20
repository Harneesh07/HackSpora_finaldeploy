import json
import os
from typing import List, Dict, Any

class RoleRecommender:
    def __init__(self, roles_path: str = None):
        if not roles_path:
            base_dir = os.path.dirname(os.path.dirname(__file__))
            roles_path = os.path.join(base_dir, "data", "roles.json")
        self.roles = self.load_roles(roles_path)

    def load_roles(self, path: str) -> List[Dict[str, Any]]:
        if os.path.exists(path):
            with open(path, "r", encoding="utf-8") as f:
                return json.load(f)
        return []

    def recommend_roles(self, candidate_skills: List[str]) -> List[Dict[str, Any]]:
        candidate_skill_set = set([s.strip() for s in candidate_skills])
        recommendations = []

        for role_item in self.roles:
            role_name = role_item["role"]
            required = set(role_item.get("required", []))
            important = set(role_item.get("important", []))
            optional = set(role_item.get("optional", []))

            req_matched = required.intersection(candidate_skill_set)
            imp_matched = important.intersection(candidate_skill_set)
            opt_matched = optional.intersection(candidate_skill_set)

            # Calculation: required has 60% weight, important 30%, optional 10%
            req_score = (len(req_matched) / max(1, len(required))) * 60
            imp_score = (len(imp_matched) / max(1, len(important))) * 30
            opt_score = (len(opt_matched) / max(1, len(optional))) * 10
            
            total_alignment = int(round(req_score + imp_score + opt_score))

            all_matched = sorted(list(req_matched.union(imp_matched).union(opt_matched)))
            missing_required = sorted(list(required - candidate_skill_set))
            missing_important = sorted(list(important - candidate_skill_set))
            all_missing = sorted(list(missing_required + missing_important))

            rationale = (
                f"This role aligns with your detected skills in {', '.join(all_matched[:3])}. "
                f"Adding {', '.join(all_missing[:2]) if all_missing else 'further experience'} will maximize alignment."
            )

            recommendations.append({
                "role": role_name,
                "description": role_item.get("description", ""),
                "alignment_percentage": total_alignment,
                "required_skills": list(required),
                "important_skills": list(important),
                "optional_skills": list(optional),
                "matched_skills": all_matched,
                "missing_skills": all_missing,
                "explanation": rationale
            })

        # Sort recommendations by alignment percentage descending
        recommendations.sort(key=lambda x: x["alignment_percentage"], reverse=True)
        return recommendations

recommender = RoleRecommender()
