// src/pages/Signup.js
import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import { signupUser } from "../../api/userApi.js";
import "./Signup.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignupUser = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (email === "") {
      toast.warning("Email not found!");
      return;
    } else if (name === "") {
      toast.warning("Name not found");
      return;
    } else if (password === "" || password.length < 3) {
      toast.warning("Please enter a strong password");
      return;
    }

    const userData = {
      name,
      email,
      password,
    };

    // make the api call
    const response = await signupUser(userData);

    if (response.status === 201) {
      toast.success("Singup successful, login to your account");
      navigate("/login");
    } else {
      toast.error(response.data.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="auth">
        <h2>Signup</h2>
        <form>
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" onClick={handleSignupUser}>
            {loading ? "loading..." : "Signup"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;