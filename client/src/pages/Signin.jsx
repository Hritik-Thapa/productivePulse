import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changeUser } from "../redux/user";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    const res = await fetch("/api/auth/signin", {
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
      dispatch(changeUser(data));
      navigate("/");
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
      <h1 className="text-4xl text-center  text-white title p-3">Sign in</h1>
      <form className="mx-auto flex flex-col items-center gap-4 p-3 md:w-[500px]">
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
          className=" bg-customPinkDarker w-[100%] p-3 rounded-lg text-white text-2xl text-center title font-thin hover:bg-customPink border border-customPinkDarker "
        >
          {loading ? "Loading" : "Sign in"}
        </button>
      </form>
      <p className="text-center text-gray-500">
        Dont have an account?{" "}
        <Link
          to="/signup"
          className=" text-blue-500 hover:text-blue-700 hover:underline"
        >
          Sign up.
        </Link>
      </p>
      {error && (
        <p className="text-red-700 text-center p-3 underline">{error}</p>
      )}
    </div>
  );
};

export default Signin;
