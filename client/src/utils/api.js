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

export const logout = async (token) => {
  try {
    const response = await axios.post(
      `${serverURL}/users/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const createProfile = async (token, profile) => {
  try {
    const response = await axios.post(`${serverURL}/profiles`, profile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProfiles = async (token) => {
  try {
    const response = await axios.get(`${serverURL}/profiles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`api.js response for getProfiles: ${response.data}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
