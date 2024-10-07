const SignUp = (username, email, password) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    fetch(backendUrl + 'api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
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

  export default SignUp;




  