from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from flask import jsonify

def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            check_admin()
            return fn(*args, **kwargs)
        return decorator
    return wrapper

def login_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            check_auth()
            return fn(*args, **kwargs)
        return decorator
    return wrapper

def check_auth():
    verify_jwt_in_request()

def check_admin():
    verify_jwt_in_request()
    claims = get_jwt()
    if claims.get("role") != "admin":
        from flask import abort
        abort(jsonify(msg="Admins only!"), 403)
