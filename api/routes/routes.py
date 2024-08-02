from flask import Blueprint, jsonify
from models.models import Users


api = Blueprint('api', __name__)

@api.route('/users', methods=['GET'])
def hello():
    users = Users.query.all()
    return jsonify({'users': [user.serialize() for user in users]}), 200
