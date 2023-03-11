import React from 'react'
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    let location = useLocation();

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

                    <form className="d-flex" role="search">
                        <Link to="/login">
                            <button type="button" className="btn btn-outline-primary mx-2">Log in</button>
                        </Link>
                        <Link to="/signin">
                            <button type="button" className="btn btn-outline-primary mx-2">Sign in</button>
                        </Link>
                    </form>

                </div>
            </div>
        </nav>
    )
}

export default Navbar