import React from "react";
import '../css/login.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import { isAuthenticated, signup, signin, authenticate } from "../backendjoin/auth";
export default function SignIn(){

    const [Values, setValues] = useState({
        Email: "",
        Password: "",
        Phone: "",
        Name: "",
        error: "",
        success: false
    })
    const { Email, Password,  Phone, Name, error, success } = Values
    const handleChange = name => event => {
        setValues({ ...Values, error: false, [name]: event.target.value })
    }
    const successSignup = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success"
                        style={{ display: success ? "" : "none" }}>
                        New account was created successfully
                    </div>
                </div>
            </div>
        )
    }
    const errorSignup = () => {
        return (
            <div className="mt-4 row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}>
                        {error}
                    </div>
                </div>
            </div>
        )
    }
    const SignUp = event => {
        event.preventDefault();
        setValues({ ...Values, error: false })
        signup({ Email, Password, Phone, Name })
            .then(data => {
                console.log("data", data)
                if (data.errors) {
                    setValues({
                        ...Values,
                        error: data.errors[0].msg,
                        success: false
                    })
                }
                else {
                    setValues({
                        Email: "",
                        Password: "",
                        Name: "",
                        Phone: "",
                        error: "",
                        success: true
                    })
                }
            })
            .catch(console.log('error in the signup'))
    }

    return (
        <>

        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1 rem' }}>
                            <div className="card-body p-5 text-center">
                                <form>
                                    <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                           
                                    <div className="form-outline form-white mb-4">
                                            <input type="text"
                                                className="form-control form-control-lg"
                                                onChange={handleChange("Name")}
                                                value={Name}
                                            />
                                            <label className="form-label" for="typePasswordX">Name</label>
                                        </div>
                                        
                                        <div className="form-outline form-white mb-4">
                                            <input type="number"
                                                className="form-control form-control-lg"
                                                onChange={handleChange("Phone")}
                                                value={Phone}
                                            />
                                            <label className="form-label" for="typePasswordX">Phone</label>
                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <input type="email"
                                                className="form-control form-control-lg"
                                                value={Email}
                                                onChange={handleChange("Email")} />
                                            <label className="form-label" for="typeEmailX">Email</label>
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input type="password"
                                                className="form-control form-control-lg"
                                                onChange={handleChange("Password")}
                                                value={Password}
                                            />
                                            <label className="form-label" for="typePasswordX">Password</label>
                                        </div>
                                        
                                        <button
                                            onClick={SignUp}
                                            className="btn btn-outline-light btn-lg px-5"
                                            type="submit">Sign Up</button>

                                    </div>
                                </form>
                                <div>
                                    <p className="mb-0">Already have an account? <Link to="/">Login</Link>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>

    )
}