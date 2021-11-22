# API documentation

## Routes

### /users (GET)

    * Returns a list of users and their skills

    * Returns:
        ```json
        {
            "users": [
                {
                    "id": 1,
                    "name": "John Doe",
                    "skills": [
                        'JavaScript',
                        'Python',
                    ]
                },
                {
                    "id": 2,
                    "name": "Jane Doe",
                    "skills": [
                        'JavaScript',
                        'Python',
                    ]
                }
            ]
        }

### /users?skill={skill} (GET)

    * Returns a list of all users with the specified skill.

    * Example: `/users?skill=javascript`

    * Returns:

        ```json
        {
            "users": [
                {
                    "id": 1,
                    "name": "John Doe",
                    "skills": [
                        "javascript",
                        "html",
                        "css"
                    ]
                },
                {
                    "id": 2,
                    "name": "Jane Doe",
                    "skills": [
                        "javascript",
                        "html",
                        "css"
                    ]
                }
            ]
        }
        ```

### /users/{id} (GET)

    * Returns a user with the specified ID.

    * Example: `/users/1`

    * Returns:

        ```json
        {
            "id": 1,
            "name": "John Doe",
            "skills": [
                "javascript",
                "html",
                "css"
            ]
        }
        ```

### /users/{id} (DELETE)

    * Deletes a user with the specified ID.

    * Example: `/users/1`

    * Returns:

        ```User deleted```

### /users (POST)

    * Creates a batch of users.

    * Example: `/users`

    * Returns:

        ```json
        {
            "users": [
                {
                    "id": 1,
                    "name": "John Doe",
                    "skills": []
                },
                {
                    "id": 2,
                    "name": "Jane Doe",
                    "skills": []
                }
            ]
        }
        ```

### /users (DELETE)

    * Deletes all users.

    * Example: `/users`

    * Returns:

        ```Users deleted```

### /users/{id}/skills (PUT)
    
        * Adds a skill to a user.
    
        * Example: `/users/1/skills`

        * Request body:

            ```json
            {
                "skills": [
                    "javascript",
                    "html",
                    "css"
                ]
            }
            ```
    
        * Returns:
    
            ```json
            {
                "id": 1,
                "name": "John Doe",
                "skills": [
                    "javascript",
                    "html",
                    "css"
                ]
            }
            ```

### /skills (GET)

    * Returns a list of all skills.

    * Example: `/skills`

    * Returns:

        ```json
        {
            "skills": [
                "javascript",
                "html",
                "css"
            ]
        }
        ```

### /users/{id}/skills/{skill} (DELETE)

    * Removes a skill from a user.

    * Example: `/users/1/skills/javascript`

    * Returns:

        ```json
        {
            "id": 1,
            "name": "John Doe",
            "skills": [
                "html",
                "css"
            ]
        }
        ```