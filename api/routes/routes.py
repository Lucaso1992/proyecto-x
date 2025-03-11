from flask import Blueprint, jsonify, request
from models.models import db, User, Follow, Comment, Post, Media
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import cloudinary
import cloudinary.uploader
from werkzeug.security import generate_password_hash, check_password_hash

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
        hashed_password = generate_password_hash(request_body['password'], method='pbkdf2:sha256', salt_length=16)
        create_user = User(username=request_body['username'], email=request_body['email'],  password=hashed_password, is_active=request_body['is_active'])
        db.session.add(create_user)
        db.session.commit()
        response_body = {
            "msg": "User created successfully"
        }
        return jsonify(response_body), 200  
    else:
        response_body = {
            "msg": "User already exists"
        }
        return jsonify(response_body), 404


@api.route('/login', methods=['POST'])
def login_user():
    request_body = request.json
    email = request_body.get('email')
    password = request_body.get('password')

    user_login = User.query.filter_by(email=email).first()

    if user_login and check_password_hash(user_login.password, password):
        access_token = create_access_token(identity=user_login.id)
        return jsonify({"user": user_login.serialize(), "token": access_token}), 200
    else:
        return jsonify({"msg": "Incorrect password or user not found"}), 404


@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    
    if user is None:
        abort(404, description="User not found")

    return jsonify(user.serialize())

@api.route('/delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    
    return jsonify({"message": "User deleted successfully"}), 200


@api.route('/user_posts/<int:user_id>', methods=['GET'])
def get_user_posts(user_id):
    user_query = User.query.filter_by(id=user_id).first()
    if user_query is None:
        return jsonify({"error": "User not found"}), 404
    posts = Post.query.filter_by(user_id=user_id).all()
    if not posts:
        return jsonify({"message": "No posts found for this user"}), 200
    return jsonify({"posts": [post.serialize() for post in posts]}), 200

@api.route('/user_post/<int:user_id>', methods=['GET'])
def get_one_post(user_id):
    data = request.json
    data_post = data.get('post_id')
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    post = Post.query.filter_by(id=data_post).first()
    if post is None:
        return jsonify({"error": "Post not found"}), 404
    return jsonify({"post": post.serialize()}), 200

@api.route('/follow/<int:user_id>', methods=['POST']) 
def create_follow(user_id):
    data = request.json
    user_to_id = data.get('user_to_id')
    
    user_to = User.query.get(user_to_id)
    if not user_to:
        return jsonify({"error": "User to follow not found"}), 404
    
    existing_follow = Follow.query.filter_by(user_from_id=user_id, user_to_id=user_to_id).first()
    if existing_follow:
        return jsonify({"message": "Already following this user"}), 400
    
    new_follow = Follow(user_from_id=user_id, user_to_id=user_to_id)
    db.session.add(new_follow)
    db.session.commit()
    
    return jsonify({"message": "Successfully followed the user", "follow_id": new_follow.id}), 200

@api.route('/followers/<int:user_id>', methods=['GET'])
def get_followers(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    followers = Follow.query.filter_by(user_to_id=user_id).all()
    follower_list = [{"id": follow.user_from_id, "username": follow.following_user.username, "email": follow.following_user.email} for follow in followers]

    return jsonify({"followers": follower_list}), 200

@api.route('/following/<int:user_id>', methods=['GET'])
def get_following(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    following = Follow.query.filter_by(user_from_id=user_id).all()
    following_list = [{"id": follow.user_to_id, 
                       "username": follow.followed_user.username, 
                       "email": follow.followed_user.email} for follow in following]

    return jsonify({"following": following_list}), 200

@api.route('/update_user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    if 'file' in request.files:
        file_to_upload = request.files['file']
        if file_to_upload:
            upload = cloudinary.uploader.upload(file_to_upload)
            user.profile_image_url = upload.get('url')

    username = request.form.get('username')
    if username:
        existing_user = User.query.filter_by(username=username).first()
        if existing_user and existing_user.id != user_id:
            return jsonify({"error": "Username already exists"}), 400
        user.username = username
    
    email = request.form.get('email')
    if email:
        existing_email = User.query.filter_by(email=email).first()
        if existing_email and existing_email.id != user_id:
            return jsonify({"error": "Email already exists"}), 400
        user.email = email
    
    about_me = request.form.get('about_me')
    if about_me:
        user.about_me = about_me
    
    db.session.commit()
    return jsonify({"message": "User updated successfully", "user": user.serialize()}), 200


@api.route('/create_post', methods=['POST'])
@jwt_required()  
def create_post():
    user_id = get_jwt_identity()  

    comment_text = request.form.get('comment_text')  
    file_to_upload = request.files.get('file')  

    if not comment_text:
        return jsonify({"error": "Comment text is required"}), 400
    
    if not file_to_upload:
        return jsonify({"error": "Image file is required"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    try:
      
        upload_result = cloudinary.uploader.upload(file_to_upload)

        media_url = upload_result.get('url')
        media_type = 'image'  
        
      
        post = Post(user_id=user_id)
        db.session.add(post)
        db.session.flush()  
        
        comment = Comment(comment_text=comment_text, author_id=user_id, post_id=post.id)
        db.session.add(comment)
        
        media = Media(type=media_type, url=media_url, post_id=post.id)
        db.session.add(media)
        
        db.session.commit()

        return jsonify({"message": "Post created successfully", "post": post.serialize()}), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@api.route('/my_posts', methods=['GET'])
@jwt_required() 
def get_my_posts():
    user_id = get_jwt_identity() 

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    posts = Post.query.filter_by(user_id=user_id).all()

    if not posts:
        return jsonify({"message": "No posts found for this user"}), 200

    return jsonify({"posts": [post.serialize() for post in posts]}), 200