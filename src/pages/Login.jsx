import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const submit = (data) => {
    axios
      .post(
        "https://ecommerce-api-react.herokuapp.com/api/v1/users/login",
        data
      )
      .then((res) => {
        navigate("/");

        localStorage.setItem("token", res.data.data.token);
      })
    

      .catch((error) => {
        console.log(error);
        if (error.response.status === 404) {
          alert("Credenciales inválidas");
  
           
        }
        console.log(error.response);
      });
    reset({
      email: "",
      password: "",
    });
  };

  return (
    <div>
     
      <section className="container-login">
   
        <form onSubmit={handleSubmit(submit)}  className="login-box-body">
          <p  style={{marginTop:"80px"}}>Please login to your account</p>

          <div className="form-outline mb-4">
            <input
              type="email"
              id="form2Example11"
              className="form-control"
              placeholder=""
              {...register("email")}
            />
            <label className="form-label" htmlFor="form2Example11">
              Username
            </label>
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2"
              className="form-control"
              {...register("password")}
            />
            <label className="form-label" htmlFor="form2">
              Password
            </label>
          </div>

          <div className="text-center pt-1 mb-5 pb-1">
            <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">
              Log in
            </button>
            {/* <a className="text-muted" >
              Forgot password?
            </a> */}
          </div>

          <div className="d-flex align-items-center justify-content-center pb-4">
            <p className="mb-0 me-2">Don't have an account?</p>
            <button type="button" className="btn btn-outline-danger">
              Create new
            </button>
          </div>
        </form>
    
      </section>
    </div>
  );
};

export default Login;
