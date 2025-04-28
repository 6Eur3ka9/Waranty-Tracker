import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";

interface UserContextType {
  connectedUserId: string | null;
  setConnectedUserId: React.Dispatch<React.SetStateAction<string | null>>;
  connectedUserToken: string | null;
  setConnectedUserToken: React.Dispatch<React.SetStateAction<string | null>>;
  connectedUserPassword: string | null;
  setConnectedUserPassword: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [connectedUserId, setConnectedUserId] = useState<string | null>(null);
  const [connectedUserToken, setConnectedUserToken] = useState<string | null>(null);
  const [connectedUserPassword, setConnectedUserPassword] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("userToken");
    const storedPassword = localStorage.getItem("userPassword");
    if (storedId)       setConnectedUserId(storedId);
    if (storedToken)    setConnectedUserToken(storedToken);
    if (storedPassword) setConnectedUserPassword(storedPassword);
  }, []);

  return (
    <UserContext.Provider value={{
      connectedUserId,
      setConnectedUserId,
      connectedUserToken,
      setConnectedUserToken,
      connectedUserPassword,
      setConnectedUserPassword,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
};
