# app/routers/users.py
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select, or_
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from app.db import get_db
from app.models import User
from app.schemas import UserCreate, UserUpdate, UserOut
from app.security.security import hash_pw

router = APIRouter(prefix="/api/users", tags=["users"])


@router.get("", response_model=list[UserOut])
def list_users(
    size: int = Query(20, ge=1, le=100, description="Number of users to return"),
    search: str | None = Query(None, description="(name/email/login_id) word searching"),
    sort: str = Query("-id", description="sort: id|name|created_at, '-' is DESC"),
    db: Session = Depends(get_db),
):
    # base query
    select_user = select(User)

    # optional keyword search across name/email/login_id (case-insensitive)
    if search:
        like = f"%{search}%"
        select_user = select_user.where(
            or_(
                User.name.ilike(like),
                User.email.ilike(like),
                User.login_id.ilike(like),
            )
        )

    # sorting: support id/name/created_at with optional '-' for DESC
    sort_col = {"id": User.id, "name": User.name, "created_at": User.created_at}
    desc = sort.startswith("-") 
    key = sort[1:] if desc else sort
    order_col = sort_col.get(key, User.id)
    order_col = order_col.desc() if desc else order_col.asc()

    # apply order + limit and execute
    return db.execute(select_user.order_by(order_col).limit(size)).scalars().all()




@router.post("", response_model=UserOut, status_code=201)
def create_user(payload: UserCreate, db: Session = Depends(get_db)):
    data = payload.model_dump(exclude_none=True)

    # --- login_id: required + normalize + length(6~40) ---
    login_id = data.get("login_id")
    if not login_id:
        raise HTTPException(status_code=400, detail="login_id is required")
    login_id = login_id.strip()
    if len(login_id) < 6 or len(login_id) > 40:
        raise HTTPException(status_code=400, detail="login_id must be between 6 and 40 characters")
    data["login_id"] = login_id

    # --- password: required + hash + length(6~50) ---
    password = data.get("login_pass")
    if not password:
        raise HTTPException(status_code=400, detail="login_pass (or password) is required")
    if len(password) < 6 or len(password) > 50:
        raise HTTPException(status_code=400, detail="login_pass must be between 6 and 50 characters")
    try:
        data["login_pass"] = hash_pw(password)
    except Exception:
        raise HTTPException(status_code=400, detail="password hashing failed")

    # --- email: required + normalize + basic format + length(<=40) ---
    email = data.get("email")
    if email is None:
        raise HTTPException(status_code=400, detail="email is required")
    email = email.strip().lower()
    if "@" not in email:
        raise HTTPException(status_code=400, detail="invalid email format")
    if len(email) > 40:
        raise HTTPException(status_code=400, detail="email exceeds maximum length of 40 characters")
    data["email"] = email

    # --- name: required + normalize + length(<=40) ---
    name = data.get("name")
    if not name:
        raise HTTPException(status_code=400, detail="name is required")
    name = name.strip()
    if len(name) > 40:
        raise HTTPException(status_code=400, detail="name exceeds maximum length of 40 characters")
    data["name"] = name

    # --- 사전 중복 검사 (친절한 409) ---
    dup = db.execute(
        select(User.id).where(or_(User.email == data["email"], User.login_id == data["login_id"]))
    ).scalar_one_or_none()
    if dup:
        raise HTTPException(status_code=409, detail="email or login_id already exists")

    # --- 생성 & 커밋 ---
    user = User(**data)
    db.add(user)
    try:
        db.commit()
        db.refresh(user)
        return user
    except IntegrityError:
        db.rollback()
        # 레이스 컨디션 등 최종 방어
        raise HTTPException(status_code=409, detail="email or login_id already exists")
    except Exception:
        db.rollback()
        raise HTTPException(status_code=400, detail="cannot create user")
 
    

@router.get("/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):
    row = db.execute(select(User).where(User.id == user_id)).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=404, detail="User not found")
    return row



@router.put("/{user_id}", response_model=UserOut)
def update_user(user_id: int, payload: UserUpdate, db: Session = Depends(get_db)):
    user = db.execute(select(User).where(User.id == user_id)).scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    data = payload.model_dump(exclude_unset=True)

    # --- name: optional; if provided, normalize and validate (<=40) ---
    if "name" in data:
        name = data["name"]
        if name is None or not str(name).strip():
            raise HTTPException(status_code=400, detail="name is required")
        name = name.strip()
        if len(name) > 40:
            raise HTTPException(status_code=400, detail="name exceeds maximum length of 40 characters")
        data["name"] = name

    # --- email: optional; if provided, normalize and validate (<=40) ---
    if "email" in data:
        email = data["email"]
        if email is None or not str(email).strip():
            raise HTTPException(status_code=400, detail="email is required")
        email = email.strip().lower()
        if "@" not in email:
            raise HTTPException(status_code=400, detail="invalid email format")
        if len(email) > 40:
            raise HTTPException(status_code=400, detail="email exceeds maximum length of 40 characters")
        data["email"] = email

    # --- login_id: optional; if provided, normalize and validate (6~40) ---
    if "login_id" in data:
        login_id = data["login_id"]
        if login_id is None or not str(login_id).strip():
            raise HTTPException(status_code=400, detail="login_id is required")
        login_id = login_id.strip()
        if len(login_id) < 6 or len(login_id) > 40:
            raise HTTPException(status_code=400, detail="login_id must be between 6 and 40 characters")
        data["login_id"] = login_id

    # --- login_pass: optional; if provided, validate (6~50) and hash ---
    if "login_pass" in data:
        password = data["login_pass"]
        if not password:
            raise HTTPException(status_code=400, detail="login_pass (or password) is required")
        if len(password) < 6 or len(password) > 50:
            raise HTTPException(status_code=400, detail="login_pass must be between 6 and 50 characters")

    if "login_pass" in data and data["login_pass"]:
        try:
            data["login_pass"] = hash_pw(data["login_pass"])
        except Exception:
            raise HTTPException(status_code=400, detail="password hashing failed")

    allowed_fields = {"name", "email", "login_id", "login_pass", "icon"}
    changed = False

    for key, value in data.items():
        if key in allowed_fields and value is not None and getattr(user, key) != value:
            setattr(user, key, value)
            changed = True

    if not changed:
        return user

    try:
        db.commit()
        db.refresh(user)
        return user
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="email or login_id already exists")
    except Exception:
        db.rollback()
        raise HTTPException(status_code=400, detail="cannot update user")




@router.delete("/{user_id}", status_code=204)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    row = db.execute(select(User).where(User.id == user_id)).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(row)
    try:
        db.commit()
        return {user_id:"is deleted"}
    except Exception:
        db.rollback()
        raise HTTPException(status_code=400, detail="cannot delete user")




