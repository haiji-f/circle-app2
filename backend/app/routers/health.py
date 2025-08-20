# app/routers/health.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.db import get_db

router = APIRouter(prefix="/health", tags=["health"])

@router.get("", summary="DB health check")
def health(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1")).scalar()
        return {"ok": True}
    except Exception:
        raise HTTPException(status_code=503, detail="database unavailable")