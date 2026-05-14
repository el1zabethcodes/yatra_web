from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from app.core.db import Base

class Roadmap(Base):
    """
    модель дорожньої карти
    """
    __tablename__ = "roadmaps"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    career = Column(String, nullable=False)
    content = Column(Text, nullable=False) # JSON контент
    created_at = Column(DateTime(timezone=True), server_default=func.now())
