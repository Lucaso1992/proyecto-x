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
    const [profileImage, setProfileImage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const id = localStorage.getItem('user_id');
    const navigate = useNavigate("/");

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(id, username, email, aboutMe, email, password);
        navigate("/");
    }

    useEffect(() => {
        getUserProfile(id, setUserData)
    }, [])
    
    useEffect(() => {
        if(userData){
            setUserName(userData.username);
            setEmail(userData.email);
            setAboutMe(userData.about_me);
        }
    }, [userData])

    return (
        <div className={styles.form_container}>
            <h1 className={styles.title}>Profile Settings</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className={`${styles.labels} form-label`} ><strong>User name</strong></label>
                    <input type="text" className="form-control" onChange={(e) => setUserName(e.target.value)}
                        value={username} id="username" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className={`${styles.labels} form-label`}><strong>Email </strong></label>
                    <input type="email" className="form-control" id="exampleInputEmail1" onChange={(e) => setEmail(e.target.value)}
                        value={email} aria-describedby="emailHelp" />
                </div>

                <div className="mb-3">
                    <label htmlFor="profileImage" className={`${styles.labels} form-label`}><strong>Profile Image</strong></label>
                    <input type="file" className="form-control" id="profileImage" />
                </div>
                <div className="mb-3">
                    <label htmlFor="aboutMe" className={`${styles.labels} form-label`}><strong>About Me</strong></label>
                    <textarea className="form-control" id="aboutMe" onChange={(e) => setAboutMe(e.target.value)} value={aboutMe} rows="3"></textarea>
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