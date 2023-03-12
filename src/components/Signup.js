import React, { useState } from 'react'
import hostId from '../constants/Constants';
import { useNavigate, redirect } from 'react-router-dom';
import { storeAuthToken } from '../constants/Constants';

function Signup() {

  const [credentials, setCredentials] = useState({ "name": "", "email": "", "password": "", "cpassword": "" });

  let navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // console.log('credentials', credentials);

    if (credentials.password.length < 5) {
      alert("Password should be atleast 5 charecters !!");
      return;
    }
    if (credentials.password !== credentials.cpassword) {
      alert("Password and confirm password should be same !!");
      return;
    }

    const json = await registerUserToServer(credentials);
    console.log('json', json);

    if (!json.success) {
      alert(json.error);
    }

    const authToken = json.authToken;
    storeAuthToken(authToken);

    // console.log('authToken', authToken);
    // window.location.reload(true);
    navigate("/");
  }

  const registerUserToServer = async (credentials) => {
    const { name, email, password } = credentials;


    const response = await fetch(`${hostId}/api/auth/createuser`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password })
      });

    const json = await response.json();

    return json;
  }

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <form onSubmit={(e) => handleOnSubmit(e)}>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={credentials.name}
            onChange={(e) => onChange(e)} />
        </div>

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


        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword"
            value={credentials.cpassword} onChange={(e) => onChange(e)} />
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}

export default Signup