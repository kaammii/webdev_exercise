import { BASE_PATH } from "../constants";
import { ISkill, IUser } from "./types";

// fetch users from the server using try/catch
export const fetchUsers = async (skills: string[]=[]): Promise<IUser[] | any> => {
  try {
    const params = skills.length ? '?skill='+skills.join('&skill=') : ''
    const response = await fetch(`${BASE_PATH}/users${params}`)
    const { users } = await response.json();
    return users;
  } catch (error) {
    return error;
  }
};

// list all the skills from the server using try/catch
export const fetchSkills = async (): Promise<ISkill | any> => {
  try {
    const response = await fetch(`${BASE_PATH}/skills`);
    const { skills } = await response.json();
    return skills;
  } catch (error) {
    return error;
  }
};

// PUT skills to a user using try/catch
export const addSkills = async (userId: number, skills: string[]): Promise<any> => {
  try {
    const response = await fetch(`${BASE_PATH}/users/${userId}/skills`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ skills }),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    return error;
  }
}

// Add users in bulk using try/catch
export const addUsers = async (): Promise<IUser[] | any> => {
  try {
    const response = await fetch(`${BASE_PATH}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    return res.users;
  } catch (error) {
    return error;
  }
}

export const deleteUsersBulk = async (): Promise<any> => {
  const res = await fetch("http://127.0.0.1:5000/users", {
    method: "DELETE",
  });
  return res;
};