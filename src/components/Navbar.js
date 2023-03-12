import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { getAuthToken } from '../constants/Constants';
import { useNavigate } from 'react-router-dom';
import { removeAuthToken } from '../constants/Constants';

function Navbar() {
    let location = useLocation();
    const navigate = useNavigate();

    const logOut = () => {
        removeAuthToken();
        navigate("/");
    }

    return (
        // data-bs-theme="dark"
        <nav className="navbar navbar-expand-lg bg-body-tertiary" >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Navbar</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${(location.pathname === "/") ? "active" : ""}`} to="/">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={`nav-link ${(location.pathname === "/about") ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>

                    {
                        (!getAuthToken()) ? <form className="d-flex">
                            <Link to="/login">
                                <button type="button" className="btn btn-outline-primary mx-2">Log in</button>
                            </Link>
                            <Link to="/signup">
                                <button type="button" className="btn btn-outline-primary mx-2">Sign Up</button>
                            </Link>
                        </form> :
                            <button type="button" className="btn btn-outline-primary mx-2"
                                onClick={logOut}>Log out</button>
                    }

                </div>
            </div>
        </nav>
    )
}

export default Navbar