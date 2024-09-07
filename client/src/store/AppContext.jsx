import { useContext, createContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [users, setUsers] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getUsers = () => {
    fetch(`${backendUrl}api/users`)
      .then(resp => resp.json())
      .then(data => setUsers(data))
  }

  const SignUp = (name, email, password) => {
    fetch(backendUrl + 'api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        is_active: true
      })
    })
      .then(response => {
        if (!response.ok) {
          alert('Something wen wrong! Try again')
          throw new Error(response.statusText);
        }
        // alert('User created succesfully!')
        response.json();
        window.location.reload();
        alert('Signed Up in correctly!')
        return true
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const LogIn = (email, password) => {
    fetch(backendUrl + 'api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(response => {
        if (!response.ok) {
          alert('Something wen wrong! Try again')
          throw new Error(response.statusText);

        }
        window.location.reload();
        alert('Logged in correctly!')
        return response.json();
      })
      .then(data => {
        localStorage.setItem('token', data.token)
      })
      .catch(error => {
        console.error(error);
      });
  }


  const store = { users };
  const actions = { getUsers, SignUp, LogIn };

  return (
    <AppContext.Provider value={{ store, actions }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;

