from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from app.config.config import Config
import os

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize Extensions
    CORS(app)
    jwt = JWTManager(app)

    # Ensure upload folder exists
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    # Register Blueprints
    from app.routes.auth import auth_bp
    from app.routes.products import products_bp
    from app.routes.cart import cart_bp
    from app.routes.orders import orders_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(products_bp, url_prefix='/api/products')
    app.register_blueprint(cart_bp, url_prefix='/api/cart')
    app.register_blueprint(orders_bp, url_prefix='/api/orders')

    @app.route('/')
    def index():
        return {"message": "Mini E-commerce API is running"}

    @app.route('/backend/app/uploads/<path:filename>')
    @app.route('/uploads/<path:filename>')
    def uploaded_file(filename):
        from flask import send_from_directory
        # Extract just the filename if it's a full path
        clean_filename = filename.split('/')[-1]
        upload_dir = os.path.join(app.root_path, 'app', 'uploads')
        return send_from_directory(upload_dir, clean_filename)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True,use_reloader=False, port=5000)
