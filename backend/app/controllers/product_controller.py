from flask import request, jsonify
from app.models.product import Product
from app.utils.file_handler import save_file

def get_products():
    category = request.args.get('category')
    query = {}
    if category:
        query['category'] = category
    
    products = Product.find_all(query)
    for p in products:
        p['_id'] = str(p['_id'])
    return jsonify(products), 200

def get_product(product_id):
    product = Product.find_by_id(product_id)
    if not product:
        return jsonify({"msg": "Product not found"}), 404
    product['_id'] = str(product['_id'])
    return jsonify(product), 200

def add_product():
    # Admin only (check handled in routes/middleware)
    data = request.form.to_dict()
    file = request.files.get('image')
    
    if file:
        image_path = save_file(file, 'products')
        data['image_path'] = image_path
    
    # Ensure numerical fields are correct types
    if 'price' in data: data['price'] = float(data['price'])
    if 'stock_quantity' in data: data['stock_quantity'] = int(data['stock_quantity'])
    
    result = Product.create(data)
    return jsonify({"msg": "Product added", "id": str(result.inserted_id)}), 201

def update_product(product_id):
    # Admin only
    data = request.form.to_dict()
    file = request.files.get('image')
    
    if file:
        image_path = save_file(file, 'products')
        data['image_path'] = image_path

    if 'price' in data: data['price'] = float(data['price'])
    if 'stock_quantity' in data: data['stock_quantity'] = int(data['stock_quantity'])
    
    Product.update(product_id, data)
    return jsonify({"msg": "Product updated"}), 200

def delete_product(product_id):
    # Admin only
    Product.delete(product_id)
    return jsonify({"msg": "Product deleted"}), 200
