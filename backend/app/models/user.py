from app.config.database import db
from werkzeug.security import generate_password_hash, check_password_hash
from bson import ObjectId

class User:
    collection = db['users']

    @staticmethod
    def create_user(email, password, name, role='user'):
        hashed_password = generate_password_hash(password)
        user_data = {
            "email": email,
            "password": hashed_password,
            "name": name,
            "role": role # 'user' or 'admin'
        }
        return User.collection.insert_one(user_data)

    @staticmethod
    def find_by_email(email):
        return User.collection.find_one({"email": email})

    @staticmethod
    def find_by_id(user_id):
        return User.collection.find_one({"_id": ObjectId(user_id)})
