import axios from "axios";

const serverURL = "http://localhost:8000";

// api.js is used to make the requests to the server and handle the responses, this is the ONLY file that makes interactions with the server
export const login = async (email, password) => {
  try {
    const data = { email, password };
    const response = await axios.post(`${serverURL}/users/login`, data);
    console.log(response.data);
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

export const validateUser = async (validationCode) => {
  try {
    const response = await axios.patch(
      `${serverURL}/users/validate/${validationCode}`
    );
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

export const createProfile = async (token, name, age, description) => {
  const profile = { name, age, description };
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

export const updateProfile = async (id, token, name, age, description) => {
  const profile = { name, age, description };
  try {
    const response = await axios.patch(`${serverURL}/profiles/${id}`, profile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteProfile = async (id, token) => {
  try {
    const response = await axios.delete(`${serverURL}/profiles/${id}`, {
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
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteUser = async (token) => {
  try {
    const response = await axios.delete(`${serverURL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const changePassword = async (token, password, newPassword) => {
  const data = { password, newPassword };
  try {
    const response = await axios.patch(`${serverURL}/users/me`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
