import pandas as pd
from typing import List, Dict, Any

class JobDataFrameBuilder:
    def build_dataframe(self, jobs: List[Dict[str, Any]]) -> pd.DataFrame:
        if not jobs:
            return pd.DataFrame(columns=[
                "job_id", "source", "title", "company", "location", "posted_at",
                "work_mode", "required_skills", "preferred_skills", "apply_url", "distance_km", "is_demo"
            ])

        records = []
        for j in jobs:
            records.append({
                "job_id": j.get("id", ""),
                "source": j.get("source", "Unknown"),
                "title": j.get("title", ""),
                "company": j.get("company", ""),
                "location": j.get("location", ""),
                "posted_at": j.get("posted_at", ""),
                "work_mode": j.get("work_mode", "Hybrid"),
                "required_skills": j.get("required_skills", []),
                "preferred_skills": j.get("preferred_skills", []),
                "apply_url": j.get("apply_url", "#"),
                "distance_km": j.get("distance_km", 15.0),
                "is_demo": j.get("is_demo", False),
                "platforms": j.get("platforms", [j.get("source", "Platform")]),
                "description": j.get("description", "")
            })

        df = pd.DataFrame(records)
        return df

dataframe_builder = JobDataFrameBuilder()
