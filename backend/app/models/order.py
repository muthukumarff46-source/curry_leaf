from app.config.database import db
from bson import ObjectId
import datetime

class Order:
    collection = db['orders']

    @staticmethod
    def create(user_id, items, total_price):
        order_data = {
            "user_id": user_id,
            "items": items,
            "total_price": total_price,
            "status": "Pending", # Pending, Processing, Shipped, Delivered, Cancelled
            "created_at": datetime.datetime.utcnow()
        }
        return Order.collection.insert_one(order_data)

    @staticmethod
    def find_by_user(user_id):
        return list(Order.collection.find({"user_id": user_id}).sort("created_at", -1))

    @staticmethod
    def find_all():
        return list(Order.collection.find().sort("created_at", -1))

    @staticmethod
    def update_status(order_id, status):
        return Order.collection.update_one(
            {"_id": ObjectId(order_id)},
            {"$set": {"status": status}}
        )

    @staticmethod
    def find_by_id(order_id):
        return Order.collection.find_one({"_id": ObjectId(order_id)})
