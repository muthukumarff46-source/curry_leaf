from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

def get_database():
    mongo_uri = os.environ.get('MONGO_URI')
    if not mongo_uri:
        raise ValueError("No MONGO_URI found in environment variables")
    
    client = MongoClient(mongo_uri)
    # The database name can be specified in the URI or here. 
    # Let's extract it or default to 'mini_ecommerce'
    db_name = mongo_uri.split('/')[-1].split('?')[0] or 'mini_ecommerce'
    return client[db_name]

db = None

try:
    db = get_database()
    print("Successfully connected to MongoDB Atlas")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
