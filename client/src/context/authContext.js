import React from "react";
import * as api from "../utils/api";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [token, setToken] = React.useState("");

  const login = async (email, password) => {
    try {
      // Make API request to authenticate the user
      const response = await api.login(email, password);

      // Check if the response contains a token
      if (!response.token) {
        throw new Error("Authentication failed");
      }

      // Set the token and login state in the context
      setIsLoggedIn(true);
      setToken(response.token);

      // Return the token value
      return response.token;
    } catch (error) {
      // Handle login errors
      setIsLoggedIn(false);
      setToken("");
      throw error;
    }
  };

  const logout = () => {
    // your logout logic here

    setIsLoggedIn(false);
    setToken("");
  };

  // Define the context value
  const contextValue = {
    isLoggedIn,
    token,
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
