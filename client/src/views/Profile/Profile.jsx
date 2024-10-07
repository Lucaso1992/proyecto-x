import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAppContext from "../../store/AppContext";
import updateProfile from "../../services/updateProfile";
import getUserProfile from "../../services/getUserProfile";

import styles from "./Profile.module.css";

const Profile = () => {
    const { actions, store } = useAppContext();
    const [userData, setUserData] = useState(null);
    const [username, setUserName] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [profileImage, setProfileImage] = useState(null); 
    const [previewImage, setPreviewImage] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const id = localStorage.getItem('user_id');
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('about_me', aboutMe);
        if (profileImage) {
            formData.append('file', profileImage); 
        }

        try {
            const response = await updateProfile(id, formData); 
            if (response) {
                navigate("/"); 
            } else {
                console.error("Error updating profile");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        getUserProfile(id, setUserData)
    }, [id]);

    useEffect(() => {
        if (userData) {
            setUserName(userData.username);
            setEmail(userData.email);
            setAboutMe(userData.about_me);
            setProfileImage(userData.profile_image_url);
        }
    }, [userData]);
    
    return (
        <div className={styles.form_container}>
            <h1 className={styles.title}>Profile Settings</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
            
                <div className="mb-3">
                    <label htmlFor="username" className={`${styles.labels} form-label`}><strong>User name</strong></label>
                    <input type="text" className="form-control" onChange={(e) => setUserName(e.target.value)} value={username} id="username" />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className={`${styles.labels} form-label`}><strong>Email</strong></label>
                    <input type="email" className="form-control" id="exampleInputEmail1" onChange={(e) => setEmail(e.target.value)} value={email} aria-describedby="emailHelp" />
                </div>

                <div className="mb-3">
                    <label htmlFor="aboutMe" className={`${styles.labels} form-label`}><strong>About Me</strong></label>
                    <textarea className="form-control" id="aboutMe" onChange={(e) => setAboutMe(e.target.value)} value={aboutMe} rows="3"></textarea>
                </div>

                <div className="mb-3 d-flex flex-column align-items-center">
                    <label htmlFor="profileImage" className={`${styles.labels} form-label`}><strong>Profile Image</strong></label>
                    
                    {previewImage ? (
                        <div className={styles.img_container}>
                            <img className={styles.img} src={previewImage} alt="profile_img_preview" />
                        </div>
                    ) : (
                        userData?.profile_image_url && (
                            <div className={styles.img_container}>
                                <img className={styles.img} src={userData.profile_image_url} alt="profile_img" />
                            </div>
                        )
                    )}

                    <input type="file" className="form-control mt-2 w-50" id="profileImage" onChange={handleImageChange} />
                </div>

                <div className="mb-3 form-check d-flex justify-content-center gap-3 mt-4">
                    <input type="checkbox" className={`${styles.checkbox} form-check-input`} id="exampleCheck1" />
                    <label className={`${styles.labels} form-check-label`} htmlFor="exampleCheck1"><strong>Accept terms and conditions</strong></label>
                </div>

                <button type="submit" className={`${styles.button} btn btn-primary`}><strong> Submit</strong></button>
            </form>
        </div>
    );
};

export default Profile;

