import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    try {
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.error);
        return;
      }
      setLoading(false);
      setError("");
      navigate("/signin");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(err.message);
    }
  }

  function handleFormChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  }

  return (
    <div className="felx flex-col gap-3 items-center mx-auto">
      <h1 className="text-4xl text-center  text-white title p-3">Sign Up</h1>
      <form className="mx-auto flex flex-col items-center gap-4 p-3 md:w-[500px]">
        <input
          type="text"
          placeholder="Username"
          className="border rounded-lg p-3 w-[100%] focus:outline-none"
          id="username"
          onChange={handleFormChange}
        />
        <input
          type="email"
          placeholder="E-mail"
          className="border rounded-lg p-3 w-[100%] focus:outline-none"
          id="email"
          onChange={handleFormChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded-lg p-3 w-[100%] focus:outline-none"
          id="password"
          onChange={handleFormChange}
        />
        <button
          disabled={loading}
          type="button"
          onClick={handleSubmit}
          className=" bg-customPinkDarker w-[100%] p-3 rounded-lg text-white text-xl text-center title hover:bg-customPink border border-customPinkDarker "
        >
          {loading ? "Loading" : "Sign up"}
        </button>
        <GoogleAuth/>
      </form>
      <p className="text-center text-gray-500">
        Already have an account?{" "}
        <Link
          to="/signin"
          className=" text-blue-500 hover:text-blue-700 hover:underline"
        >
          Sign in.
        </Link>
      </p>
      {error && (
        <p className="text-red-700 text-center p-3 underline">{error}</p>
      )}
    </div>
  );
};

export default Signup;
