from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import random

training_data = {

    "greeting": {
        "questions": [
            "hello",
            "hi",
            "hey",
            "good morning",
            "good evening"
        ],

        "responses": [
            "Hello 👋 Welcome to SupportX AI",
            "Hi there! How can I assist you today?",
            "Hey! SupportX AI is ready to help."
        ]
    },

    "refund": {
        "questions": [
            "refund issue",
            "i want refund",
            "return my money",
            "refund status",
            "cancel order"
        ],

        "responses": [
            "I can help you with your refund request.",
            "Please share your order ID for refund assistance.",
            "Your refund request is being processed."
        ]
    },

    "technical_support": {
        "questions": [
            "technical support",
            "website not working",
            "login problem",
            "payment failed",
            "bug issue"
        ],

        "responses": [
            "Our technical team is analyzing the issue.",
            "Please explain your technical problem in detail.",
            "Support team is available 24/7 for technical issues."
        ]
    },

    "pricing": {
        "questions": [
            "pricing plans",
            "subscription cost",
            "premium plan",
            "enterprise pricing",
            "service charges"
        ],

        "responses": [
            "We offer flexible pricing plans for businesses.",
            "Our premium plans include AI analytics features.",
            "Enterprise pricing depends on business requirements."
        ]
    },

    "ai_general": {
        "questions": [
            "what is ai",
            "machine learning",
            "deep learning",
            "artificial intelligence",
            "what is chatbot"
        ],

        "responses": [
            "Artificial Intelligence enables machines to simulate human intelligence.",
            "Machine learning allows systems to learn from data patterns.",
            "Chatbots use NLP and AI to communicate intelligently with users."
        ]
    }

}

all_questions = []
all_tags = []

for tag, data in training_data.items():

    for question in data["questions"]:

        all_questions.append(question)
        all_tags.append(tag)

vectorizer = TfidfVectorizer()

X = vectorizer.fit_transform(all_questions)

def predict_response(user_input):

    user_vector = vectorizer.transform([user_input])

    similarity = cosine_similarity(user_vector, X)

    index = similarity.argmax()

    confidence = similarity[0][index]

    tag = all_tags[index]

    if confidence < 0.2:

        fallback_responses = [
            "I understand your query. Please provide more details.",
            "SupportX AI is analyzing your request.",
            "Could you explain your issue in more detail?",
            "I'm here to help. Please elaborate further."
        ]

        return random.choice(fallback_responses)

    responses = training_data[tag]["responses"]

    return random.choice(responses)