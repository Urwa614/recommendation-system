from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get MongoDB URI from environment variable
MONGO_URI = os.getenv("MONGO_URI")

# Create a Motor client and connect to MongoDB
client = AsyncIOMotorClient(MONGO_URI)
db = client.recommendation_system

# Collections
users_collection = db.users
recommendations_collection = db.recommendations

async def connect_to_mongo():
    try:
        # Verify the connection works by checking server info
        await client.admin.command('ping')
        print("✅ Connected to MongoDB successfully!")
        return True
    except ConnectionFailure as e:
        print(f"❌ Could not connect to MongoDB: {e}")
        return False

async def close_mongo_connection():
    client.close()
    print("Closed MongoDB connection")
