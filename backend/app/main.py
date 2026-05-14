from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.api_v1 import api_router
from app.core.config import settings

app = FastAPI(title="Yatra API")

# дозволені origins — задаються через змінну середовища
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in settings.ALLOWED_ORIGINS.split(",")
    if origin.strip()
]

# налаштування cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)

@app.get("/")
async def root():
    """
    перевірка працездатності
    """
    return {"message": "Yatra API"}

# підключення роутів
app.include_router(api_router, prefix="/api/v1")
