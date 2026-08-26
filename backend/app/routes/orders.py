from flask import Blueprint
from app.controllers.order_controller import place_order, get_my_orders, get_all_orders, update_status
from app.middleware.auth_middleware import login_required, admin_required

orders_bp = Blueprint('orders', __name__)

# Core routes
orders_bp.route('/', methods=['POST'])(login_required()(place_order))
orders_bp.route('/my', methods=['GET'])(login_required()(get_my_orders))

# Admin routes
orders_bp.route('/all', methods=['GET'])(admin_required()(get_all_orders))
orders_bp.route('/<order_id>/status', methods=['PUT'])(admin_required()(update_status))
