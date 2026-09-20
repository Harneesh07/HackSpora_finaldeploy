from typing import List, Dict, Any
from services.skill_extractor import extractor
from data_science.match_scoring import numpy_scorer

class JobDescriptionAnalyzer:
    def analyze_jd(self, jd_text: str, candidate_skills: List[str]) -> Dict[str, Any]:
        extracted_skills = extractor.extract_skills(jd_text)
        jd_skill_names = [s["name"] for s in extracted_skills]

        # Separate required vs preferred heuristically
        req_skills = jd_skill_names[:max(1, int(len(jd_skill_names) * 0.6))]
        pref_skills = jd_skill_names[len(req_skills):]

        mock_job = {
            "title": "Analyzed Custom Role",
            "company": "Target Employer",
            "required_skills": req_skills,
            "preferred_skills": pref_skills,
            "distance_km": 10.0
        }

        match_res = numpy_scorer.calculate_match(candidate_skills, mock_job)

        return {
            "jd_skills_detected": jd_skill_names,
            "required_skills": req_skills,
            "preferred_skills": pref_skills,
            "match_score": match_res["match_score"],
            "matched_skills": match_res["matched_skills"],
            "missing_skills": match_res["missing_skills"],
            "score_breakdown": match_res["score_breakdown"],
            "summary": f"Your profile matches {match_res['match_score']}% of the skills extracted from this job description."
        }

jd_analyzer = JobDescriptionAnalyzer()
