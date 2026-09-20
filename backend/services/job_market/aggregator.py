from typing import List, Dict, Any
from services.job_market.linkedin_provider import linkedin_provider
from services.job_market.indeed_provider import indeed_provider
from services.job_deduplicator import deduplicator

class JobMarketAggregator:
    def __init__(self):
        self.providers = [linkedin_provider, indeed_provider]

    def fetch_all_jobs(self, query: str = "Developer", location: str = "Coimbatore, Tamil Nadu", distance_km: int = 100) -> Dict[str, Any]:
        all_raw_jobs = []
        platform_counts = {"LinkedIn": 0, "Indeed": 0}

        for provider in self.providers:
            try:
                jobs = provider.fetch_jobs(query, location, distance_km)
                platform_counts[provider.source_name] = len(jobs)
                all_raw_jobs.extend(jobs)
            except Exception as e:
                print(f"Error fetching from {provider.source_name}: {e}")

        # Deduplicate
        unique_jobs = deduplicator.deduplicate(all_raw_jobs)

        return {
            "total_listings": len(unique_jobs),
            "raw_total": len(all_raw_jobs),
            "platform_counts": platform_counts,
            "jobs": unique_jobs,
            "search_location": location,
            "distance_km": distance_km
        }

aggregator = JobMarketAggregator()
