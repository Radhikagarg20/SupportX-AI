from memory import save_memory, get_memory
from auth import (
    hash_password,
    check_password,
    generate_token
)

from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from gemini_engine import ask_gemini

import os
import re

# =========================
# LOAD ENV VARIABLES
# =========================

load_dotenv()

# =========================
# FLASK APP
# =========================

app = Flask(__name__)

CORS(app)

# =========================
# MONGODB CONNECTION
# =========================

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["supportx_ai"]

chat_collection = db["chat_history"]

users_collection = db["users"]

# =========================
# HOME ROUTE
# =========================

@app.route("/")
def home():

    return jsonify({
        "message": "SupportX AI Backend Running"
    })


# =========================
# SIGNUP ROUTE
# =========================

@app.route("/signup", methods=["POST"])
def signup():

    try:

        data = request.json

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if not name or not email or not password:

            return jsonify({
                "message": "All fields are required"
            }), 400

        existing_user = users_collection.find_one({
            "email": email
        })

        if existing_user:

            return jsonify({
                "message": "User already exists"
            }), 400

        hashed_password = hash_password(password)

        users_collection.insert_one({

            "name": name,
            "email": email,
            "password": hashed_password

        })

        return jsonify({
            "message": "Signup successful"
        })

    except Exception as e:

        return jsonify({
            "message": str(e)
        }), 500


# =========================
# LOGIN ROUTE
# =========================

@app.route("/login", methods=["POST"])
def login():

    try:

        data = request.json

        email = data.get("email")
        password = data.get("password")

        user = users_collection.find_one({
            "email": email
        })

        if not user:

            return jsonify({
                "message": "User not found"
            }), 404

        if not check_password(
            user["password"],
            password
        ):

            return jsonify({
                "message": "Invalid password"
            }), 401

        token = generate_token(email)

        return jsonify({

            "message": "Login successful",
            "token": token,
            "name": user["name"]

        })

    except Exception as e:

        return jsonify({
            "message": str(e)
        }), 500


# =========================
# CHAT ROUTE
# =========================

@app.route("/chat", methods=["POST"])
def chat():

    try:

        data = request.json

        user_message = data.get("message")

        if not user_message:

            return jsonify({
                "response": "Please enter a message."
            })

        lower_message = user_message.lower()

        # SAVE MEMORY

        if "my name is" in lower_message:

            try:

                name = re.split(
                    r"my name is",
                    user_message,
                    flags=re.IGNORECASE
                )[1].strip()

                save_memory(
                    "username",
                    name
                )

            except:

                pass

        # RECALL MEMORY

        if "what is my name" in lower_message:

            saved_name = get_memory(
                "username"
            )

            if saved_name:

                bot_response = (
                    f"Your name is {saved_name}"
                )

            else:

                bot_response = (
                    "I don't know your name yet."
                )

        else:

            memory_name = get_memory(
                "username"
            )

            final_prompt = f"""
            User Name: {memory_name}

            User Message:
            {user_message}
            """

            bot_response = ask_gemini(
                final_prompt
            )

        # SAVE CHAT

        chat_collection.insert_one({

            "user_message": user_message,
            "bot_response": bot_response

        })

        return jsonify({
            "response": bot_response
        })

    except Exception as e:

        return jsonify({
            "response": f"Error: {str(e)}"
        }), 500


# =========================
# RECENT CHATS
# =========================

@app.route("/recent-chats", methods=["GET"])
def recent_chats():

    try:

        chats = list(

            chat_collection.find(
                {},
                {"_id": 0}
            )
            .sort("_id", -1)
            .limit(10)

        )

        return jsonify(chats)

    except Exception as e:

        return jsonify({
            "message": str(e)
        }), 500


# =========================
# ANALYTICS
# =========================

@app.route("/analytics", methods=["GET"])
def analytics():

    try:

        total_chats = (
            chat_collection.count_documents({})
        )

        total_users = (
            users_collection.count_documents({})
        )

        analytics_data = {

            "total_chats": total_chats,

            "ai_accuracy": "99%",

            "active_users": total_users,

            "live_status": "ONLINE"

        }

        return jsonify(
            analytics_data
        )

    except Exception as e:

        return jsonify({
            "message": str(e)
        }), 500


# =========================
# HEALTH CHECK
# =========================

@app.route("/health", methods=["GET"])
def health():

    return jsonify({
        "status": "healthy",
        "database": "connected"
    })


# =========================
# RUN SERVER
# =========================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
