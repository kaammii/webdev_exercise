from flask import jsonify
def validate_skills(skills):
    """
    Validates if its an array of skills
    validates if its not an empty array
    validates if its not an empty string
    """
    if skills == []:
        return False
    if type(skills) != list:
        return False
    for skill in skills:
        if skill == "":
            return False
    return skills


def api_response(data, status_code, err=None):
    """
    Returns the api response
    """
    if err:
        return jsonify({"error": err}), status_code
    return jsonify(data), status_code
