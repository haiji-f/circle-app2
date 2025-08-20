from datetime import datetime,date
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field,AnyUrl

class ORMConfig(BaseModel):
    model_config = ConfigDict(from_attributes=True)

# ---- User ----
class UserCreate(BaseModel):
    name: str = Field(..., max_length=40)
    email: str = Field(..., max_length=40)
    icon: Optional[str] = Field(None, max_length=300)
    login_id: str = Field(..., max_length=40,min_length=6)
    login_pass: str = Field(..., max_length=200, min_length=6) 

class UserOut(ORMConfig):
    id: int 
    name: str 
    email: str
    icon: Optional[str]
    login_id: str
    login_pass: str
    created_at: datetime

class UserUpdate(BaseModel):
    name: Optional[str] = Field(None, max_length=40)
    email: Optional[str] = Field(None, max_length=40)
    icon: Optional[str] = Field(None, max_length=300)
    login_id: Optional[str] = Field(None, max_length=40)
    login_pass: Optional[str] = Field(None, max_length=40, min_length=6)



# ---- User Schedule  ----

class UserScheduleCreate(BaseModel):
    title: str
    start_at: date
    end_at: date
    memo: Optional[str] = None
    schedule_code: str

class UserScheduleUpdate(BaseModel):
    title: Optional[str] = None
    start_at: Optional[date] = None
    end_at: Optional[date] = None
    memo: Optional[str] = None
    schedule_code: Optional[str] = None

class UserScheduleOut(ORMConfig):
    id: int
    user_id: int
    title: str
    start_at: date
    end_at: date
    memo: Optional[str]
    schedule_code: str
    created_at: datetime


 
# ---- Circle ----
class SNSLinks(BaseModel):
    line: Optional[AnyUrl] = None
    x: Optional[AnyUrl] = None
    instagram: Optional[AnyUrl] = None

class CircleCreate(BaseModel):
    name: str = Field(..., max_length=100)
    description: Optional[str] = None
    admin_id: Optional[int] = None
    sns_links: Optional[SNSLinks] = None
    image: Optional[AnyUrl] = Field(None,max_length=300)

class CircleOut(ORMConfig):
    id: int
    name: str
    description: Optional[str]
    admin_id: Optional[int]
    created_at: datetime
    followers: int
    sns_links: Optional[SNSLinks] = None
    image: Optional[AnyUrl] = Field(None,max_length=300)

class CircleUpdate(BaseModel):
    name: Optional[str] = Field(None, max_length=100)
    description: Optional[str] = None
    icon: Optional[str] = None
    admin_id: Optional[int] = None
    sns_links: Optional[SNSLinks] = None



    
# ---- Circle News ----

class CircleNewsCreate(BaseModel):
    circle_id: int
    title: str = Field(..., max_length=200)
    date: date
    content: Optional[str] = None
    has_photo: bool = False

class CircleNewsOut(ORMConfig):
    id: int
    circle_id: int
    title: str
    date: date
    content: Optional[str]
    has_photo: bool
    created_at: datetime

# ---- Notification ----

class NotificationCreate(BaseModel):
    user_id: int
    circle_id: int
    title: str = Field(..., max_length=200)
    date: date
    message: Optional[str] = None

class NotificationOut(ORMConfig):
    id: int
    user_id: int
    circle_id: int
    title: str
    date: date
    message: Optional[str]
    created_at: datetime

# ---- Followed ----

class FollowedCreate(BaseModel):
    user_id: int
    circle_id: int
    date: Optional[date] 

class FollowedOut(ORMConfig):
    id: int
    user_id: int
    circle_id: int
    date: Optional[date]
