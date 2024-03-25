import React, { useState } from "react";
import {useCookies} from  'react-cookie';
import logo from "../images/echotunes-high-resolution-logo-transparent.png";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie,setCookie] = useCookies(["token"]);
  // const [fName, setFName] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    const data = { email, password };
    try {
      const response = await makeUnauthenticatedPOSTRequest(
        "/auth/login",
        data
      );
      if (response && !response.error) {
        const token = response.token;
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setCookie("token", token, { path: "/", expires: date });
        alert("Log In successful.");
        navigate("/home");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
        <div
          className="d-flex flex-column"
          style={{
            width: "50%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{ width: "405px", height: "100px" }}
            src={logo}
            alt="EchoTunes Logo"
          />
          <div>
            <h1 className="my-4" style={{ fontWeight: "bold" }}>
              Log in to Continue
            </h1>
          </div>
        </div>
        <div
          className="d-flex flex-column"
          style={{
            width: "50%",
            height: "100%",
            backgroundColor: "black",
            justifyContent: "center",
          }}
        >
        <form onSubmit={login}>
          <div
            className="p-4 d-flex flex-column"
            style={{
              marginLeft: "70px",
              marginRight: "70px",
              backgroundColor: "beige",
              borderRadius: "20px",
              height: "400px",
              alignItems: "center",
            }}
          >
            <TextInput
              label="Email Id or Username"
              placeholder="Enter your email id or username"
              className="my-2"
              value={email}
              setValue={setEmail}
            />
            <PasswordInput label="Password" placeholder="Enter Password" value={password} setValue={setPassword} />
            <button
            type="submit"
              className="m-4 p-2 px-4"
              style={{
                borderRadius: "20px",
                fontWeight: "bold",
                backgroundColor: "rgb(30,215,96)",
              }}
            //   onClick={(e) =>{
            //     e.preventDefault();
            //     login();
            //   }}
            >
              LOG IN
            </button>
            <div className="w-75 border border-success"></div>
            <div
              style={{ fontWeight: 600, fontSize: "large" }}
              className="my-3"
            >
              Don't have an Account ?
            </div>
            <div
              style={{
                borderRadius: "20px",
                fontWeight: "500",
                backgroundColor: "white",
                textDecoration: "none",
              }}
              className="my-2 p-2 px-4 border border-success"
            >
              <Link style={{ textDecoration: "none" }} to="/signup">
                Sign Up to EchoTunes
              </Link>
            </div>
          </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
