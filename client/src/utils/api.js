import axios from "axios";

const serverURL = "http://localhost:8000";

export const login = async (email, password) => {
  try {
    const data = { email, password };

    const response = await axios.post(`${serverURL}/users/login`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signup = async (name, email, password) => {
  const data = { name, email, password };
  console.log(name, email, password);
  try {
    const response = await axios.post(`${serverURL}/users`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
