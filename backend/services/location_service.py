import math
from typing import Dict, Any, List

# Coordinates database for major cities in India
CITY_COORDINATES = {
    "coimbatore": {"lat": 11.0168, "lon": 76.9558, "district": "Coimbatore", "state": "Tamil Nadu"},
    "tirupur": {"lat": 11.1085, "lon": 77.3411, "district": "Tirupur", "state": "Tamil Nadu"},
    "salem": {"lat": 11.6643, "lon": 78.1460, "district": "Salem", "state": "Tamil Nadu"},
    "erode": {"lat": 11.3410, "lon": 77.7172, "district": "Erode", "state": "Tamil Nadu"},
    "chennai": {"lat": 13.0827, "lon": 80.2707, "district": "Chennai", "state": "Tamil Nadu"},
    "bengaluru": {"lat": 12.9716, "lon": 77.5946, "district": "Bengaluru Urban", "state": "Karnataka"},
    "bangalore": {"lat": 12.9716, "lon": 77.5946, "district": "Bengaluru Urban", "state": "Karnataka"},
    "mysore": {"lat": 12.2958, "lon": 76.6394, "district": "Mysuru", "state": "Karnataka"},
    "hyderabad": {"lat": 17.3850, "lon": 78.4867, "district": "Hyderabad", "state": "Telangana"},
    "kochi": {"lat": 9.9312, "lon": 76.2673, "district": "Ernakulam", "state": "Kerala"},
    "pune": {"lat": 18.5204, "lon": 73.8567, "district": "Pune", "state": "Maharashtra"},
    "mumbai": {"lat": 19.0760, "lon": 72.8777, "district": "Mumbai", "state": "Maharashtra"},
    "delhi": {"lat": 28.7041, "lon": 77.1025, "district": "Delhi", "state": "Delhi"}
}

def haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371.0 # Earth radius in kilometers
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dlon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return round(R * c, 1)

class LocationService:
    def parse_location(self, loc_str: str) -> Dict[str, str]:
        loc_str_lower = loc_str.lower()
        matched_city = "Coimbatore"
        matched_state = "Tamil Nadu"
        matched_district = "Coimbatore"

        for city, data in CITY_COORDINATES.items():
            if city in loc_str_lower:
                matched_city = city.title()
                matched_state = data["state"]
                matched_district = data["district"]
                break

        return {
            "city": matched_city,
            "district": matched_district,
            "state": matched_state,
            "country": "India",
            "formatted": f"{matched_city}, {matched_state}, India"
        }

    def get_distance(self, loc1: str, loc2: str) -> float:
        l1 = self.parse_location(loc1)
        l2 = self.parse_location(loc2)

        c1 = CITY_COORDINATES.get(l1["city"].lower(), CITY_COORDINATES["coimbatore"])
        c2 = CITY_COORDINATES.get(l2["city"].lower(), CITY_COORDINATES["coimbatore"])

        if l1["city"].lower() == l2["city"].lower():
            return 12.5 # Average intra-city distance

        return haversine_km(c1["lat"], c1["lon"], c2["lat"], c2["lon"])

    def get_location_hierarchy(self, base_loc: str) -> List[str]:
        p = self.parse_location(base_loc)
        return [
            f"{p['city']} City",
            f"Nearby Districts ({p['state']})",
            f"Major Tech Hubs in {p['state']}",
            f"Pan-India"
        ]

location_service = LocationService()
