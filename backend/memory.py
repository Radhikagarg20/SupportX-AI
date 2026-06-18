from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["supportx_ai"]

memory_collection = db["memory"]


# SAVE MEMORY
def save_memory(key, value):

    memory_collection.update_one(
        {"key": key},
        {"$set": {"value": value}},
        upsert=True
    )


# GET MEMORY
def get_memory(key):

    data = memory_collection.find_one(
        {"key": key}
    )

    if data:
        return data["value"]

    return None
