import os
from flask import Flask, jsonify 
from flask_migrate import Migrate
from __init__ import create_app
from models.models import db
from flask_cors import CORS
import cloudinary
from dotenv import load_dotenv

load_dotenv() 

app = create_app()
MIGRATE = Migrate(app, db)
CORS(app)


cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET'),
    secure=True 
)

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=False) 