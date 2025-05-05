from pydantic import BaseModel, Field, field_serializer, model_validator
from typing import Optional, Any
from datetime import datetime
from bson import ObjectId

# Function to convert ObjectId to string for serialization
def serialize_object_id(obj_id: ObjectId) -> str:
    return str(obj_id) if obj_id else None

# User models
class UserBase(BaseModel):
    username: str
    password: str  # Note: In production, passwords should never be stored in plain text

class UserCreate(UserBase):
    fullName: Optional[str] = None
    phone: Optional[str] = None
    city: Optional[str] = None

class UserInDB(UserBase):
    id: Optional[ObjectId] = Field(default_factory=ObjectId, alias="_id")
    fullName: Optional[str] = None
    phone: Optional[str] = None
    city: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
    }
    
    @field_serializer('id')
    def serialize_id(self, id: ObjectId) -> str:
        return serialize_object_id(id)

class UserResponse(BaseModel):
    id: str
    username: str
    fullName: Optional[str] = None
    created_at: datetime

class UserLogin(BaseModel):
    username: str
    password: str

# Recommendation models
class RecommendationBase(BaseModel):
    title: str
    description: str
    user: str  # username or user ID of the creator

class RecommendationCreate(RecommendationBase):
    pass

class RecommendationInDB(RecommendationBase):
    id: Optional[ObjectId] = Field(default_factory=ObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
    }
    
    @field_serializer('id')
    def serialize_id(self, id: ObjectId) -> str:
        return serialize_object_id(id)

class RecommendationResponse(BaseModel):
    id: str
    title: str
    description: str
    user: str
    created_at: datetime
