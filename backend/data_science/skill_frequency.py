import pandas as pd
from typing import List, Dict, Any

class SkillFrequencyAnalyzer:
    def analyze_frequencies(self, jobs_df: pd.DataFrame) -> List[Dict[str, Any]]:
        if jobs_df.empty:
            return []

        total_jobs = len(jobs_df)
        skill_counts = {}
        platform_counts = {"LinkedIn": {}, "Indeed": {}, "Naukri": {}}

        for idx, row in jobs_df.iterrows():
            source = row["source"]
            # Combine required and preferred skills
            all_job_skills = set(row["required_skills"] + row["preferred_skills"])
            
            for skill in all_job_skills:
                skill_counts[skill] = skill_counts.get(skill, 0) + 1
                
                if source in platform_counts:
                    platform_counts[source][skill] = platform_counts[source].get(skill, 0) + 1

        # Calculate percentages
        results = []
        for skill, count in skill_counts.items():
            freq_pct = round((count / total_jobs) * 100, 1)

            # Platform percentages
            li_total = len(jobs_df[jobs_df["source"] == "LinkedIn"]) or 1
            ind_total = len(jobs_df[jobs_df["source"] == "Indeed"]) or 1
            nak_total = len(jobs_df[jobs_df["source"] == "Naukri"]) or 1

            li_pct = round((platform_counts["LinkedIn"].get(skill, 0) / li_total) * 100, 1)
            ind_pct = round((platform_counts["Indeed"].get(skill, 0) / ind_total) * 100, 1)
            nak_pct = round((platform_counts["Naukri"].get(skill, 0) / nak_total) * 100, 1)

            demand_level = "HIGH" if freq_pct >= 60.0 else ("MEDIUM" if freq_pct >= 30.0 else "LOW")

            results.append({
                "skill": skill,
                "count": count,
                "total_jobs": total_jobs,
                "frequency_pct": freq_pct,
                "demand_level": demand_level,
                "platform_breakdown": {
                    "LinkedIn": li_pct,
                    "Indeed": ind_pct,
                    "Naukri": nak_pct,
                    "Overall": freq_pct
                }
            })

        # Sort by frequency descending
        results.sort(key=lambda x: x["frequency_pct"], reverse=True)
        return results

skill_frequency_analyzer = SkillFrequencyAnalyzer()
