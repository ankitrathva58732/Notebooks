import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { name, email, password, cpassword } = credentials;

        if (password !== cpassword) {
            alert("Passwords do not match");
            return;
        }

        const response = await fetch("http://localhost:5000/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Account Created Successfullly", "success");
        } else {
            props.showAlert("Invalid credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="container mt-3">
            <h1 className='my-2'>Create an account to use Notebook</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-2">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} placeholder="Enter Name" />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} placeholder="Enter email" />

                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} placeholder="Password" required />
                </div>

                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} placeholder="Confirm Password" required />
                </div>

                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    );
}

export default Signup;
