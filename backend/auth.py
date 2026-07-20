from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)

import jwt
import os
from datetime import datetime, timedelta


# =========================
# SECRET KEY
# =========================

SECRET_KEY = os.getenv(
    "JWT_SECRET",
    "supportx_secret_key"
)


# =========================
# HASH PASSWORD
# =========================

def hash_password(password):

    return generate_password_hash(
        password,
        method="pbkdf2:sha256"
    )


# =========================
# CHECK PASSWORD
# =========================

def check_password(hashed, password):

    try:

        if not hashed:

            return False

        return check_password_hash(
            hashed,
            password
        )

    except Exception as error:

        print(
            "PASSWORD HASH ERROR:",
            error
        )

        return False


# =========================
# GENERATE JWT TOKEN
# =========================

def generate_token(email):

    payload = {

        "email":
            email,

        "exp":
            datetime.utcnow()
            + timedelta(days=1)

    }

    token = jwt.encode(

        payload,

        SECRET_KEY,

        algorithm="HS256"

    )

    return token
