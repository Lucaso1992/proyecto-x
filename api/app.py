import os
from flask import Flask, jsonify 
from __init__ import create_app
from models.models import db, Users
app = create_app()


@app.route('/', methods=['GET'])
def hello():
    users = Users.query.all()
    return jsonify({'success': True, 'data': [user.serialize() for user in users]}), 200


if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=False) 