import os
from app.services.groq_service import groq_service

class ChatService:
    """
    сервіс для обробки чат-повідомлень
    """
    def __init__(self):
        self.system_prompt_path = os.path.join(
            os.path.dirname(__file__), "..", "prompts", "system_prompt.txt"
        )
        self._system_prompt = None

    @property
    def system_prompt(self):
        if self._system_prompt is None:
            with open(self.system_prompt_path, "r", encoding="utf-8") as f:
                self._system_prompt = f.read().strip()
        return self._system_prompt

    async def stream_chat(self, user_message: str, chat_history: list):
        """
        генерує потокову відповідь
        """
        messages = [{"role": "system", "content": self.system_prompt}]
        
        # додаємо історію (останні 10 повідомлень за GEMINI.md)
        for msg in chat_history[-10:]:
            messages.append(msg)
            
        messages.append({"role": "user", "content": user_message})
        
        stream = await groq_service.get_chat_response(messages, stream=True)
        
        async for chunk in stream:
            content = chunk.choices[0].delta.content
            if content:
                yield content

chat_service = ChatService()
