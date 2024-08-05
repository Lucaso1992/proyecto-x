from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(500), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=True)
    posts = relationship('Post', backref='user', lazy=True)
    followers = relationship('Follow', foreign_keys='Follow.user_to_id', backref='followed_user', lazy=True)
    following = relationship('Follow', foreign_keys='Follow.user_from_id', backref='following_user', lazy=True)
    comments = relationship('Comment', backref='author', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username
        }

class Follow(db.Model):
    __tablename__ = 'follow'
    id = db.Column(Integer, primary_key=True)
    user_from_id = db.Column(Integer, ForeignKey('user.id'))
    user_to_id = db.Column(Integer, ForeignKey('user.id'))

    def __repr__(self):
        return f'<Follow {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_from_id": self.user_from_id,
            "user_to_id": self.user_to_id
        }

class Comment(db.Model):
    __tablename__ = 'comment'
    id = db.Column(Integer, primary_key=True)
    comment_text = db.Column(String(250), nullable=False)
    author_id = db.Column(Integer, ForeignKey('user.id'))
    post_id = db.Column(Integer, ForeignKey('post.id'))

    def __repr__(self):
        return f'<Comment {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "comment_text": self.comment_text,
            "author_id": self.author_id,
            "post_id": self.post_id
        }

class Post(db.Model):
    __tablename__ = 'post'
    id = db.Column(Integer, primary_key=True)
    user_id = db.Column(Integer, ForeignKey("user.id"))
    comment = relationship("Comment", backref="post", lazy=True)
    media = relationship("Media", backref="post", lazy=True)

    def __repr__(self):
        return f'<Post {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "comment": [comment.serialize() for comment in self.comment],
            "media": [media.serialize() for media in self.media]
        }


class Media(db.Model):
    __tablename__ = "media"
    id = db.Column(Integer, primary_key=True)
    type = db.Column(String(250), nullable=False)
    url = db.Column(String(250), nullable=False)
    post_id = db.Column(Integer, ForeignKey("post.id"))

    def __repr__(self):
        return f'<Media {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "type": self.type,
            "url": self.url,
            "post_id": self.post_id
        }
