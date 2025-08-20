from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from app.db import get_db
from app.models import Followed, User, Circle
from app.schemas import FollowedCreate, FollowedOut
from app.security.auth_deps import get_current_user


router = APIRouter(prefix="/api/followed", tags=["followed"])

@router.get("", response_model=list[FollowedOut])
def list_my_followed_circles(
    current_user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    # 現在ログイン中のユーザーのuser_idでフィルタリングする条件を追加します。
    stmt = (
        select(Followed)
        .where(Followed.user_id == current_user.id)
        .order_by(Followed.id.desc())
    )
    rows = db.execute(stmt).scalars().all()
    return rows

@router.post("", response_model=FollowedOut)
def create_Followed(
    payload: FollowedCreate, 
    current_user: User = Depends(get_current_user), # ログイン中のユーザー情報を取得します。
    db: Session = Depends(get_db)
):
    # payloadのuser_idの代わりに、現在ログイン中のユーザーのIDを強制的に使用します。
    data = payload.model_dump()
    data["user_id"] = current_user.id

    # circle の存在確認
    c = db.execute(select(Circle.id).where(Circle.id == payload.circle_id)).scalar_one_or_none()
    if not c:
        raise HTTPException(status_code=404, detail="circle not found")

    # 重複チェックは current_user.id を使う
    dup = db.execute(
        select(Followed.id).where(
            Followed.user_id == current_user.id,
            Followed.circle_id == payload.circle_id
        )
    ).scalar_one_or_none()
    if dup:
        raise HTTPException(status_code=409, detail="already joined")

    # 正しい user_id を含めて一度だけ作成
    f = Followed(**data)

    db.add(f)
    try:
        db.commit()
        db.refresh(f)
        return f
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=409, detail="integrity error")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"cannot create Followed: {e}")

@router.get("/{id}", response_model=FollowedOut)
def get_Followed(
    id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    row = db.execute(
        select(Followed).where(
            Followed.id == id,
            Followed.user_id == current_user.id
        )
    ).scalar_one_or_none()
    if not row:
        raise HTTPException(status_code=404, detail="Followed not found")
    return row

@router.delete("/{circle_id}", status_code=204)
def delete_Followed(
    circle_id: int, 
    current_user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    # 現在ログイン中のユーザーと脱退したいサークルIDで参加情報を検索します。
    stmt = select(Followed).where(
        Followed.user_id == current_user.id, 
        Followed.circle_id == circle_id
    )
    row = db.execute(stmt).scalar_one_or_none()

    if not row:
        raise HTTPException(status_code=404, detail="Followed relationship not found")
    
    db.delete(row)
    db.commit()
