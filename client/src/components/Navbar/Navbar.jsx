import styles from "./Navbar.module.css";
import { useState } from "react";
import useAppContext from "../../store/AppContext";

const Navbar = () => {
    const { actions, store } = useAppContext();
    const [modalType, setModalType] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


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
                    <a className="navbar-brand">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link active" href="#" onClick={() => handleOpenModal('signup')} data-bs-toggle="modal" data-bs-target="#authModal">Sign Up</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => handleOpenModal('login')} data-bs-toggle="modal" data-bs-target="#authModal">Log In</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="modal fade" id="authModal" tabIndex="-1" aria-labelledby="authModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="authModalLabel">{modalType === 'login' ? 'Log In' : 'Sign Up'}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className={`${styles.form_labels} form-label`}>Email address</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" required />
                                </div>
                                {modalType === 'signup' && (
                                    <div className="mb-3">
                                        <label htmlFor="name" className={`${styles.form_labels} form-label`}>Name</label>
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" required />
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label htmlFor="password" className={`${styles.form_labels} form-label`}>Password</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" required />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    {modalType === 'login' ? 'Log In' : 'Sign Up'}
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
