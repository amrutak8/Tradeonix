import React, { useState } from "react";
import axios from ".../axiosConfig.js";
import "../auth.css";


function Signup() {
  const [error, setError] = useState("");

  const [form, setForm] = useState({
  username: "",
  email: "",
  password: ""
});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSignup = async () => {

  if (!form.email.includes("@")) {
    setError("Enter valid email");
    return;
  }

  if (form.username.length < 3) {
    setError("Username too short");
    return;
  }

  if (form.password.length < 6) {
    setError("Password must be 6+ characters");
    return;
  }

  try {
    const res = await axios.post("/api/signup", form);

      
      localStorage.setItem("token", res.data.token);

     
      localStorage.setItem("user", JSON.stringify(res.data.user));

      
      window.location.href =
        "https://tradeonix-dashboard.vercel.app";;

  } catch (err) {
     setError(err.response?.data?.message || "Signup failed");
  }
};

  return (
    <div className="signupPageWrapper">

  <div className="topSection">
    <h1 className="topHeading">
      Open a free demat and trading account online
    </h1>
    <p className="topSubText">
      Start investing brokerage free and join a community of investors and traders
    </p>
  </div>

    <div className="signupPage">
   
      {/* LEFT IMAGE */}
      <div className="leftSection">
        <img src="/media/images/signup.svg" alt="Signup" />
      </div>

      {/* RIGHT FORM */}
      <div className="rightSection">
        <h2>Signup now</h2>
        <p className="subText">Start your trading journey</p>

        <input
         name="username"
         placeholder="Enter your username"
         onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Enter password"
          onChange={handleChange}
        />

        {error && <p className="errorText">{error}</p>}
        <button onClick={handleSignup}>Create Account</button>

        <p className="loginLink">
          Already have account? <a href="/login">Login</a>
        </p>
      </div>

    </div>
    </div>
  );
}

export default Signup;