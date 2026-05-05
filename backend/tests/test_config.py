from pathlib import Path

from app.config import ENV_FILE, REPO_ROOT


def test_env_file_resolves_to_repo_root():
    assert ENV_FILE == REPO_ROOT / ".env"
    assert REPO_ROOT.name == "New project"
    assert (REPO_ROOT / "backend").is_dir()
