const updateProfile = async (userId, formData) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const url = `${backendUrl}/api/update_user/${userId}`; 
    const token = sessionStorage.getItem('token'); 

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}` 
            },
            body: formData
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