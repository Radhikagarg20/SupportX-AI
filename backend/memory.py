from pymongo import MongoClient

client = MongoClient(
    "mongodb+srv://supportx:Support123@chat-cluster.oaejile.mongodb.net/supportx_ai?retryWrites=true&w=majority&appName=chat-cluster"
)

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