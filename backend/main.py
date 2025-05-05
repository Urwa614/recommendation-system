from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from datetime import datetime
import bcrypt
import os
from bson import ObjectId
from dotenv import load_dotenv

# Import our custom modules
from database import connect_to_mongo, close_mongo_connection, users_collection, recommendations_collection
from models import UserCreate, UserInDB, UserResponse, UserLogin, RecommendationCreate, RecommendationInDB, RecommendationResponse

# Load environment variables
load_dotenv()

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Events for database connection lifecycle
@app.on_event("startup")
async def startup_db_client():
    success = await connect_to_mongo()
    if not success:
        print("WARNING: Application starting without MongoDB connection!")

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()


@app.get("/")
async def root():
    return {"message": "Recommendation System API is running!"}

# Helper functions for password management
def hash_password(password: str) -> str:
    # Generate a salt and hash the password
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Verify a password against the hashed version
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
@app.post("/register", response_model=UserResponse)
async def register_user(user: UserCreate):
    try:
        # Check if username already exists
        existing_user = await users_collection.find_one({"username": user.username})
        if existing_user:
            raise HTTPException(status_code=400, detail="Username already exists")
        
        # Hash the password
        hashed_password = hash_password(user.password)
        
        # Create user document for MongoDB
        user_dict = user.dict()
        user_dict["password"] = hashed_password  # Replace with hashed password
        user_dict["created_at"] = datetime.utcnow()
        
        # Insert into database
        result = await users_collection.insert_one(user_dict)
        
        # Retrieve the created user from the database
        created_user = await users_collection.find_one({"_id": result.inserted_id})
        
        print(f"User registered: {user.username} with ID: {result.inserted_id}")
        
        # Return the user data (excluding password)
        return {
            "id": str(created_user["_id"]),
            "username": created_user["username"],
            "fullName": created_user.get("fullName"),
            "created_at": created_user["created_at"]
        }
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"Registration error: {e}")
        raise HTTPException(status_code=500, detail=f"Registration failed: {str(e)}")

@app.post("/login")
async def login_user(user: UserLogin):
    try:
        # Find the user in MongoDB
        stored_user = await users_collection.find_one({"username": user.username})
        
        # Check if user exists and verify password
        if not stored_user or not verify_password(user.password, stored_user["password"]):
            raise HTTPException(status_code=401, detail="Invalid username or password")
        
        print(f"User logged in: {user.username}")
        
        # Return user information
        return {
            "message": "Login successful",
            "username": stored_user["username"],
            "id": str(stored_user["_id"]),
            "fullName": stored_user.get("fullName")
        }
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"Login error: {e}")
        raise HTTPException(status_code=500, detail=f"Login failed: {str(e)}")

# --- Recommendation CRUD ---
@app.post("/recommendations", response_model=RecommendationResponse)
async def create_recommendation(rec: RecommendationCreate):
    try:
        # Create recommendation document for MongoDB
        rec_dict = rec.dict()
        rec_dict["created_at"] = datetime.utcnow()
        
        # Insert into database
        result = await recommendations_collection.insert_one(rec_dict)
        
        # Retrieve the created recommendation
        created_rec = await recommendations_collection.find_one({"_id": result.inserted_id})
        
        print(f"Recommendation created: {rec.title}")
        
        # Return the recommendation data
        return {
            "id": str(created_rec["_id"]),
            "title": created_rec["title"],
            "description": created_rec["description"],
            "user": created_rec["user"],
            "created_at": created_rec["created_at"]
        }
    
    except Exception as e:
        print(f"Error creating recommendation: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create recommendation: {str(e)}")

@app.get("/recommendations", response_model=List[RecommendationResponse])
async def get_recommendations(user: Optional[str] = None):
    try:
        # Build filter query
        query = {"user": user} if user else {}
        
        # Retrieve recommendations from MongoDB
        cursor = recommendations_collection.find(query).sort("created_at", -1)  # Sort by newest first
        recommendations = []
        
        # Convert MongoDB documents to our model
        async for doc in cursor:
            recommendations.append({
                "id": str(doc["_id"]),
                "title": doc["title"],
                "description": doc["description"],
                "user": doc["user"],
                "created_at": doc["created_at"]
            })
            
        return recommendations
    
    except Exception as e:
        print(f"Error getting recommendations: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to retrieve recommendations: {str(e)}")

@app.get("/recommendations/{rec_id}", response_model=RecommendationResponse)
async def get_recommendation(rec_id: str):
    try:
        # Convert string ID to ObjectId
        try:
            object_id = ObjectId(rec_id)
        except:
            raise HTTPException(status_code=400, detail="Invalid recommendation ID format")
        
        # Find the recommendation in MongoDB
        rec = await recommendations_collection.find_one({"_id": object_id})
        
        if not rec:
            raise HTTPException(status_code=404, detail="Recommendation not found")
        
        # Return the recommendation data
        return {
            "id": str(rec["_id"]),
            "title": rec["title"],
            "description": rec["description"],
            "user": rec["user"],
            "created_at": rec["created_at"]
        }
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error getting recommendation: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to retrieve recommendation: {str(e)}")

@app.put("/recommendations/{rec_id}")
async def update_recommendation(rec_id: str, rec: RecommendationCreate):
    try:
        # Convert string ID to ObjectId
        try:
            object_id = ObjectId(rec_id)
        except:
            raise HTTPException(status_code=400, detail="Invalid recommendation ID format")
        
        # Check if recommendation exists
        existing_rec = await recommendations_collection.find_one({"_id": object_id})
        if not existing_rec:
            raise HTTPException(status_code=404, detail="Recommendation not found")
        
        # Update the recommendation in MongoDB
        update_data = {
            "$set": {
                "title": rec.title,
                "description": rec.description,
                "updated_at": datetime.utcnow()
            }
        }
        
        result = await recommendations_collection.update_one({"_id": object_id}, update_data)
        
        if result.modified_count == 0:
            # This would be odd if we got here (record exists but wasn't updated)
            return {"message": "No changes made", "id": rec_id}
        
        return {"message": "Recommendation updated", "id": rec_id}
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error updating recommendation: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to update recommendation: {str(e)}")

@app.delete("/recommendations/{rec_id}")
async def delete_recommendation(rec_id: str):
    try:
        # Convert string ID to ObjectId
        try:
            object_id = ObjectId(rec_id)
        except:
            raise HTTPException(status_code=400, detail="Invalid recommendation ID format")
        
        # Delete the recommendation from MongoDB
        result = await recommendations_collection.delete_one({"_id": object_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Recommendation not found")
        
        return {"message": "Recommendation deleted"}
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error deleting recommendation: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to delete recommendation: {str(e)}")
