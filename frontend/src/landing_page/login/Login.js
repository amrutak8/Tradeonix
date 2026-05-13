import React, { useState } from "react";
import "../auth.css"; 
import axios from "../axiosConfig";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleLogin = async () => {
  try {
    const res = await axios.post("/api/login", form);

    console.log("LOGIN RESPONSE:", res.data);

    if (!res.data.token) {
      alert("Login failed: No token received");
      return;
    }

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    window.location.href = "https://tradeonix-dashboard.vercel.app";

  } catch (err) {
    console.log(err);
    alert(err.response?.data?.message || "Login error");
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

        <div className="leftSection">
          <img src="/media/images/signup.svg" alt="Login" />
        </div>

       
        <div className="rightSection">
          <h2>Login</h2>
          <p className="subText">Enter your credentials</p>

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button onClick={handleLogin}>
            Login
          </button>

          <p className="loginLink">
            Don't have an account? <a href="/signup">Signup</a>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;