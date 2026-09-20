import numpy as np
from typing import List, Dict, Any

class NumPyMatchScorer:
    def calculate_match(self, candidate_skills: List[str], job: Dict[str, Any]) -> Dict[str, Any]:
        cand_set = set([s.strip().lower() for s in candidate_skills])
        req_skills = job.get("required_skills", [])
        pref_skills = job.get("preferred_skills", [])

        # Vector representation using unique vocabulary
        vocab = list(set([s.lower() for s in req_skills + pref_skills] + list(cand_set)))
        if not vocab:
            return {
                "match_score": 70,
                "matched_skills": [],
                "missing_skills": [],
                "score_breakdown": {"required": 50, "preferred": 20, "experience": 10, "location": 5}
            }

        cand_vector = np.array([1 if token in cand_set else 0 for token in vocab])
        req_vector = np.array([1 if token in [s.lower() for s in req_skills] else 0 for token in vocab])
        pref_vector = np.array([1 if token in [s.lower() for s in pref_skills] else 0 for token in vocab])

        # NumPy Vectorized computations
        req_match_count = np.sum(cand_vector * req_vector)
        req_total = max(1, np.sum(req_vector))
        req_score = float((req_match_count / req_total) * 50.0)

        pref_match_count = np.sum(cand_vector * pref_vector)
        pref_total = max(1, np.sum(pref_vector))
        pref_score = float((pref_match_count / pref_total) * 25.0)

        # Static baseline heuristic weights
        exp_score = 10.0
        role_score = 10.0
        
        distance = job.get("distance_km", 20.0)
        loc_score = 5.0 if distance <= 50 else (3.0 if distance <= 150 else 1.0)

        total_score = int(round(req_score + pref_score + exp_score + role_score + loc_score))
        total_score = min(99, max(30, total_score))

        # Matched and missing lists
        matched = []
        missing = []
        for s in req_skills + pref_skills:
            if s.lower() in cand_set:
                if s not in matched:
                    matched.append(s)
            else:
                if s not in missing:
                    missing.append(s)

        # Categorize match
        if total_score >= 80:
            category = "Best"
        elif total_score >= 65:
            category = "Strong"
        elif total_score >= 50:
            category = "Potential"
        else:
            category = "Skill-Building"

        return {
            "match_score": total_score,
            "matched_skills": matched,
            "missing_skills": missing,
            "match_category": category,
            "score_breakdown": {
                "required_skill_score": int(round(req_score)),
                "preferred_skill_score": int(round(pref_score)),
                "experience_score": int(round(exp_score)),
                "role_similarity_score": int(round(role_score)),
                "location_relevance_score": int(round(loc_score))
            }
        }

numpy_scorer = NumPyMatchScorer()
