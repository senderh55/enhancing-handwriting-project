import React from "react";
import * as api from "../utils/api";
import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [profiles, setProfiles] = useState([]);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    console.log(`checkAuth token: ${token}`);
    if (token) {
      setIsLoggedIn(true);
      setToken(token);
      setUserName(localStorage.getItem("name"));
      getProfiles(token);
    }
  };

  useEffect(() => {
    console.log("authContext.js useEffect");
    checkAuth();
  }, []); // FIXME - why it called twice?

  const userLoggedIn = (userData) => {
    localStorage.setItem("token", userData.token); // store the token in the browser's local storage
    setToken(userData.token);
    const userFirstName = userData.user.name.split(" ")[0];
    setUserName(userFirstName);
    localStorage.setItem("name", userFirstName); // store the token in the browser's local storage
    setIsLoggedIn(true);
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

  const getProfiles = async (token) => {
    try {
      console.log(`authContext.js token getProfiles: ${token}`);
      const response = await api.getProfiles(token);
      setProfiles(response.data);

      return;
    } catch (error) {
      throw error;
    }
  };

  // Define the context value
  const contextValue = {
    isLoggedIn,
    userName,
    getProfiles,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
