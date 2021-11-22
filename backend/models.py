from typing import List

from flask_sqlalchemy import SQLAlchemy
from pydantic import BaseModel

db = SQLAlchemy()

user_skills = db.Table('user_skills', db.Column('user_id', db.Integer, db.ForeignKey(
    'user.id')), db.Column('skill_id', db.Integer, db.ForeignKey('skill.id')))


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    skills = db.relationship('Skill', secondary=user_skills, backref=db.backref('users', lazy='subquery'))

    def __repr__(self):
        return "<User %r>" % self.name


class UserSchema(BaseModel):
    id: int
    name: str
    skills: List[str]

    class Config:
        orm_mode = True

class UsersResponse(BaseModel):
    users: List[UserSchema]


class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

    def __repr__(self):
        return "<Skill %r>" % self.name


class SkillSchema(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class SkillsResponse(BaseModel):
    skills: List[SkillSchema]
