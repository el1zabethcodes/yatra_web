import os
from groq import AsyncGroq
from app.core.config import settings

class GroqService:
    """
    сервіс для роботи з groq api
    """
    def __init__(self):
        self.client = AsyncGroq(api_key=settings.GROQ_API_KEY)
        self.model = "llama-3.1-8b-instant"

    async def get_chat_response(self, messages: list, stream: bool = True):
        """
        повертає відповідь від чату
        """
        response = await self.client.chat.completions.create(
            messages=messages,
            model=self.model,
            temperature=1,
            max_completion_tokens=3711,
            top_p=1,
            stream=stream,
            stop=None
        )
        return response

groq_service = GroqService()
