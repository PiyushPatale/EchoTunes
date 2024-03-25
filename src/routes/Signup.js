import {React, useState} from "react";
import {useCookies} from  'react-cookie';
import logo from "../images/echotunes-high-resolution-logo-transparent.png";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link , useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelper";
// import { useHistory } from 'react-router-dom';
// import { navigate } from 'gatsby'; 

const Signup = () => {

    const [email,setEmail] = useState("");
    const [confirmEmail, setConfirmEmail]  = useState("");
    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [cookie,setCookie] = useCookies(["token"]);
    const navigate = useNavigate();
    // const history = useHistory();


    const signUp = async (e)=>{
      e.preventDefault();
        if(email !== confirmEmail)
        {
            alert("Check Email again");
            return;
        }

        const data = {email, username, firstName, lastName, password};
        try {
          const response = await makeUnauthenticatedPOSTRequest("/auth/register" ,data);
          if (response && !response.error) {
            const token = response.token;
            // console.log(token);
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token" , token ,{path:"/" , expires:date}) ;
            alert("Signup successful.");
            // navigate('/home');
            // console.log(response);
            navigate('/home', { response });
          } else {
            alert("Signup failed. Please try again.");
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
            <h1
              className="my-4"
              style={{ fontWeight: "550", color: "#4798fe" }}
            >
              Sign Up For Free{" "}
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
          <form onSubmit={signUp}>
          <div
            className="p-4 d-flex flex-column"
            style={{
              marginLeft: "60px",
              marginRight: "60px",
              backgroundColor: "beige",
              borderRadius: "20px",
              height: "660px",
              alignItems: "center",
            }}
          >
            <TextInput
              label="Email Address"
              placeholder="Enter your Email "
              className="my-2"
              value={email}
              setValue={setEmail}
            />
            <TextInput
              label="Confirm Email Address"
              placeholder="Confirm Email address"
              className="my-2"
              value={confirmEmail}
              setValue={setConfirmEmail}
            />
            <TextInput
              label="Username"
              placeholder="Confirm Username"
              className="my-2"
              value={username}
              setValue={setUsername}
            />
             <PasswordInput
              label=" Create Password"
              placeholder="Enter Strong Password"
              className="my-2"
              value={password}
              setValue={setPassword}
            /> 
            <div style={{width:'100%' , display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <TextInput
                label="First Name"
                placeholder="Enter First Name"
                className="my-2"
                value={firstName}
                setValue={setFirstName}
                />
                <TextInput
                label="Last Name"
                placeholder="Enter Last Name"
                className="my-2"
                value={lastName}
                setValue={setLastName}
                />  
              </div>
            <button
              className="m-4 p-2 px-4"
              type="submit"
              style={{
                borderRadius: "20px",
                fontWeight: "bold",
                backgroundColor: "rgb(30,215,96)",
              }}
              //  onClick={(e) =>{
              //   // e.preventDefault();
              //   signUp();
              // }}
            >
              SIGN UP
            </button>
            <div className="w-75 border border-success"></div>
            <div
              style={{ fontWeight: 600, fontSize: "large" }}
              className="my-3"
            >
              Already Have an Account ?
            </div>
            <div
              style={{
                borderRadius: "20px",
                fontWeight: "500",
                backgroundColor: "white",
                color: "black",
              }}
              className="my-2 p-2 px-4 border border-success"
            >
              <Link style={{ textDecoration: "none" }} to="/login">
                LOG IN
              </Link>
            </div>
          </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
