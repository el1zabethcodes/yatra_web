from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from app.core.config import settings

# замінюємо sqlite:// на sqlite+aiosqlite:// для асинхронності
SQLALCHEMY_DATABASE_URL = settings.DATABASE_URL.replace("sqlite:///", "sqlite+aiosqlite:///")

engine = create_async_engine(
    SQLALCHEMY_DATABASE_URL,
)

SessionLocal = async_sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    class_=AsyncSession
)

class Base(DeclarativeBase):
    """
    базовий клас для моделей
    """
    pass

async def get_db():
    """
    залежність для отримання сесії бд
    """
    async with SessionLocal() as session:
        yield session
        await session.commit()
