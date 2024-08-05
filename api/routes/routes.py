from flask import Blueprint, jsonify, request
from models.models import db, User, Follow, Comment, Post, Media
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify({'users': [user.serialize() for user in users]}), 200

@api.route('/signup', methods=['POST'])
def create_user():
    request_body = request.json
    user_query = User.query.filter_by(email=request_body['email']).first()
    if user_query is None:
        create_user = User(username=request_body['name'], email=request_body['email'],  password=request_body['password'], is_active=request_body['is_active'])
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
    user_login = User.query.filter_by(email=request_body['email']).first()
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


@api.route('/create_post', methods=['POST'])
def create_post():
    data = request.json
    user_id = data.get('user_id')
    comment_text = data.get('comment_text')
    media_type = data.get('media_type')
    media_url = data.get('media_url')
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    post = Post(user_id=user_id)
    db.session.add(post)
    db.session.flush() 
    if comment_text:
        comment = Comment(comment_text=comment_text, author_id=user_id, post_id=post.id)
        db.session.add(comment)
    if media_type and media_url:
        media = Media(type=media_type, url=media_url, post_id=post.id)
        db.session.add(media)
    db.session.commit()

    return jsonify({"message": "Post created successfully", "post_id": post.id})

@api.route('/user_posts/<int:user_id>', methods=['GET'])
def get_user_posts(user_id):
    user_query = User.query.filter_by(id=user_id).first()
    if user_query is None:
        return jsonify({"error": "User not found"}), 404
    posts = Post.query.filter_by(user_id=user_id).all()
    if not posts:
        return jsonify({"message": "No posts found for this user"}), 200
    return jsonify({"posts": [post.serialize() for post in posts]}), 200

