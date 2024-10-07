const LogIn = (email, password) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
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
        return response.json();
      })
      .then(data => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user_id', data.user.id)
        localStorage.setItem('username', data.user.username)
        window.location.reload();
        alert('Logged in correctly!')
      })
      .catch(error => {
        console.error(error);
      });
  }

  export default LogIn;

