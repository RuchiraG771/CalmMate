from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)

# User table
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    password = db.Column(db.String(100))

# Home route
@app.route("/")
def home():
    return "Backend is running 🚀"

# Signup route
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    new_user = User(username=username, password=password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User created",
        "username": username
    })

# Show all users
@app.route("/users")
def get_users():
    users = User.query.all()

    result = []
    for user in users:
        result.append({
            "id": user.id,
            "username": user.username
        })

    return jsonify(result)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)