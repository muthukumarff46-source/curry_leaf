from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
from app.models.order import Order
from app.models.cart import Cart
from app.models.product import Product

def place_order():
    user_id = get_jwt_identity()
    cart = Cart.get_by_user(user_id)
    
    if not cart or not cart.get('items'):
        return jsonify({"msg": "Cart is empty"}), 400

    # Calculate total price and check stock (simplified)
    items = []
    total_price = 0
    for item in cart['items']:
        product = Product.find_by_id(item['product_id'])
        if product:
            quantity = int(item.get('quantity', 0))
            if int(product.get('stock_quantity', 0)) < quantity:
                return jsonify({"msg": f"Insufficient stock for {product['name']}"}), 400
            
            item_price = float(product.get('price', 0))
            total_price += item_price * quantity
            items.append({
                "product_id": item['product_id'],
                "name": product['name'],
                "price": item_price,
                "quantity": quantity
            })
            # Update stock
            Product.update(item['product_id'], {"stock_quantity": product['stock_quantity'] - item['quantity']})

    result = Order.create(user_id, items, total_price)
    Cart.clear_cart(user_id)
    
    return jsonify({"msg": "Order placed successfully", "order_id": str(result.inserted_id)}), 201

def get_my_orders():
    user_id = get_jwt_identity()
    orders = Order.find_by_user(user_id)
    for o in orders:
        o['_id'] = str(o['_id'])
    return jsonify(orders), 200

def get_all_orders():
    # Admin only
    orders = Order.find_all()
    for o in orders:
        o['_id'] = str(o['_id'])
    return jsonify(orders), 200

def update_status(order_id):
    # Admin only
    data = request.get_json()
    status = data.get('status')
    if not status:
        return jsonify({"msg": "Missing status"}), 400
    
    Order.update_status(order_id, status)
    return jsonify({"msg": "Order status updated"}), 200
