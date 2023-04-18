import React from "react";
import * as api from "../utils/api";
import { useState, useEffect, createContext, useCallback } from "react";

/* authContext.js is used to store the state of the application and provide it to the components that need it using the useContext hook and the AuthContext object
 we use the createContext function to create the AuthContext object
 we use the AuthProvider component to wrap the components that need access to the state
 we use the useContext hook to access the state in the components that need it*/

const AuthContext = createContext();

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // isLoggedIn is used to check if the user is logged in or not
  const [token, setToken] = useState(""); // token is used to store the token of the user
  const [userName, setUserName] = useState(""); // userName is used to store the private name of the user for dashboard greeting
  const [profiles, setProfiles] = useState([]); // we use an array to store the profiles of the user
  const [selectedProfile, setSelectedProfile] = useState({}); // we use an object to store the selected profile
  const [isEditingProfile, setIsEditingProfile] = useState(false); // isEditingProfile is used to check if the user is editing a profile or creating a new one

  const [userEmail, setUserEmail] = useState(""); // userEmail is used to store the email address of the user
  const getSelectedProfile = useCallback(
    // useCallback is used to prevent the function from being recreated on every render and causing an infinite loop in the useEffect
    (profileId) => {
      const selectedProfile = profiles.find(
        (profile) => profile.key === profileId // find the profile with the same key as the profileId
      );
      setSelectedProfile(selectedProfile);
    },
    [profiles]
  );

  // we use useCallback to prevent the function from being recreated on every render and causing an infinite loop
  const getProfiles = useCallback(async (token) => {
    const response = await api.getProfiles(token);
    const userProfiles = response.map((profile) => {
      return {
        key: JSON.stringify(profile._id).replace(/['"]/g, ""), // remove the quotes from the string
        name: JSON.stringify(profile.name).replace(/['"]/g, ""),
        age: JSON.stringify(profile.age),
        description: JSON.stringify(profile.description).replace(/['"]/g, ""),
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
    const userFirstName = userData.user.name.split(" ")[0];
    setUserName(userFirstName);
    localStorage.setItem("name", userFirstName); // store the token in the browser's local storage
    setUserEmail(userData.user.email);
    localStorage.setItem("token", userData.token); // store the token in the browser's local storage
    setToken(userData.token);
    setIsLoggedIn(true);
    await getProfiles(userData.token);
  };

  const userSignedUp = async (userData) => {
    const userFirstName = userData.user.name.split(" ")[0];
    setUserName(userFirstName);
    localStorage.setItem("name", userFirstName); // store the token in the browser's local storage
    setUserEmail(userData.user.email);
  };

  const signup = async (name, email, password) => {
    try {
      const newUser = await api.signup(name, email, password);
      await userSignedUp(newUser);
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      // Make API request to authenticate the user
      const response = await api.login(email, password);
      setUserEmail(email);
      if (!response.isVerified) {
        setUserEmail(email);
        return false; // if the user has not validated their email address, return false
      }
      // Check if the response contains a token
      if (!response.token) {
        throw new Error("Authentication failed");
      }
      await userLoggedIn(response);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const userEmailValidation = async (code) => {
    try {
      // Make API request to authenticate the user
      const response = await api.userEmailValidation(userEmail, code);
      return response;
    } catch (error) {
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

  const ProfileFormOperation = async (name, age, description) => {
    try {
      // check if the user is editing a profile or creating a new one and make the appropriate API request
      isEditingProfile
        ? await api.updateProfile(
            // selectedProfile.key is the id of the profile that we required for updating in the database, we need to remove the quotes from the string
            selectedProfile.key,
            token,
            name,
            age,
            description
          )
        : await api.createProfile(token, name, age, description);
      await getProfiles(token); // after creating or updating a profile, we need to get the updated list of profiles from the database
    } catch (error) {
      // handle server errors
      return error;
    }
  };

  const deleteProfile = async () => {
    try {
      await api.deleteProfile(selectedProfile.key, token);
      await getProfiles(token); // after deleting a profile, we need to get the updated list of profiles from the database
    } catch (error) {
      return error;
    }
  };

  const deleteUser = async () => {
    try {
      logout();
      await api.deleteUser(token);
    } catch (error) {
      return error;
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      await api.changePassword(token, oldPassword, newPassword);
    } catch (error) {
      // got an error from the server (wrong old password), throw it to the component
      throw error;
    }
  };

  // Define the context value
  const contextValue = {
    isLoggedIn,
    userName,
    profiles,
    selectedProfile,
    isEditingProfile,
    userEmail,
    signup,
    login,
    userEmailValidation,
    logout,
    changePassword,
    ProfileFormOperation,
    getSelectedProfile,
    setSelectedProfile,
    setIsEditingProfile,
    deleteProfile,
    deleteUser,
  };
  // we use the AuthContext.Provider component to wrap the components that need access to the state and pass the contextValue as a prop
  // props.children is used to render the components that are wrapped by the AuthProvider component
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
