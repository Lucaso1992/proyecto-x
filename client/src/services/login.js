const LogIn = (email, password) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return fetch(backendUrl + 'api/login', {
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
          alert('Something went wrong! Try again');
          throw new Error(response.statusText);
      }
      return response.json(); 
  })
  .then(data => {
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('user_id', data.user.id);
      sessionStorage.setItem('username', data.user.username);
      
   
      alert('Logged in correctly!');
      window.location.reload(); 
      return true;  
  })
  .catch(error => {
      console.error(error);
      return false;  
  });
}

export default LogIn;
