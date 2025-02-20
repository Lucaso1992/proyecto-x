const getMyPosts = async (id) => {
    const token = sessionStorage.getItem('token');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
        const response = await fetch(backendUrl + `api/user_posts/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Posts:", data.posts); 

        return data.posts; 

    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

export default getMyPosts;