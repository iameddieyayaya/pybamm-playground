from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from pybamm_integration import run_simulation


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SimulationInput(BaseModel):
    temperature: float
    current: float
    charge_rate: float
    discharge_rate: float
    
    @app.get("/")
    async def root():
        return {"message": "Hello World"}

@app.post("/simulate/")
async def simulate(input: SimulationInput):
    try:
        params = {
            "Ambient temperature [K]": input.temperature,
            "Typical current [A]": input.current,
            "C-rate": input.charge_rate,
            "Discharge C-rate": input.discharge_rate,
        }

        results = run_simulation(params, check_already_exists=False)

        return {"status": "success", "results": results}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Simulation error: {str(e)}")

@app.get("/history/")
async def get_history(user_id: int):
    pass