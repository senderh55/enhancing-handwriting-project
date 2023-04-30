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
  const [userIsVerified, setUserIsVerified] = useState(false); // userIsVerified is used to check if the user is verified or not
  const [IsPasswordReset, setIsPasswordReset] = useState(false); // IsPasswordReset is used to check if the user just reset his password or not
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
        setUserEmail(localStorage.getItem("userEmail"));
        await getProfiles(token);
      }
    };

    checkAuth();
  }, [getProfiles]); // we pass getProfiles as a dependency to prevent the useEffect from being recreated on every render and causing an infinite loop

  // this function is used to store the user's data in the state and the browser's local storage
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
    localStorage.setItem("userEmail", userData.user.email); // store the user email in the browser's local storage
  };

  const signup = async (name, email, password) => {
    try {
      const newUser = await api.signup(name, email, password);
      await userSignedUp(newUser);
      return newUser;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  };

  const login = async (email, password) => {
    try {
      // Make API request to authenticate the user
      const response = await api.login(email, password);
      // if we got a response, the user exist and the password is correct
      // now we need to check if the user has verified their email address
      setUserEmail(email);
      localStorage.setItem("userEmail", email); // store the user email in the browser's local storage for verification
      if (!response.isVerified) {
        return false; // if the user has not validated their email address, return false
      }
      // Check if the response contains a token
      if (!response.token) {
        throw new Error("Authentication failed");
      }
      await userLoggedIn(response);
      return true;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  };

  // send the verification code to the server to verify the user's email address
  const userEmailVerification = async (code) => {
    try {
      // get the user email from the browser's local storage if the user email is not available in the state (this happens when the user refreshes the page)
      const mail = userEmail ? userEmail : localStorage.getItem("userEmail");
      const response = await api.userEmailVerification(mail, code);
      setUserIsVerified(true); // if the user's email address is verified, set the userIsVerified state to true to alert the user that their email address is verified
      return response;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  };

  // genarate and resend new verification code to the user's email address
  const resendVerificationCode = async (email, forgotPassword = false) => {
    try {
      const response = await api.resendVerificationCode(email, forgotPassword);
      return response;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  };

  const logout = async () => {
    try {
      // Make API request to authenticate the user
      const response = await api.logout(token);
      localStorage.removeItem("token"); // remove the token from the browser's local storage
      localStorage.removeItem("userEmail"); // remove the user email from the browser's local storage
      localStorage.removeItem("name"); // remove the name from the browser's local storage
      setToken("");
      setUserName("");
      setIsLoggedIn(false);
      setSelectedProfile({ key: "", name: "", age: "", description: "" });
      setIsPasswordReset(false);
      setProfiles([]);
      return response;
    } catch (error) {
      throw new Error(`${error.message}`);
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
      setUserIsVerified(false); // prevent other users to login with unverified email address
      await api.deleteUser(token);
    } catch (error) {
      return error;
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      await api.changePassword(token, oldPassword, newPassword);
      setIsPasswordReset(true);
    } catch (error) {
      // got an error from the server (wrong old password), throw it to the component
      throw error;
    }
  };

  const resetPassword = async (newPassword, verificationCode, email) => {
    try {
      await api.resetPassword(newPassword, verificationCode, email);
      setIsPasswordReset(true); // set the IsPasswordReset state to true to alert the user that their password has been reset (pages/login.js)
    } catch (error) {
      throw new Error(`${error.message}`);
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
    userIsVerified,
    IsPasswordReset,
    signup,
    login,
    userEmailVerification,
    logout,
    changePassword,
    ProfileFormOperation,
    getSelectedProfile,
    setSelectedProfile,
    setIsEditingProfile,
    deleteProfile,
    deleteUser,
    resendVerificationCode,
    resetPassword,
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
