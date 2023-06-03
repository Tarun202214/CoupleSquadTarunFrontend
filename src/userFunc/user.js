import React from "react";
import '../css/login.css';
import { BACKEND } from "../backendjoin/backend";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { isAuthenticated, signout, updateUser } from "../backendjoin/auth";
export default function UserProf() {
  const { user, Token } = isAuthenticated();
  const navigate = useNavigate()
  const [Values, setValues] = useState({
    Email: user.Email,
    Password: user.Password,
    Phone: user.Phone,
    Name: user.Name,
    error: "",
    success: false
  })

  const { Email, Password, Phone, Name, error, success } = Values
  const handleChange = name => event => {
    setValues({ ...Values, error: false, [name]: event.target.value })
  }
  const successUpdate = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-success"
            style={{ display: success ? "" : "none" }}>
            New update was done successfully
          </div>
        </div>
      </div>
    )
  }
  const errorUpdate = () => {
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
  const Update = event => {
    event.preventDefault();
    setValues({ ...Values, error: false })
    return axios.put(
      `${BACKEND}/update/${user._id}`,
      { Email, Password, Phone, Name },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${Token}`
        }
      },
    ).then(response => {
      updateUser(response.data)
      setValues({ ...Values, error: false, success: true })
    }
    ).catch(err => console.log("err", err))
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
                      <h2 className="fw-bold mb-2 text-uppercase">Your Profile</h2>

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
                        <input type="text"
                          className="form-control form-control-lg"
                          onChange={handleChange("Password")}
                          value={Password}
                        />
                        <label className="form-label" for="typePasswordX">Password</label>
                      </div>

                      <button
                        onClick={Update}
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit">Update</button>
                    </div>
                  </form>

                  <button
                    onClick={() => {signout();navigate("/");}}
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit">Signout</button>
                  <div>
                    {
                      successUpdate()
                    }
                    {
                      errorUpdate()
                    }
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