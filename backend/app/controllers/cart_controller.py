from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
from app.models.cart import Cart
from app.models.product import Product

def get_cart():
    user_id = get_jwt_identity()
    cart = Cart.get_by_user(user_id)
    if not cart:
        return jsonify({"items": [], "total_price": 0}), 200
    
    # Enrich product data for the frontend
    enriched_items = []
    total_price = 0
    for item in cart.get('items', []):
        try:
            product = Product.find_by_id(item['product_id'])
            if product:
                product['_id'] = str(product['_id'])
                # Ensure types are correct for calculation
                price = float(product.get('price', 0))
                quantity = int(item.get('quantity', 0))
                
                item_total = price * quantity
                total_price += item_total
                enriched_items.append({
                    **item,
                    "product": product,
                    "subtotal": item_total
                })
        except Exception as e:
            print(f"Error enriching cart item: {e}")
            continue
    
    return jsonify({"items": enriched_items, "total_price": total_price}), 200

def add_to_cart():
    user_id = get_jwt_identity()
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)

    if not product_id:
        return jsonify({"msg": "Missing product_id"}), 400

    Cart.add_to_cart(user_id, product_id, int(quantity))
    return jsonify({"msg": "Item added to cart"}), 200

def update_cart_quantity():
    user_id = get_jwt_identity()
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity')

    if not product_id or quantity is None:
        return jsonify({"msg": "Missing data"}), 400

    Cart.update_quantity(user_id, product_id, int(quantity))
    return jsonify({"msg": "Cart updated"}), 200

def remove_from_cart(product_id):
    user_id = get_jwt_identity()
    Cart.remove_item(user_id, product_id)
    return jsonify({"msg": "Item removed"}), 200
