from flask import Flask
from config.config import Config
from models.models import db
from routes.routes import api
from flask_jwt_extended import JWTManager

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    app.config["JWT_SECRET_KEY"] = "super-secret"  
    jwt = JWTManager(app)
    
    db.init_app(app)
    
    with app.app_context():
        db.create_all()

    app.register_blueprint(api, url_prefix='/api')
        
    return app


