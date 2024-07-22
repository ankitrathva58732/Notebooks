// import React, { useState } from 'react'
// import { useNavigate } from "react-router-dom";

// const Login = () => {


//     const [credentials, setCredentials] = useState({email:"",password:""});
//     let navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const response =  await fetch("http://localhost:5000/auth/login",{
//             method:'POST',
//             headers:{
//               'Content-Type':'application/json'
//             },
//             body: JSON.stringify({email: credentials.email,password:credentials.password })
//           });
//           const json = await response.json();
//           console.log(json);

//           if (json.success){
//             localStorage.setItem('token', json.authtoken);
//             navigate.push("/");

//           }
//           else{
//             alert("Invalid credentials");
//           }


        
//     }

    
//     const onChange = (e) => {
//         setCredentials({ ...credentials, [e.target.name]: e.target.value })
//         }


//   return (
//     <div>
//         <>
//         <h1>I am Login</h1>

//         <form onSubmit={handleSubmit}>
//   <div className="form-group">
//     <label htmlFor="email">Email address</label>
//     <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} placeholder="Enter email" />
//       </div>
//   <div className="form-group">
//     <label htmlFor="password">Password</label>
//     <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} placeholder="Password" />
//   </div>


//   <button type="submit" className="btn btn-primary" >Submit</button>
// </form>
//         </>
      
//     </div>
//   )
// }

// export default Login

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged in Successfullly", "success");
            navigate("/");
            
        } else {
            
            props.showAlert("Invalid credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='mt-3'>
            <>
                <h2>Login to continue to Notebook</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>
            </>
        </div>
    )
}

export default Login;

