import React, { useState } from 'react'
import hostId from '../constants/Constants';
import { useNavigate } from 'react-router-dom';
import { storeAuthToken } from '../constants/Constants';

function Login() {
    const [credentials, setCredentials] = useState({ "email": "", "password": "" });

    let navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.log('credentials', credentials);

        const json = await loginUserToDatabase(credentials);
        if (!json.success) {
            alert(json.error);
            return;
        }

        const authToken = json.authToken;
        storeAuthToken(authToken);

        navigate("/");
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }


    const loginUserToDatabase = async (credentials) => {
        const response = await fetch(`${hostId}/api/auth/login/`,
            {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials)
            });

        const json = await response.json();

        return json;
    }

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <form onSubmit={(e) => handleOnSubmit(e)}>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email}
                        onChange={(e) => onChange(e)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password"
                        value={credentials.password} onChange={(e) => onChange(e)} />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login