import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { isAuthenticated, signup, signin, authenticate } from "../backendjoin/auth";
import '../css/login.css'
export default function Login() {
    const [ValuesLog, setLogValues] = useState({
        email: "",
        password: "",
        ErrorL: "",
        loading: false,
        didRedirect: false
    })

    const { email, password, ErrorL, loading, didRedirect } = ValuesLog
    const handleLogChange = name => event => {
        setLogValues({ ...ValuesLog, error: false, [name]: event.target.value })
    }
    const didRedirectlogin = () => {
        if (didRedirect) {
            console.log("user", user)
            if (user) {
                return (
                    <Navigate to={`/user`} />
                )
            }
            else {
                return (
                    <Navigate to="/" />
                )
            }

        }

    }
    const errorLogin = () => {
        return (
            <div classNameName="mt-4 row">
                <div classNameName="col-md-6 offset-sm-3 text-left">
                    <div classNameName="alert alert-danger"
                        style={{ display: ErrorL ? "" : "none" }}>
                        Incorrect username or password
                    </div>
                </div>
            </div>
        )
    }
    const { user } = isAuthenticated()
    console.log(user)
    const Login = (event) => {
        event.preventDefault();
        setLogValues({ ...ValuesLog, ErrorL: false, loading: true })
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setLogValues({ ...ValuesLog, ErrorL: data.error, loading: false })
                }
                else {
                    authenticate(data, () => {
                        setLogValues({
                            ...ValuesLog,
                            didRedirect: true
                        })
                    })
                }
            })
            .catch(console.log("error in the signin"))
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

                                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                            <p className="text-white-50 mb-5">Please enter your login and password!</p>
                                            <div className="form-outline form-white mb-4">
                                                <input type="email"
                                                    className="form-control form-control-lg"
                                                    value={email}
                                                    onChange={handleLogChange("email")} />
                                                <label className="form-label" for="typeEmailX">Email</label>
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="password"
                                                    className="form-control form-control-lg"
                                                    onChange={handleLogChange("password")}
                                                    value={password}
                                                />
                                                <label className="form-label" for="typePasswordX">Password</label>
                                            </div>
                                            <button
                                                onClick={Login}
                                                className="btn btn-outline-light btn-lg px-5"
                                                type="submit">Login</button>


                                        </div>
                                    </form>
                                    <div>
                                        <p className="mb-0">Don't have an account? <Link to="/signin">Signin</Link>
                                        </p>
                                    </div>
                                    {didRedirectlogin()}
                                    {errorLogin()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}