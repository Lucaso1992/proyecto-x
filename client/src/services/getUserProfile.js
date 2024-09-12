
const getUserProfile = (userId, setData) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    fetch(backendUrl + `api/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('User not found');
        }
        return response.json();
    })
    .then(data => {
        setData(data)
    })
    .catch(error => {
        console.error('Error fetching user profile:', error);
    });
};

export default getUserProfile;