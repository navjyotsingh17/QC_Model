import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup= (props) => {

  //here i have defined a state for the user credentials and useNavigate hook
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const navigate = useNavigate();

  //below i have defined a onSubmit async method in which i am making a POST API request to the given url for user creation 
  const submitForm = async (e) => {
    e.preventDefault();
    const { username, password } = credentials // by doing destructuring we can pass the values present in the array in the body of the api request
    
    try {
      const response = await fetch("http://localhost:8085/api/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //sending name, email and password in the request body.
      body: JSON.stringify({ username: username, password: password })
    });

    //storing the json reponse got from the API.
    const json = await response.json();

    //checking if the json reponse contains success=true if yes then navigate user to login page, else show a alert. 
    if (json.success) {
      navigate("/login");
      props.showAlert("Account created successfully", "success");
    }
    else {
      props.showAlert("Invalid details", "danger");
    }
      
    } catch (error) {
      props.showAlert("Error while calling sign up API", "danger");
    }
  }

  const onChange = (e) => {

    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="form d-flex justify-content-center align-items-center p-5">
            <form
                onSubmit={submitForm}
                className="border border-black rounded-4 p-5"
                style={{ width: "450px", height: "500px" }}
            >

                <div className="mb-3 mt-5">
                    <label htmlFor="exampleInputUserName1" className="form-label">
                        User Name
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        style={{ width: "370px" }}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        style={{ width: "370px" }}
                        onChange={onChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary mt-4 rounded-pill"
                    style={{ height: "50px", width: "100px" }}
                >
                    Submit
                </button>

            </form>
        </div>
  )
}

export default Signup
