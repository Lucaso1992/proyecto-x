import { useContext, createContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [users, setUsers] = useState([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getUsers = () => {
        fetch(`${backendUrl}/api/users`)
        .then(resp => resp.json())
        .then(data => setUsers(data))
    }

  const store = {users};
  const actions = {getUsers};

  return (
    <AppContext.Provider value={{ store, actions }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;
