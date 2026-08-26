from app.config.database import db
from bson import ObjectId

class Product:
    collection = db['products']

    @staticmethod
    def create(data):
        return Product.collection.insert_one(data)

    @staticmethod
    def find_all(query={}):
        return list(Product.collection.find(query))

    @staticmethod
    def find_by_id(product_id):
        if not ObjectId.is_valid(product_id):
            return None
        return Product.collection.find_one({"_id": ObjectId(product_id)})

    @staticmethod
    def update(product_id, data):
        return Product.collection.update_one({"_id": ObjectId(product_id)}, {"$set": data})

    @staticmethod
    def delete(product_id):
        return Product.collection.delete_one({"_id": ObjectId(product_id)})
