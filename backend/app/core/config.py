import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """
    налаштування застосунку
    """
    GROQ_API_KEY: str
    DATABASE_URL: str = "sqlite:///./yatra.db"
    ALLOWED_ORIGINS: str = "http://localhost:3000"

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
