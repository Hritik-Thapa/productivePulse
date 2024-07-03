import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app, auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeUser } from "../redux/user.js";

const GoogleAuth = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSignIn(e) {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const data = {
      username: result.user.displayName,
      email: result.user.email,
      google: true,
    };
    console.log(data);
    const res = await fetch("api/auth/signin/google", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
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
  return (
    <button
      onClick={handleSignIn}
      className="bg-red-800 text-white rounded-lg w-[100%] p-3 text-xl title"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleAuth;
