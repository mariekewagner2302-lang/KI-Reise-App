from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from app.routes import planning

load_dotenv()

app = FastAPI(title="TravelPlanner Planning Service")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:3001").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ok", "service": "planning-service"}

@app.get("/health")
def health():
    return {"status": "healthy"}
# Routes
app.include_router(planning.router)
