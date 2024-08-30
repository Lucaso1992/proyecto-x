import styles from "./Navbar.module.css";
import { useState } from "react";
import useAppContext from "../../store/AppContext";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { actions, store } = useAppContext();
    const [modalType, setModalType] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleOpenModal = (type) => {
        setModalType(type);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (modalType === 'signup') {
            actions.SignUp(name, email, password);
        } else if (modalType === 'login') {
            actions.LogIn(email, password);
        }
    };

    return (
        <>
            <nav className={`${styles.navbar} navbar navbar-expand-lg`}>
                <div className="container-fluid">
                    <div className={styles.img_container} onClick={() => navigate("/")}>
                        <img className={styles.img} src={logo} alt="ShowApp" />
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <p className={`${styles.nav_items} nav-link `}  onClick={() => handleOpenModal('signup')} data-bs-toggle="modal" data-bs-target="#authModal"><strong>Sign Up</strong></p>
                            </li>
                            <li className="nav-item">
                                <p className={`${styles.nav_items} nav-link`} onClick={() => handleOpenModal('login')} data-bs-toggle="modal" data-bs-target="#authModal"><strong>Log In</strong></p>
                            </li>
                            <li className="nav-item">
                                <p className={`${styles.nav_items} nav-link`}><strong>Contact Us</strong></p>
                            </li>
                            <li className="nav-item">
                                <p className={`${styles.nav_items} nav-link`} onClick={() => navigate("/profile")} ><strong>Profile</strong></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className={`${styles.modal_father} modal fade`} id="authModal" tabIndex="-1" aria-labelledby="authModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className={`${styles.modal_container} modal-content`}>
                        <div className="modal-header">
                            <h5 className={`${styles.modal_title} modal-title`} id="authModalLabel"><strong>{modalType === 'login' ? 'Log In' : 'Sign Up'}</strong></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className={`${styles.form_labels} form-label`}><strong>Email address</strong></label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" required />
                                </div>
                                {modalType === 'signup' && (
                                    <div className="mb-3">
                                        <label htmlFor="name" className={`${styles.form_labels} form-label`}><strong>Name</strong></label>
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" required />
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
