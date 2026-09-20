from typing import List, Dict, Any

class JobDeduplicator:
    def deduplicate(self, jobs: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        seen_keys = set()
        unique_jobs = []

        for job in jobs:
            # Key based on normalized title + company
            title_norm = job.get("title", "").strip().lower()
            company_norm = job.get("company", "").strip().lower()
            key = f"{title_norm}::{company_norm}"

            if key in seen_keys:
                # Mark as duplicate platform if already seen
                for u in unique_jobs:
                    u_key = f"{u.get('title','').strip().lower()}::{u.get('company','').strip().lower()}"
                    if u_key == key:
                        if "platforms" not in u:
                            u["platforms"] = [u.get("source", "Platform")]
                        if job.get("source") not in u["platforms"]:
                            u["platforms"].append(job.get("source"))
            else:
                seen_keys.add(key)
                job["platforms"] = [job.get("source", "Platform")]
                unique_jobs.append(job)

        return unique_jobs

deduplicator = JobDeduplicator()
