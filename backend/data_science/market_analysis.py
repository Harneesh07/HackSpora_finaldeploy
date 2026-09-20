from typing import List, Dict, Any
from data_science.skill_frequency import skill_frequency_analyzer
from data_science.job_dataframe import dataframe_builder

class MarketAnalyzer:
    def analyze_market(self, jobs: List[Dict[str, Any]], candidate_skills: List[str]) -> Dict[str, Any]:
        df = dataframe_builder.build_dataframe(jobs)
        frequencies = skill_frequency_analyzer.analyze_frequencies(df)
        
        cand_set = set([s.strip().lower() for s in candidate_skills])
        
        # Skill comparison table data
        comparison_table = []
        for item in frequencies[:15]:
            s_name = item["skill"]
            m_pct = item["frequency_pct"]
            is_present = s_name.lower() in cand_set
            
            comparison_table.append({
                "skill": s_name,
                "resume_status": "Strong" if is_present else "Missing",
                "market_demand_pct": m_pct,
                "gap_level": "Low" if is_present else ("High" if m_pct >= 50 else "Medium")
            })

        return {
            "total_jobs": len(jobs),
            "skill_frequencies": frequencies,
            "comparison_table": comparison_table
        }

market_analyzer = MarketAnalyzer()
