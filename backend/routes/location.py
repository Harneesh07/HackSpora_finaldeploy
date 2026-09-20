from fastapi import APIRouter
from services.location_service import location_service

router = APIRouter(prefix="/api/location", tags=["Location"])

@router.get("/parse")
async def parse_location(location: str = "Coimbatore, Tamil Nadu, India"):
    parsed = location_service.parse_location(location)
    hierarchy = location_service.get_location_hierarchy(location)
    return {
        "status": "success",
        "parsed": parsed,
        "hierarchy": hierarchy
    }
