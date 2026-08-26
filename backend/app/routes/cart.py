from flask import Blueprint
from app.controllers.cart_controller import get_cart, add_to_cart, update_cart_quantity, remove_from_cart
from app.middleware.auth_middleware import check_auth

cart_bp = Blueprint('cart', __name__)

# All cart routes require login
cart_bp.before_request(check_auth)

cart_bp.route('/', methods=['GET'])(get_cart)
cart_bp.route('/', methods=['POST'])(add_to_cart)
cart_bp.route('/', methods=['PUT'])(update_cart_quantity)
cart_bp.route('/<product_id>', methods=['DELETE'])(remove_from_cart)
