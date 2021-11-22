# WorkGenius Web Developer test exercise

## Project Overview

The project is a web application where admins can see/review/manage users.

### Backend

#### [API documentation](https://github.com/kaammii/webdev_exercise/tree/main/backend#api-documentation)

> _Assumption is that you working under ubuntu and have set up python3.8_

```shell
cd backend

# Install virtual environment
python3.8 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run tests
pytest

# Run
flask run --reload
```

### Frontend

> _The project now uses yarn and typescript_

```shell
cd frontend

# to install yarn
npm i -g yarn

# Install dependencies
yarn install

# Run tests
yarn run test

# Run
yarn start
```
