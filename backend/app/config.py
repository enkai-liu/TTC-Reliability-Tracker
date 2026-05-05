from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "sqlite:///./ttc_reliability.db"
    gtfs_realtime_vehicle_positions_url: str | None = None
    gtfs_realtime_api_key: str | None = None
    gtfs_static_zip_url: str | None = None
    gtfs_static_zip_path: str | None = None
    api_cors_origins: str = Field(default="http://localhost:5173")

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.api_cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
