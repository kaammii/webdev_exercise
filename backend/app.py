from faker import Faker
from flask import Flask, request
from flask_cors import CORS
from helpers import validate_skills

from models import db, User, UsersResponse, Skill, SkillsResponse

fake = Faker()


def create_app():
    _app = Flask(__name__)
    _app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
    _app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(_app)
    with _app.app_context():
        db.drop_all()
        db.create_all()
    return _app


app = create_app()

CORS(app)


@app.route("/users", methods=["GET", "POST", "DELETE"])
def users():
    with app.app_context():
        if request.method == "POST":
            """
            Creates a batch of users
            returns a list of users
            """
            for x in range(10):
                db.session.add(User(name=fake.name()))
            users = User.query.all()
            db.session.commit()
            return UsersResponse(users=users).json(), 201

        elif request.method == "GET":
            """
            Checks for skill in the query params
            if a skill is present, returns all the users who have that skill
            if skill is not present, returns all users with their skills
            """
            try:
                skills = validate_skills(request.args.getlist("skill"))

                if not skills:
                    users = UsersResponse(
                        users=[
                            {
                                "id": user.id,
                                "name": user.name,
                                "skills": [skill.name for skill in user.skills]
                            }
                            for user in User.query.all()
                        ]
                    )
                    return users.json(), 200
                else:
                    # fetch all users in the skills list
                    users = UsersResponse(
                        users=[
                            {
                                "id": user.id,
                                "name": user.name,
                                "skills": [skill.name for skill in user.skills]
                            }
                            for user in User.query.filter(User.skills.any(Skill.name.in_(skills))).all()
                        ]
                    )
                    return users.json(), 200

            except Exception as e:
                return str(e), 500

        elif request.method == "DELETE":
            """
            Deletes all users
            """
            db.session.query(User).delete()
            db.session.commit()
            return "Users deleted", 200

        else:
            return "Method not allowed", 405


@app.route("/users/<int:user_id>", methods=["GET", "DELETE"])
def user(user_id):
    with app.app_context():
        if request.method == "GET":
            """
            Returns a user with their skills
            """
            user = User.query.filter_by(id=user_id).first()
            if user:
                return UsersResponse(
                    users=[
                        {
                            "id": user.id,
                            "name": user.name,
                            "skills": [skill.name for skill in user.skills]
                        }
                    ]
                ).json(), 200
            else:
                return "User not found", 404

        elif request.method == "DELETE":
            """
            Deletes a user
            """
            user = User.query.filter_by(id=user_id).first()
            if user:
                db.session.delete(user)
                db.session.commit()
                return "User deleted", 200
            else:
                return "User not found", 404

        else:
            return "Method not allowed", 405


@app.route("/users/<int:id>/skills", methods=["PUT"])
def update_user(id):
    """
    Checks if the user exists in the Users table
    Checks if the skill exists in the Skills table
    Adds the skill in the Skills table if it doesn't exist
    Add in UserSkills table if the skill is present in the request body
    Delete in UserSkills table if the skill is not present in the request body
    """
    with app.app_context():
        user = User.query.get(id)
        if user is None:
            return "User not found", 404
        skills = validate_skills(request.get_json().get("skills"))
        if not skills:
            return "Invalid skills", 400

        for skill in skills:
            skill_db = Skill.query.filter_by(name=skill).first()
            if skill_db is None:
                skill_db = Skill(name=skill)
                db.session.add(skill_db)
        
        user.skills = [
            skill for skill in Skill.query.filter(Skill.name.in_(skills)).all()
        ]
        
        users_response = UsersResponse(
            users=[
                {
                    "id": user.id,
                    "name": user.name,
                    "skills": [skill.name for skill in user.skills]
                }
            ]
        )
        db.session.commit()
        return users_response.json(), 200


@app.route("/skills", methods=["GET"])
def skills():
    """
    Fetches all skills
    Uses try except to handle errors
    """
    with app.app_context():
        results = Skill.query.all()
    return SkillsResponse(skills=results).json(), 200


@app.route("/users/<int:id>/skills/<string:skill>", methods=["DELETE"])
def delete_skill(id, skill):
    """
    Checks if the user exists in the Users table
    Checks if the skill exists in the Skills table
    Deletes the skill from the UsersSkills table
    """
    with app.app_context():
        user = User.query.get(id)
        if user is None:
            return "User not found", 404
        skill_db = Skill.query.filter_by(name=skill).first()
        if skill_db is None:
            return "Skill not found", 404
        user.skills.remove(skill_db)
        user_response = UsersResponse(
            users=[
                {
                    "id": user.id,
                    "name": user.name,
                    "skills": [skill.name for skill in user.skills]
                }
            ]
        )
        db.session.commit()
        return user_response.json(), 200

if __name__ == "__main__":
    app.run()
