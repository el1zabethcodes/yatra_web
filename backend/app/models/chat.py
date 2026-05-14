from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from app.core.db import Base

class ChatHistory(Base):
    """
    модель історії чату
    """
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    message = Column(Text, nullable=False)
    role = Column(String, nullable=False) # user або assistant
    created_at = Column(DateTime(timezone=True), server_default=func.now())
