import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
    //below i have used the useState hooks to set the states with email and password as empty.
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    //navigate is use to navigate user to another page on an action
    const navigate = useNavigate();

    //below is the API request made to the backed where in the POST body i am sending the username and password from the credentilas state
    const submitForm = async (e) => {
        e.preventDefault(); // prevent the page against reloading

        try {

            const response = await fetch("http://localhost:8085/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: credentials.username,
                    password: credentials.password,
                }),
            });

            // putting the response from the API to a const, await is used to wait while the promise gets resolved.

            const json = await response.json();

            //checking if the the API response has success=true
            if (json.success === "true") {
                //save the auth token and redirect the user to home page with a alert
                localStorage.setItem("authToken", json.authToken);
                props.showAlert("Logged in successfully", "success");
                navigate("/");
            } else {
                props.showAlert("Invalid Credentials", "danger");
            }

        } catch (error) {
            console.error("Error while calling login API");
            props.showAlert("Error while calling login API", "danger");
        }
    };

    // for the user to see whats he is typing
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

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
                <div>
                    <Link className="m-2 text-body-secondary" to="/signup">
                        Don't have an account yet?
                    </Link>
                </div>
                <button
                    type="submit"
                    className="btn btn-outline-primary mt-4 rounded-pill"
                    style={{ height: "50px", width: "100px" }}
                >
                    Submit
                </button>

            </form>
        </div>
    );
};

export default Login;
