from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)

import jwt
import datetime

SECRET_KEY = "supportx_secret_key"


# HASH PASSWORD
def hash_password(password):

    return generate_password_hash(password)


# CHECK PASSWORD
def check_password(hashed, password):

    return check_password_hash(
        hashed,
        password
    )


# GENERATE JWT TOKEN
def generate_token(email):

    payload = {

        "email": email,

        "exp": datetime.datetime.utcnow()
        + datetime.timedelta(days=1)

    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm="HS256"
    )

    return token