# create a test for the app
import json
from app import app
from models import db, Skill
from flask_testing import TestCase

class TestApp(TestCase):
    SQLALCHEMY_DATABASE_URI = "sqlite://"
    TESTING = True

    def create_app(self):
        app.config.from_object(self)
        return app

    def setUp(self):
        db.create_all()
        # create skills
        skills = ['react', 'python', 'flask', 'django', 'postgresql', 'sqlalchemy', 'html', 'css', 'javascript']
        for skill in skills:
            db.session.add(Skill(name=skill))
        
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    # test list users with userresponse
    def test_list_users(self):
        self.client.post("/users")
        response = self.client.get("/users")
        # is response.json().users length equal to 1
        data = response.data.decode("utf-8")
        data = json.loads(data)
        self.assertEqual(len(data['users']), 10)
        

    # test post methpd for adding users using faker library
    def test_add_user(self):
        response = self.client.post("/users")
        self.assertEqual(response.status_code, 201)
    
    # test delete all users
    def test_delete_all_users(self):
        self.client.post("/users")
        response = self.client.delete("/users")
        self.assertEqual(response.status_code, 200)
    
    # test get user by id
    def test_get_user_by_id(self):
        self.client.post("/users")
        response = self.client.get("/users/1")
        self.assertEqual(response.status_code, 200)

    def test_delete_user_by_id(self):
        self.client.post("/users")
        del_response = self.client.delete("/users/1")
        users = self.client.get("/users")
        data = users.data.decode("utf-8")
        data = json.loads(data)
        self.assertEqual(len(data['users']), 9)
        self.assertEqual(del_response.status_code, 200)
    
    # update user skills by id
    def test_update_user_skills_by_id(self):
        self.client.post("/users")
        response = self.client.put("/users/1/skills", json={"skills": ["react", "python"]})
        data = response.data.decode("utf-8")
        data = json.loads(data)
        self.assertEqual(data['users'][0]['skills'], ["python", "react"])
    
    def test_get_all_skills(self):
        response = self.client.get("/skills")
        print('response', response)
        self.assertEqual(response.status_code, 200)
    

    def test_delete_skill_from_user(self):
        self.client.post("/users")
        response = self.client.put("/users/1/skills", json={"skills": ["react", "python"]})
        response = self.client.delete("/users/1/skills/python")
        data = response.data.decode("utf-8")
        data = json.loads(data)
        self.assertEqual(data['users'][0]['skills'], ["react"])

