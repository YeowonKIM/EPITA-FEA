import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

export const RegisterForm = () => {
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [message, setMessage] = useState("")

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    city: "", 
    street: "" 
  })

  const togglePassword = (event) => {
        event.preventDefault();

        setShowPass(!showPass)
    }
  
  const toggleConfirmPassword = () => {
    setShowConfirmPass((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      setMessage("Passwords do not match.")
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });

    if (res.ok) {
        setMessage("Successfully Registered.");
        setUser({
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
          city: "",
          street: ""
        });
      } else {
        const data = await res.json();
        setMessage(data?.error || "Registration failed");
      }
    } catch (err) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <React.Fragment>
      <>
        <div className='inputs-container'>
          <div className='input-container'> 
            {/* email*/}
            <label className='email'>email</label>
            <input
              type='text'
              className='email'
              onChange={(e) => setUser({
                ...user,
                email: e.target.value
              })}
            ></input>
          </div>
        </div>
        
      {/* username */}
      <div className='input-container'> 
        <label>Username</label>
        <input
          type='text'
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </div>

      {/* password */}
      <div className='input-container' style={{ position: "relative"}}> 
        <label>Password</label>
        <input
          type={showPass ? "text" : "password"}
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <span onClick={(e) => togglePassword(e)} style={{cursor: "pointer"}}>
          <span>
              {showPass ? (
                  <FontAwesomeIcon icon={faEye} className='customIcon' />
              ) : (
                  <FontAwesomeIcon icon={faEyeSlash} className='customIcon' />
              )
          }
          </span>
      </span>
      </div>

      {/* confirm password */}
      <div className='input-container' style={{ position: "relative"}} >
        <label>Confirm Password</label>
        <input
          type={showConfirmPass ? "text" : "password"}
          value={user.confirmPassword}
          onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
        />
        <span onClick={(e) => toggleConfirmPassword(e)} style={{cursor: "pointer"}}>
          <span>
              {showConfirmPass ? (
                  <FontAwesomeIcon icon={faEye} className='customIcon' />
              ) : (
                  <FontAwesomeIcon icon={faEyeSlash} className='customIcon' />
              )
          }
          </span>
      </span>
      </div>

      {/* city/street */}
      <div className='inputs-container'>
        <div className='input-container'>
          <label>City</label>
          <input
            type='text'
            value={user.city}
            onChange={(e) => setUser({ ...user, city: e.target.value })}
          />
        </div>
        <div className='input-container'>
          <label>Street</label>
          <input
            type='text'
            value={user.street}
            onChange={(e) => setUser({ ...user, street: e.target.value })}
          />
        </div>
      </div>

      {/* submit button */}
     <button type="submit" className='submit' onClick={handleSubmit}>
        Submit
      </button>

      {/* Message */}
      <span style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        {message}
      </span>
    </>
  </React.Fragment>
  );
};

export default RegisterForm;