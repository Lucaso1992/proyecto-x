import { useEffect, useState } from "react";
import createPost from "../../services/createPost";
import styles from "./MyPosts.module.css";
import getMyPosts from "../../services/getMyPosts";
import Post from "../../components/Post/Post";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

const MyPosts = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [title, setTitle] = useState(""); 
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreatePost, setShowCreatePost] = useState(false); 
    const userId = localStorage.getItem('user_id');

    const fetchUserPosts = async () => {
        setLoading(true); 
        const posts = await getMyPosts(userId);
        setUserPosts(posts);
        setLoading(false); 
    };

    useEffect(() => {
        fetchUserPosts();  
    }, []);  
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];  
        if (file) {
            setProfileImage(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePost = async () => {
        if (title && profileImage) {
            const response = await createPost(title, profileImage);
            if (response) {
                alert('Post created successfully!');
                setTitle('');
                setProfileImage(null);
                setPreviewImage(null);
                fetchUserPosts();
            } else {
                alert('Error creating post');
            }
        } else {
            alert('Please fill in all fields and upload an image');
        }
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className={styles.title}>My Posts</h1>
            <h3 
                style={{ cursor: "pointer" }}
                onClick={() => setShowCreatePost(!showCreatePost)}
            >
                {showCreatePost ? <MdDeleteForever className={styles.icons} /> : <IoMdAddCircle className={styles.icons}/>} 
            </h3>

            {showCreatePost && (
                <div className={styles.load_info_container}>
                    {previewImage && (
                        <div className={styles.img_container}>
                            <img src={previewImage} alt="post_preview" className={styles.loaded_img} />
                        </div>
                    )}
                    <input type="file" className="form-control" id="profileImage" onChange={handleImageChange} />  
                    <div className="card-body">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter post title..." 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                    </div>
                    <button className={`btn mt-3 ${styles.button}`} onClick={handlePost}>Post</button>
                </div>
            )}

            {loading ? (
                <div className={styles.loader}></div>
            ) : (
                <div className={styles.posts_container}>
                    {userPosts.map((post) => (
                        <Post img={post.media[0].url} text={post.comment[0].comment_text} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyPosts;
