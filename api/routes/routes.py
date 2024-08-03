from flask import Blueprint, jsonify, request
from models.models import db, Users
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

@api.route('/users', methods=['GET'])
def get_users():
    users = Users.query.all()
    return jsonify({'users': [user.serialize() for user in users]}), 200

@api.route('/signup', methods=['POST'])
def create_user():
    request_body = request.json
    user_query = Users.query.filter_by(email=request_body['email']).first()
    if user_query is None:
        create_user = Users(username=request_body['name'], email=request_body['email'], password=request_body['password'], is_active=request_body['is_active'])
        db.session.add(create_user)
        db.session.commit()
        response_body = {
            "msg": "Usuario creado con éxito"
        }
        return jsonify(response_body), 200
    else:
        response_body = {
            "msg": "Usuario ya existe"
        }
        return jsonify(response_body), 404

@api.route('/login', methods=['POST'])
def login_user():
    request_body = request.json
    email = request_body.get('email')
    password = request_body.get('password')
    user_login = Users.query.filter_by(email=request_body['email']).first()
    if user_login is None:
        response_body = {
            "msg": "Usuario no existe"
        }
        return jsonify(response_body), 404
    elif password != user_login.password:
        response_body = {
            "msg": "Contraseña incorrecta"
        }
        return jsonify(response_body), 404
    else:
        access_token = create_access_token(identity=user_login.id)
        return jsonify({"token": access_token, "user_id": user_login.id})
