from pymongo import MongoClient
from datetime import datetime

# MONGODB ATLAS CONNECTION

client = MongoClient(
    "mongodb+srv://supportx:Support123@chat-cluster.oaejile.mongodb.net/supportx_ai?retryWrites=true&w=majority&appName=chat-cluster"
)

# DATABASE

db = client["supportx_ai"]

# COLLECTION

chat_collection = db["chat_history"]


def save_chat(user_message, bot_response):

    chat_data = {

        "user_message": user_message,

        "bot_response": bot_response,

        "timestamp": datetime.now()

    }

    chat_collection.insert_one(chat_data)

    print("Chat Saved Successfully")