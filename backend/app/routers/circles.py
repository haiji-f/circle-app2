# app/routers/circles.py
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select, or_
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.db import get_db
from app.models import Circle
from app.schemas import CircleCreate, CircleUpdate, CircleOut

router = APIRouter(prefix="/api/circles", tags=["circles"])


@router.get("", response_model=list[CircleOut])
def list_circles(
    size: int = Query(50, ge=1, le=200, description="size"),
    search: Optional[str] = Query(None, description="word searching"),
    sort: str = Query("-created_at", description="sorted_key: created_at|name|id, '-'is DESC"),
    db: Session = Depends(get_db),
):
    stmt = select(Circle)

    if search:
        like = f"%{search}%"
        stmt = stmt.where(or_(Circle.name.ilike(like), Circle.description.ilike(like)))
    columns = {
        "created_at": Circle.created_at,
        "name": Circle.name,
        "id": Circle.id,
    }
    desc = sort.startswith("-")
    key = sort[1:] if desc else sort
    col = columns.get(key, Circle.created_at)
    order_col = col.desc() if desc else col.asc()

    stmt = stmt.order_by(order_col).limit(size)
    return db.execute(stmt).scalars().all()


@router.get("/{circle_id}", response_model=CircleOut)
def get_circle(circle_id: int, db: Session = Depends(get_db)):
    row = db.get(Circle, circle_id)
    if not row:
        raise HTTPException(status_code=404, detail="circle not found")
    return row


@router.post("", response_model=CircleOut, status_code=201)
def create_circle(payload: CircleCreate, db: Session = Depends(get_db)):
    c = Circle(**payload.model_dump())
    db.add(c)
    try:
        db.commit()
        db.refresh(c)
        return c
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="circle name already exists")
    except Exception:
        db.rollback()
        raise HTTPException(status_code=400, detail="cannot create circle")


@router.put("/{circle_id}", response_model=CircleOut)
def update_circle(circle_id: int, payload: CircleUpdate, db: Session = Depends(get_db)):
    row = db.get(Circle, circle_id)
    if not row:
        raise HTTPException(status_code=404, detail="circle not found")

    data = payload.model_dump(exclude_unset=True)
    allowed_fields = {"name", "description", "icon"}

    changed = False
    for field, value in data.items():
        if field not in allowed_fields or value is None:
            continue
        if not hasattr(row, field):
            continue
        if getattr(row, field) != value:
            setattr(row, field, value)
            changed = True

    if not changed:
        return row

    try:
        db.commit()
        db.refresh(row)
        return row
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="circle name already exists")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"cannot update circle: {e}")


@router.delete("/{circle_id}", status_code=204)
def delete_circle(circle_id: int, db: Session = Depends(get_db)):
    row = db.get(Circle, circle_id)
    if not row:
        raise HTTPException(status_code=404, detail="circle not found")
    db.delete(row)
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"cannot delete circle: {e}")
