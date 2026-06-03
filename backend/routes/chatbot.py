from flask import Blueprint, request, jsonify
from services.response_engine import generate_response

chatbot_bp = Blueprint("chatbot", __name__)

@chatbot_bp.route("/chat", methods=["POST"])
def chat():

    data = request.json

    user_message = data.get("message")

    bot_response = generate_response(user_message)

    return jsonify({
        "response": bot_response
    })