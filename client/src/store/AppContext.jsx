import { useContext, createContext, useState, useEffect } from "react";
import getUserProfile from "../services/getUserProfile";
const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [userData, setUserData] = useState(null);
  const [change, setChange] = useState(false);
  const id = sessionStorage.getItem('user_id');

  useEffect(() => {
    getUserProfile(id, setUserData)
  }, [id, change]
)
  const store = { userData };
  const actions = { setChange };

  return (
    <AppContext.Provider value={{ store, actions }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;

