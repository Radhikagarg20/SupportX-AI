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
from datetime import datetime, timezone


# =====================================================
# LOAD ENVIRONMENT VARIABLES
# =====================================================

load_dotenv()


# =====================================================
# FLASK APP
# =====================================================

app = Flask(__name__)


# Allow frontend requests
CORS(
    app,
    resources={
        r"/*": {
            "origins": "*"
        }
    }
)


# =====================================================
# MONGODB CONNECTION
# =====================================================

MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    print("WARNING: MONGO_URI is missing")

client = MongoClient(MONGO_URI)

db = client["supportx_ai"]

chat_collection = db["chat_history"]

users_collection = db["users"]


# =====================================================
# HOME ROUTE
# =====================================================

@app.route("/", methods=["GET"])
def home():

    return jsonify({
        "message": "SupportX AI Backend Running"
    })


# =====================================================
# SIGNUP ROUTE
# =====================================================

@app.route("/signup", methods=["POST"])
def signup():

    try:

        data = request.get_json(silent=True) or {}

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")


        if not name or not email or not password:

            return jsonify({
                "message": "All fields are required"
            }), 400


        email = email.lower().strip()


        existing_user = users_collection.find_one({
            "email": email
        })


        if existing_user:

            return jsonify({
                "message": "User already exists"
            }), 400


        hashed_password = hash_password(password)


        users_collection.insert_one({

            "name": name.strip(),

            "email": email,

            "password": hashed_password,

            "created_at": datetime.now(timezone.utc)

        })


        return jsonify({

            "message": "Signup successful"

        }), 201


    except Exception as error:

        print("SIGNUP ERROR:", repr(error))


        return jsonify({

            "message": "Signup failed",

            "error": str(error)

        }), 500


# =====================================================
# LOGIN ROUTE
# =====================================================

@app.route("/login", methods=["POST"])
def login():

    try:

        data = request.get_json(silent=True) or {}


        email = data.get("email")

        password = data.get("password")


        if not email or not password:

            return jsonify({

                "message": "Email and password are required"

            }), 400


        email = email.lower().strip()


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

        }), 200


    except Exception as error:

        print("LOGIN ERROR:", repr(error))


        return jsonify({

            "message": "Login failed",

            "error": str(error)

        }), 500


# =====================================================
# CHAT ROUTE
# =====================================================

@app.route("/chat", methods=["POST"])
def chat():

    try:

        data = request.get_json(silent=True) or {}


        user_message = data.get("message")


        if not user_message or not user_message.strip():

            return jsonify({

                "response": "Please enter a message."

            }), 400


        user_message = user_message.strip()


        lower_message = user_message.lower()


        # =================================================
        # SAVE USER NAME TO MEMORY
        # =================================================

        if "my name is" in lower_message:

            try:

                name = re.split(

                    r"my name is",

                    user_message,

                    flags=re.IGNORECASE

                )[1].strip()


                if name:

                    save_memory(

                        "username",

                        name

                    )


            except Exception as error:

                print(

                    "MEMORY SAVE ERROR:",

                    repr(error)

                )


        # =================================================
        # RECALL USER NAME
        # =================================================

        if "what is my name" in lower_message:

            saved_name = get_memory(

                "username"

            )


            if saved_name:

                bot_response = (

                    f"Your name is {saved_name}."

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

User Name: {memory_name or "Unknown"}

User Message:
{user_message}

Respond naturally and helpfully.
"""


            bot_response = ask_gemini(

                final_prompt

            )


        # =================================================
        # SAVE CHAT HISTORY
        # =================================================

        chat_collection.insert_one({

            "user_message": user_message,

            "bot_response": bot_response,

            "created_at": datetime.now(timezone.utc)

        })


        return jsonify({

            "response": bot_response

        }), 200


    except Exception as error:

        print("CHAT ROUTE ERROR:", repr(error))


        return jsonify({

            "response": "Backend error occurred.",

            "error": str(error)

        }), 500


# =====================================================
# RECENT CHATS
# =====================================================

@app.route("/recent-chats", methods=["GET"])
def recent_chats():

    try:

        chats = list(

            chat_collection.find(

                {},

                {

                    "_id": 0,

                    "user_message": 1,

                    "bot_response": 1,

                    "created_at": 1

                }

            )

            .sort(

                "created_at",

                -1

            )

            .limit(10)

        )


        return jsonify(chats), 200


    except Exception as error:

        print(

            "RECENT CHATS ERROR:",

            repr(error)

        )


        return jsonify({

            "message": "Could not load recent chats",

            "error": str(error)

        }), 500


# =====================================================
# ANALYTICS
# =====================================================

@app.route("/analytics", methods=["GET"])
def analytics():

    try:

        total_chats = (

            chat_collection.count_documents({})

        )


        total_users = (

            users_collection.count_documents({})

        )


        return jsonify({

            "total_chats": total_chats,

            "ai_accuracy": "99%",

            "active_users": total_users,

            "live_status": "ONLINE"

        }), 200


    except Exception as error:

        print(

            "ANALYTICS ERROR:",

            repr(error)

        )


        return jsonify({

            "message": "Analytics error",

            "error": str(error)

        }), 500


# =====================================================
# HEALTH CHECK
# =====================================================

@app.route("/health", methods=["GET"])
def health():

    try:

        # Test MongoDB connection

        client.admin.command("ping")


        return jsonify({

            "status": "healthy",

            "database": "connected"

        }), 200


    except Exception as error:

        return jsonify({

            "status": "unhealthy",

            "database": "disconnected",

            "error": str(error)

        }), 500


# =====================================================
# RUN SERVER
# =====================================================

if __name__ == "__main__":

    app.run(

        host="0.0.0.0",

        port=int(

            os.getenv(

                "PORT",

                5000

            )

        ),

        debug=True

    )
