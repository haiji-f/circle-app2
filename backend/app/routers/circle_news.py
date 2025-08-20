# app/routers/circle_news.py
from datetime import date
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import select, or_
from sqlalchemy.exc import IntegrityError

from app.db import get_db
from app.models import Circle, CircleNews
from app.schemas import CircleNewsOut, CircleNewsCreate

router = APIRouter(
    prefix="/api/circles/{circle_id}/news",
    tags=["circle_news"]
)

@router.get("", response_model=list[CircleNewsOut])
def list_circle_news(
    circle_id: int,
    size: int = Query(50, ge=1, le=200, description="Maximum number of news items to return"),
    search: Optional[str] = Query(None, description="title/tags Search"),
    date_from: Optional[date] = Query(None, description="YYYY-MM-DD start date (inclusive)"),
    date_to: Optional[date] = Query(None, description="YYYY-MM-DD end date (inclusive)"),
    db: Session = Depends(get_db),
):
    stmt = select(CircleNews).where(CircleNews.circle_id == circle_id)

    if search:
        like = f"%{search}%"
        try:
            stmt = stmt.where(or_(CircleNews.title.ilike(like), CircleNews.content.ilike(like)))
        except AttributeError:
            stmt = stmt.where(CircleNews.title.ilike(like))

    if date_from is not None:
        try:
            stmt = stmt.where(CircleNews.created_at >= date_from)
        except AttributeError:
            pass
    if date_to is not None:
        try:
            stmt = stmt.where(CircleNews.created_at <= date_to)
        except AttributeError:
            pass

    stmt = stmt.order_by(CircleNews.id.desc()).limit(size)
    return db.execute(stmt).scalars().all()


@router.post("", response_model=CircleNewsOut, status_code=201)
def create_circle_news(circle_id: int, payload: CircleNewsCreate, db: Session = Depends(get_db)):
    exists = db.execute(select(Circle.id).where(Circle.id == circle_id)).scalar_one_or_none()
    if not exists:
        raise HTTPException(status_code=404, detail="circle not found")
    
    if payload.circle_id != circle_id:
        raise HTTPException(status_code=400, detail="circle_id mismatch")

    item = CircleNews(
        circle_id=circle_id,
        title=payload.title,
        content=payload.content,
        date=payload.date,
        has_photo=payload.has_photo
        )

    db.add(item)
    try:
        db.commit()
        db.refresh(item)
        return item
    except IntegrityError as e:
        db.rollback()
        msg = str(getattr(e, "orig", e)).lower()
        if "foreign key" in msg:
            raise HTTPException(status_code=409, detail="circle_id FK violation")
        if "not null" in msg:
            raise HTTPException(status_code=400, detail="required column missing")
        raise HTTPException(status_code=400, detail="integrity error")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"cannot create circle_news: {e}")


@router.get("/{id}", response_model=CircleNewsOut)
def get_circle_news(circle_id: int, id: int, db: Session = Depends(get_db)):
    row = db.execute(
        select(CircleNews).where(CircleNews.circle_id == circle_id, CircleNews.id == id)
    ).scalar_one_or_none()
    if not row:
        raise HTTPException(status_code=404, detail="circle_news not found")
    return row


@router.put("/{id}", response_model=CircleNewsOut)
def update_circle_news(circle_id: int, id: int, payload: CircleNewsCreate, db: Session = Depends(get_db)):
    row = db.execute(
        select(CircleNews).where(CircleNews.circle_id == circle_id, CircleNews.id == id)
    ).scalar_one_or_none()
    if not row:
        raise HTTPException(status_code=404, detail="circle_news not found")

    data = payload.model_dump()
    for field, value in data.items():
        if hasattr(row, field) and getattr(row, field) != value:
            setattr(row, field, value)

    try:
        db.commit()
        db.refresh(row)
        return row
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"integrity error: {e}")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"cannot update circle_news: {e}")


@router.delete("/{id}", status_code=204)
def delete_circle_news(circle_id: int, id: int, db: Session = Depends(get_db)):
    row = db.execute(
        select(CircleNews).where(CircleNews.circle_id == circle_id, CircleNews.id == id)
    ).scalar_one_or_none()
    if not row:
        raise HTTPException(status_code=404, detail="circle_news not found")

    db.delete(row)
    try:
        db.commit()
    except Exception:
        db.rollback()
        raise HTTPException(status_code=400, detail="cannot delete circle_news")