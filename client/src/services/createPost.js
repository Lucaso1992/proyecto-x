
const createPost = async (commentText, imageFile) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const formData = new FormData();
    formData.append('comment_text', commentText);
    formData.append('file', imageFile);

    try {
        const response = await fetch(backendUrl + 'api/create_post', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, 
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error creating post');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export default createPost;
