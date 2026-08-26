from flask import Blueprint
from app.controllers.product_controller import get_products, get_product, add_product, update_product, delete_product
from app.middleware.auth_middleware import admin_required

products_bp = Blueprint('products', __name__)

products_bp.route('/', methods=['GET'])(get_products)
products_bp.route('/<product_id>', methods=['GET'])(get_product)

# Admin protected routes
products_bp.route('/', methods=['POST'])(admin_required()(add_product))
products_bp.route('/<product_id>', methods=['PUT'])(admin_required()(update_product))
products_bp.route('/<product_id>', methods=['DELETE'])(admin_required()(delete_product))
