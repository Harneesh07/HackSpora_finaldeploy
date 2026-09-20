import pandas as pd
from typing import List, Dict, Any
from data_science.match_scoring import numpy_scorer

class JobRanker:
    def rank_jobs(self, candidate_skills: List[str], jobs: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        results = []

        for job in jobs:
            score_data = numpy_scorer.calculate_match(candidate_skills, job)
            
            job_match = {
                "job": job,
                "match_score": score_data["match_score"],
                "score_breakdown": score_data["score_breakdown"],
                "matched_skills": score_data["matched_skills"],
                "missing_skills": score_data["missing_skills"],
                "match_category": score_data["match_category"],
                "match_reason": f"Matches {len(score_data['matched_skills'])} skills required for this role."
            }
            results.append(job_match)

        # Sort by match score descending, then distance ascending
        results.sort(key=lambda x: (x["match_score"], -x["job"].get("distance_km", 999)), reverse=True)
        return results

job_ranker = JobRanker()
