from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from app.services.planning_service import generate_trip_plan

router = APIRouter(prefix="/api/v1/planning", tags=["planning"])

class TripRequest(BaseModel):
    destination: str
    budget: int
    duration: int
    interests: List[str]

@router.post("/generate")
async def generate_trip(request: TripRequest):
    """
    Generiert einen KI-basierten Reiseplan
    """
    
    # Validierung
    if request.duration < 1 or request.duration > 14:
        raise HTTPException(status_code=400, detail="Duration must be between 1 and 14 days")
    
    if request.budget < 50:
        raise HTTPException(status_code=400, detail="Budget must be at least 50€")
    
    if not request.interests:
        raise HTTPException(status_code=400, detail="At least one interest required")
    
    # KI-Reiseplan generieren
    result = generate_trip_plan(
        destination=request.destination,
        budget=request.budget,
        duration=request.duration,
        interests=request.interests
    )
    
    if not result["success"]:
        raise HTTPException(status_code=500, detail=result.get("error", "Failed to generate trip"))
    
    return result["data"]
