from fastapi import APIRouter, Request
from sse_starlette.sse import EventSourceResponse
from app.services.chat_service import chat_service
from pydantic import BaseModel, Field
from typing import List, Literal

router = APIRouter()


class ChatMessage(BaseModel):
    """
    одне повідомлення в історії чату
    """
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=4000)


class ChatRequest(BaseModel):
    """
    запит до чату
    """
    user_message: str = Field(min_length=1, max_length=2000)
    chat_history: List[ChatMessage] = Field(default_factory=list, max_length=20)


@router.post("/stream")
async def chat_endpoint(request: Request, data: ChatRequest):
    """
    ендпоінт для потокового чату через SSE
    """
    # конвертуємо в формат для groq
    history = [{"role": m.role, "content": m.content} for m in data.chat_history]

    async def event_generator():
        async for chunk in chat_service.stream_chat(data.user_message, history):
            # перевірка на розрив з'єднання
            if await request.is_disconnected():
                break
            yield {"data": chunk}

    return EventSourceResponse(event_generator())
