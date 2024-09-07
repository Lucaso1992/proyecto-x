import styles from "./Profile.module.css";

const Profile = () => {
    return (
        <div className={styles.form_container}>
            <h1 className={styles.title}>Profile Settings</h1>
            <form className={styles.form}>
                           <div className="mb-3">
                    <label htmlFor="username" className={`${styles.labels} form-label`}><strong>User name</strong></label>
                    <input type="text" className="form-control" id="username" />
                </div>

                           <div className="mb-3">
                    <label htmlFor="aboutMe" className={`${styles.labels} form-label`}><strong>About Me</strong></label>
                    <textarea className="form-control" id="aboutMe" rows="3"></textarea>
                </div>

                    <div className="mb-3">
                    <label htmlFor="profileImage" className={`${styles.labels} form-label`}><strong>Profile Image</strong></label>
                    <input type="file" className="form-control" id="profileImage" />
                </div>

                      <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className={`${styles.labels} form-label`}><strong>Email address</strong></label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>

                            <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className={`${styles.labels} form-label`}><strong>Password</strong></label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                    <div id="emailHelp" className="form-text">Never share your password with anyone else.</div>
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
