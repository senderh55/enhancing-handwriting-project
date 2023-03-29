import React from "react";
import * as api from "../utils/api";
import { useState, useEffect, createContext, useCallback } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [profiles, setProfiles] = useState([]);

  const getProfiles = useCallback(async (token) => {
    // we use useCallback to prevent the function from being recreated on every render and causing an infinite loop
    const response = await api.getProfiles(token);
    const userProfiles = response.map((profile) => {
      return {
        key: JSON.stringify(profile._id),
        name: JSON.stringify(profile.name),
        age: JSON.stringify(profile.age),
        description: JSON.stringify(profile.description),
      };
    });
    setProfiles(userProfiles);
  }, []);

  useEffect(() => {
    // this useEffect will run on every render and check if the user is logged in

    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
        setToken(token);
        setUserName(localStorage.getItem("name"));
        await getProfiles(token);
      }
    };

    checkAuth();
  }, [getProfiles]); // we pass getProfiles as a dependency to prevent the useEffect from being recreated on every render and causing an infinite loop

  const userLoggedIn = async (userData) => {
    localStorage.setItem("token", userData.token); // store the token in the browser's local storage
    setToken(userData.token);
    const userFirstName = userData.user.name.split(" ")[0];
    setUserName(userFirstName);
    localStorage.setItem("name", userFirstName); // store the token in the browser's local storage
    setIsLoggedIn(true);
    await getProfiles(userData.token);
  };

  const signup = async (name, email, password) => {
    try {
      const response = await api.signup(name, email, password);
      userLoggedIn(response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      // Make API request to authenticate the user
      const response = await api.login(email, password);

      // Check if the response contains a token
      if (!response.token) {
        throw new Error("Authentication failed");
      }
      userLoggedIn(response);

      return response;
    } catch (error) {
      // Handle login errors FIXME

      throw error;
    }
  };

  const logout = async () => {
    try {
      // Make API request to authenticate the user
      const response = await api.logout(token);
      localStorage.removeItem("token"); // remove the token from the browser's local storage
      localStorage.removeItem("name"); // remove the name from the browser's local storage
      setToken("");
      setUserName("");
      setIsLoggedIn(false);
      return response;
    } catch (error) {
      // Handle logout errors

      throw error;
    }
  };

  const createProfile = async (name, age, description) => {
    try {
      // Make API request to authenticate the user
      const response = await api.createProfile(token, name, age, description);
      await getProfiles(token);
      return response;
    } catch (error) {
      // Handle logout errors
    }
  };

  // Define the context value
  const contextValue = {
    isLoggedIn,
    userName,
    profiles,
    signup,
    login,
    logout,
    createProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
