import os
import requests
from dotenv import load_dotenv
from datetime import datetime, timezone, timedelta

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

MODEL = "openai/gpt-4o-mini"

IST = timezone(timedelta(hours=5, minutes=30))


def ask_gemini(user_message):

    if not API_KEY:

        print("ERROR: OPENROUTER_API_KEY is missing")

        return "AI configuration error: API key is missing."


    current_time = datetime.now(IST)

    current_date = current_time.strftime(
        "%A, %B %d, %Y"
    )

    current_clock = current_time.strftime(
        "%I:%M %p"
    )


    system_prompt = f"""
You are SupportX AI, an intelligent enterprise customer support assistant.

Current date: {current_date}
Current time in India (IST): {current_clock}

Answer naturally, accurately, and helpfully.
Keep normal answers concise.

User message:
{user_message}
"""


    headers = {

        "Authorization": f"Bearer {API_KEY}",

        "Content-Type": "application/json",

        "HTTP-Referer":
            "https://support-x-ai.vercel.app",

        "X-Title":
            "SupportX AI"

    }


    data = {

        "model": MODEL,

        "messages": [

            {

                "role": "system",

                "content": system_prompt

            },

            {

                "role": "user",

                "content": user_message

            }

        ],

        "temperature": 0.2,

        "max_tokens": 500

    }


    try:

        response = requests.post(

            OPENROUTER_URL,

            headers=headers,

            json=data,

            timeout=30

        )


        print(
            "OPENROUTER STATUS:",
            response.status_code
        )

        print(
            "OPENROUTER RESPONSE:",
            response.text
        )


        if response.status_code != 200:

            return (
                "The AI service is temporarily unavailable."
            )


        result = response.json()


        choices = result.get("choices", [])


        if not choices:

            print(
                "NO CHOICES IN RESPONSE:",
                result
            )

            return "AI returned no response."


        message = (

            choices[0]

            .get("message", {})

            .get("content")

        )


        if message:

            return message.strip()


        return "AI returned an empty response."


    except requests.exceptions.Timeout:

        print(
            "ERROR: OpenRouter request timed out."
        )

        return "AI request timed out."


    except requests.exceptions.RequestException as error:

        print(
            "REQUEST ERROR:",
            repr(error)
        )

        return "AI network error."


    except Exception as error:

        print(
            "FULL ERROR:",
            repr(error)
        )

        return "Something went wrong with the AI service."
