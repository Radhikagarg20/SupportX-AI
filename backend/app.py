from memory import save_memory, get_memory

from auth import (
    hash_password,
    check_password,
    generate_token
)

from flask import Flask, request, jsonify

from flask_cors import CORS

from pymongo import MongoClient

from gemini_engine import ask_gemini

import re

app = Flask(__name__)

CORS(app)

# =========================
# MONGODB CLOUD CONNECTION
# =========================

client = MongoClient(
    "mongodb+srv://supportx:Support123@chat-cluster.oaejile.mongodb.net/supportx_ai?retryWrites=true&w=majority&appName=chat-cluster"
)

db = client["supportx_ai"]

chat_collection = db["chat_history"]

users_collection = db["users"]

# =========================
# HOME ROUTE
# =========================

@app.route("/")
def home():

    return "SupportX AI Backend Running 🚀"


# =========================
# SIGNUP ROUTE
# =========================

@app.route("/signup", methods=["POST"])
def signup():

    data = request.json

    name = data.get("name")

    email = data.get("email")

    password = data.get("password")

    # CHECK USER EXISTS

    existing_user = users_collection.find_one({

        "email": email

    })

    if existing_user:

        return jsonify({

            "message": "User already exists"

        }), 400

    # HASH PASSWORD

    hashed_password = hash_password(password)

    # SAVE USER

    users_collection.insert_one({

        "name": name,

        "email": email,

        "password": hashed_password

    })

    return jsonify({

        "message": "Signup successful"

    })


# =========================
# LOGIN ROUTE
# =========================

@app.route("/login", methods=["POST"])
def login():

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

    # CHECK PASSWORD

    if not check_password(

        user["password"],
        password

    ):

        return jsonify({

            "message": "Invalid password"

        }), 401

    # GENERATE TOKEN

    token = generate_token(email)

    return jsonify({

        "message": "Login successful",

        "token": token,

        "name": user["name"]

    })


# =========================
# CHAT ROUTE
# =========================

@app.route("/chat", methods=["POST"])
def chat():

    data = request.json

    user_message = data.get("message")

    lower_message = user_message.lower()

    # =========================
    # MEMORY SAVE
    # =========================

    if "my name is" in lower_message:

        try:

            name = re.split(
                r"my name is",
                user_message,
                flags=re.IGNORECASE
            )[1].strip()

            save_memory("username", name)

        except:

            pass

    # =========================
    # MEMORY FETCH
    # =========================

    if "what is my name" in lower_message:

        saved_name = get_memory("username")

        if saved_name:

            bot_response = f"Your name is {saved_name} 😊"

        else:

            bot_response = "I do not know your name yet."

    else:

        # AI RESPONSE

        memory_name = get_memory("username")

        final_prompt = f"""
        User Name: {memory_name}

        User Message:
        {user_message}
        """

        bot_response = ask_gemini(final_prompt)

    # =========================
    # SAVE CHAT
    # =========================

    chat_collection.insert_one({

        "user_message": user_message,

        "bot_response": bot_response

    })

    return jsonify({

        "response": bot_response

    })


# =========================
# RECENT CHATS
# =========================

@app.route("/recent-chats", methods=["GET"])
def recent_chats():

    chats = list(

        chat_collection.find(
            {},
            {
                "_id": 0
            }
        ).sort("_id", -1).limit(10)

    )

    return jsonify(chats)


# =========================
# ANALYTICS
# =========================

@app.route("/analytics", methods=["GET"])
def analytics():

    total_chats = chat_collection.count_documents({})

    total_users = users_collection.count_documents({})

    analytics_data = {

        "total_chats": total_chats,

        "ai_accuracy": "99%",

        "active_users": total_users,

        "live_status": "ONLINE"

    }

    return jsonify(analytics_data)


# =========================
# RUN SERVER
# =========================

if __name__ == "__main__":

    app.run(debug=True)