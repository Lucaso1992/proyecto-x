const updateProfile = async (userId, username, email, aboutMe, password) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const url = `${backendUrl}/api/update_user/${userId}`; 
    const token = localStorage.getItem('token'); 

    const requestBody = {
        id: userId,
        username: username,
        email: email,
        about_me: aboutMe,
        password: password
    };
    console.log(requestBody)
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Profile updated successfully:', data);
            return data; 
        } else {
            console.error('Error updating profile:', data.error || data.message);
            return null; 
        }
    } catch (error) {
        console.error('Error during the update request:', error);
        return null; 
    }
};

export default updateProfile;
