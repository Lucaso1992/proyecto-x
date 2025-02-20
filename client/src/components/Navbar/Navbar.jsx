import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import useAppContext from "../../store/AppContext";
import logo from "../../assets/show.png";
import SignUp from "../../services/signUp";
import LogIn from "../../services/login";
import { FaUserLarge } from "react-icons/fa6";

const Navbar = () => {
    const { actions, store } = useAppContext();
    const [modalType, setModalType] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const user_name = sessionStorage.getItem("username");
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleOpenModal = (type) => {
        setModalType(type);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (modalType === 'signup') {
            await SignUp(username, email, password);
        } else if (modalType === 'login') {
            const loginSuccess = await LogIn(email, password);
            if (loginSuccess) {
                const modalElement = document.getElementById('authModal');
                const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
                if (modalInstance) {
                    modalInstance.hide(); 
                }
            }
        }
    };
    
    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user_id');
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <>
            <nav className={`${styles.navbar} navbar navbar-expand-lg`}>
                <div className="container-fluid">
                    <div className={styles.logo_container} onClick={() => navigate("/")}>
                        <img className={styles.img} src={logo} alt="ShowApp" />
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className={`navbar-nav ms-auto d-flex align-items-center ${styles.first_ul}`}>
                            {isLoggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <p className={`${styles.nav_items} nav-link`} onClick={() => navigate('/')} ><strong>Home</strong></p>
                                    </li>
                                    <li className="nav-item">
                                        <p className={`${styles.nav_items} nav-link`} onClick={() => navigate('/my-posts')} ><strong>My Posts</strong></p>
                                    </li>
                                    <li className="nav-item">
                                        <p className={`${styles.nav_items} nav-link`}><strong>Contact Us</strong></p>
                                    </li>
                                    <div className={`dropdown d-flex align-items-center ${styles.dropdown_menu}`}>
                                        <button className={`btn dropdown-toggle d-flex align-items-center ${styles.icon_container}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {/* <p className={styles.user_name}>{user_name}</p> */}
                                            {store.userData?.profile_image_url ? <div className={styles.img_container}>
                                                <img className={styles.user_img} src={store.userData?.profile_image_url} alt="" />
                                            </div> : <FaUserLarge/>}
                                            {/* <div className={styles.img_container}>
                                                <img className={styles.user_img} src={store.userData?.profile_image_url} alt="" />
                                            </div> */}
                                        </button>
                                        <ul className={`dropdown-menu dropdown-menu-end ${styles.ul}`}>
                                            <li> <p className={`${styles.nav_itemss} nav-link`} onClick={() => navigate("/profile")} ><strong>Profile</strong></p></li>
                                            <li><p className={`${styles.nav_itemss} nav-link`} onClick={handleLogout}><strong>Logout</strong></p></li>
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <p className={`${styles.nav_items} nav-link`} onClick={() => handleOpenModal('signup')} data-bs-toggle="modal" data-bs-target="#authModal"><strong>Sign Up</strong></p>
                                    </li>
                                    <li className="nav-item">
                                        <p className={`${styles.nav_items} nav-link`} onClick={() => handleOpenModal('login')} data-bs-toggle="modal" data-bs-target="#authModal"><strong>Log In</strong></p>
                                    </li>
                                    <li className="nav-item">
                                        <p className={`${styles.nav_items} nav-link`}><strong>Contact Us</strong></p>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="modal fade" id="authModal" tabIndex="-1" aria-labelledby="authModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className={`${styles.modal_container} modal-content`}>
                        <div className="modal-header">
                            <h5 className={`${styles.modal_title} modal-title`} id="authModalLabel"><strong>{modalType === 'login' ? 'Log In' : 'Sign Up'}</strong></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className={`${styles.form_labels} form-label`}><strong>Email</strong></label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" required />
                                </div>
                                {modalType === 'signup' && (
                                    <div className="mb-3">
                                        <label htmlFor="name" className={`${styles.form_labels} form-label`}><strong>Name</strong></label>
                                        <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} className="form-control" id="name" required />
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label htmlFor="password" className={`${styles.form_labels} form-label`}><strong>Password</strong></label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" required />
                                </div>
                                <button type="submit" className={`${styles.button} btn btn-primary`}>
                                    <strong>{modalType === 'login' ? 'Log In' : 'Sign Up'}</strong>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;



