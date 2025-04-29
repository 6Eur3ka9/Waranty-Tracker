import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [connectedUserId, setConnectedUserId] = useState(null);
  const [connectedUserToken, setConnectedUserToken] = useState(null);
  const [connectedUserPassword, setConnectedUserPassword] = useState(null);


  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("userToken");
    const storedPassword = localStorage.getItem("userPassword");
    if (storedId) setConnectedUserId(storedId);
    if (storedToken) setConnectedUserToken(storedToken);
    if (storedPassword) setConnectedUserPassword(storedPassword);
  }, []);

  return (
    <UserContext.Provider
      value={{
        connectedUserId,
        setConnectedUserId,
        connectedUserToken,
        setConnectedUserToken,
        connectedUserPassword,
        setConnectedUserPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
