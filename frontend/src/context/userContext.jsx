import React, { createContext, useState, useContext } from "react";

// Create the User Context
const UserContext = createContext();

// UserProvider component to manage and provide user state
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // State to hold the current user

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context; // Return the context value (currentUser and setCurrentUser)
};
