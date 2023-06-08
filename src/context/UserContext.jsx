import { createContext, useEffect, useState } from "react";
import React from "react";

export const UserContext = createContext({
  isAuth: false,
  user: {
    userId: "",
    email: "",
    firstName: "",
    lastName: "",
  },
  setAuthentication: (userData) => {},
  logOut: () => {},
});

function UserProvider({ children }) {
  const [user, setUser] = useState(false);

  function setAuthentication(userData, authToken) {
    if (authToken) {
      sessionStorage.setItem("Auth Token", authToken);
      sessionStorage.setItem("User Data", JSON.stringify(userData));
    }
    setUser(userData);
  }
  function logOut() {
    setUser(false);
    sessionStorage.removeItem("User Data");
    sessionStorage.removeItem("Auth Token");
  }
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    const userData = JSON.parse(sessionStorage.getItem("User Data"));
    if (authToken) {
      setAuthentication(userData);
    }
  }, []);
  return (
    <UserContext.Provider
      value={{ isAuth: !!user, user, setAuthentication, logOut }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
