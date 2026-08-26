from app.config.database import db
from bson import ObjectId

class Cart:
    collection = db['carts']

    @staticmethod
    def get_by_user(user_id):
        return Cart.collection.find_one({"user_id": user_id})

    @staticmethod
    def add_to_cart(user_id, product_id, quantity):
        cart = Cart.get_by_user(user_id)
        if not cart:
            cart_data = {
                "user_id": user_id,
                "items": [{"product_id": product_id, "quantity": quantity}]
            }
            return Cart.collection.insert_one(cart_data)
        
        # Check if item exists in cart
        items = cart.get('items', [])
        found = False
        for item in items:
            if item['product_id'] == product_id:
                item['quantity'] += quantity
                found = True
                break
        
        if not found:
            items.append({"product_id": product_id, "quantity": quantity})
        
        return Cart.collection.update_one({"user_id": user_id}, {"$set": {"items": items}})

    @staticmethod
    def update_quantity(user_id, product_id, quantity):
        cart = Cart.get_by_user(user_id)
        if not cart: return None
        
        items = cart.get('items', [])
        for item in items:
            if item['product_id'] == product_id:
                item['quantity'] = quantity
                break
        
        return Cart.collection.update_one({"user_id": user_id}, {"$set": {"items": items}})

    @staticmethod
    def remove_item(user_id, product_id):
        return Cart.collection.update_one(
            {"user_id": user_id},
            {"$pull": {"items": {"product_id": product_id}}}
        )

    @staticmethod
    def clear_cart(user_id):
        return Cart.collection.update_one({"user_id": user_id}, {"$set": {"items": []}})
