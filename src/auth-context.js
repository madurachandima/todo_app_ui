import React, { createContext, useState } from "react";

const AuthContext = createContext({});

const AuthProvider = (props) => {
  console.log("props", props);
  const [loggedIn, setLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem("Token"));
  localStorage.setItem("Token", authToken);

  const authContextValue = { loggedIn, setLoggedIn, authToken, setAuthToken };
  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);
export { AuthProvider, useAuth };
