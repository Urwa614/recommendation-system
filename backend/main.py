from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import uuid
from datetime import datetime

app = FastAPI()

# Allow CORS for frontend (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple in-memory database for reliable operation
db = {
    "users": [],  # Will store user objects
    "recommendations": []  # Will store recommendation objects
}

# Save database to a file to persist data between server restarts
def save_db_to_file():
    try:
        with open("db.json", "w") as f:
            json.dump(db, f)
        print("💾 Database saved to file")
    except Exception as e:
        print(f"Error saving database: {e}")

# Load database from file if it exists
try:
    with open("db.json", "r") as f:
        loaded_data = json.load(f)
        db.update(loaded_data)
    print(f"📂 Loaded database with {len(db['users'])} users and {len(db['recommendations'])} recommendations")
except FileNotFoundError:
    print("💫 No existing database found, starting fresh")
except Exception as e:
    print(f"Error loading database: {e}")


@app.get("/")
async def root():
    return {"message": "Backend is running!"}

# Example: User registration endpoint
from pydantic import BaseModel

class User(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class Recommendation(BaseModel):
    title: str
    description: str
    user: str  # username of the creator
@app.post("/register")
async def register_user(user: User):
    try:
        # Check if user already exists
        if any(u.get("username", "").lower() == user.username.lower() for u in db["users"]):
            raise HTTPException(status_code=400, detail="User already exists")
        
        # Create new user with unique ID
        user_id = str(uuid.uuid4())
        user_data = {
            "id": user_id,
            "username": user.username,
            "password": user.password,  # In production, this should be hashed
            "created_at": str(datetime.now())
        }
        
        # Add to database
        db["users"].append(user_data)
        
        # Save to file for persistence
        save_db_to_file()
        
        print(f"User registered: {user.username} with ID: {user_id}")
        return {"message": "User registered successfully", "id": user_id, "username": user.username}
    except HTTPException:
        raise
    except Exception as e:
        print(f"Registration error: {e}")
        raise HTTPException(status_code=500, detail=f"Registration failed: {str(e)}")

@app.post("/login")
async def login_user(user: UserLogin):
    try:
        # Find the user
        user_found = None
        for stored_user in db["users"]:
            if stored_user["username"].lower() == user.username.lower() and stored_user["password"] == user.password:
                user_found = stored_user
                break
        
        # Handle login failure
        if not user_found:
            raise HTTPException(status_code=401, detail="Invalid username or password")
            
        print(f"User logged in: {user.username}")
        return {
            "message": "Login successful",
            "username": user_found["username"],
            "id": user_found["id"]
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Login error: {e}")
        raise HTTPException(status_code=500, detail=f"Login failed: {str(e)}")

# --- Recommendation CRUD ---
@app.post("/recommendations")
async def create_recommendation(rec: Recommendation):
    try:
        # Generate a unique ID
        rec_id = str(uuid.uuid4())
        
        # Create recommendation object
        rec_data = {
            "id": rec_id,
            "title": rec.title,
            "description": rec.description,
            "user": rec.user,
            "created_at": str(datetime.now())
        }
        
        # Add to database
        db["recommendations"].append(rec_data)
        
        # Save to file
        save_db_to_file()
        
        print(f"Recommendation created: {rec.title}")
        return rec_data
    except Exception as e:
        print(f"Error creating recommendation: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create recommendation: {str(e)}")

@app.get("/recommendations")
async def get_recommendations(user: str = None):
    try:
        # Filter by user if provided
        if user:
            recs = [rec for rec in db["recommendations"] if rec["user"] == user]
        else:
            recs = db["recommendations"]
            
        return recs
    except Exception as e:
        print(f"Error getting recommendations: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to retrieve recommendations: {str(e)}")

@app.get("/recommendations/{rec_id}")
async def get_recommendation(rec_id: str):
    try:
        # Find the recommendation
        for rec in db["recommendations"]:
            if rec["id"] == rec_id:
                return rec
                
        raise HTTPException(status_code=404, detail="Recommendation not found")
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error getting recommendation: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to retrieve recommendation: {str(e)}")

@app.put("/recommendations/{rec_id}")
async def update_recommendation(rec_id: str, rec: Recommendation):
    try:
        # Find the recommendation
        for i, stored_rec in enumerate(db["recommendations"]):
            if stored_rec["id"] == rec_id:
                # Update fields
                db["recommendations"][i]["title"] = rec.title
                db["recommendations"][i]["description"] = rec.description
                db["recommendations"][i]["updated_at"] = str(datetime.now())
                
                # Save changes
                save_db_to_file()
                
                return {"message": "Recommendation updated", "id": rec_id}
                
        raise HTTPException(status_code=404, detail="Recommendation not found")
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error updating recommendation: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to update recommendation: {str(e)}")

@app.delete("/recommendations/{rec_id}")
async def delete_recommendation(rec_id: str):
    try:
        # Find and remove the recommendation
        for i, rec in enumerate(db["recommendations"]):
            if rec["id"] == rec_id:
                db["recommendations"].pop(i)
                
                # Save changes
                save_db_to_file()
                
                return {"message": "Recommendation deleted"}
                
        raise HTTPException(status_code=404, detail="Recommendation not found")
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error deleting recommendation: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to delete recommendation: {str(e)}")
