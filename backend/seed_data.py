import os
import sys
from pymongo import MongoClient
from dotenv import load_dotenv

# Add backend to path to import models if needed, or just use raw pymongo
sys.path.append(os.path.join(os.getcwd(), 'backend'))

load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

def seed_products():
    mongo_uri = os.environ.get('MONGO_URI')
    if not mongo_uri:
        print("Error: MONGO_URI not found in .env")
        return

    client = MongoClient(mongo_uri)
    db_name = mongo_uri.split('/')[-1].split('?')[0] or 'mini_ecommerce'
    db = client[db_name]
    products_collection = db['products']

    products_collection.delete_many({})

    new_products = [
        {"name": "CurryLeaf Classic Pressure Cooker", "description": "A dependable everyday pressure cooker for making family meals with ease. Its clean finish and practical design bring confidence to every kitchen.", "price": 2499.0, "category": "Pressure Cookers", "image_path": "backend/app/uploads/img3.png", "stock_quantity": 50},
        {"name": "CurryLeaf Family Cooker Combo", "description": "A thoughtfully paired cooker set for everyday cooking, from quick breakfasts to hearty family meals. A useful addition to a modern Indian kitchen.", "price": 3499.0, "category": "Combo Offers", "image_path": "backend/app/uploads/img2.png", "stock_quantity": 35},
        {"name": "CurryLeaf Everyday Kitchen Cooker", "description": "Designed for regular home cooking, this versatile cooker helps you prepare rice, dals, curries and more with a simple, familiar cooking experience.", "price": 2299.0, "category": "Pressure Cookers", "image_path": "backend/app/uploads/img4.png", "stock_quantity": 45},
        {"name": "CurryLeaf Essential Kitchen Collection", "description": "Bring a refined, practical touch to your kitchen with CurryLeaf Essential cookware made for the rhythm of everyday Indian cooking.", "price": 2999.0, "category": "Kitchen Essentials", "image_path": "backend/app/uploads/img1.jpg", "stock_quantity": 30}
    ]
    result = products_collection.insert_many(new_products)
    print(f"Successfully seeded {len(result.inserted_ids)} products into the database.")

if __name__ == "__main__":
    seed_products()
