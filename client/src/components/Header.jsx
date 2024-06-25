import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { logoutUser } from "../redux/user";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const popupRef = useRef();
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  async function handleSignOut() {
    popupRef.current.close();
    console.log("signout");

    const res = await fetch(`/api/user/logout/${currentUser._id}`);
    try {
      res.json().then((response) => {
        console.log(response);
        if (response.errorCode === "C4444") {
          navigate("/signin");
        }
        if (!response.ok) {
          dispatch(logoutUser());
          navigate("/signin");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <header className="flex items-center justify-around mx-auto">
      <Link to="/">
        <p className="text-5xl text-white font-bold text-right title p-7">
          Productive<span className="text-customPinkDarker">Pulse</span>
        </p>
      </Link>
      {currentUser ? (
        <Popup
          ref={popupRef}
          trigger={
            <p className="text-white title border p-3 rounded-lg bg-customPink cursor-pointer">
              {currentUser.username}
            </p>
          }
          position={"bottom center"}
          className="bg-customPink "
        >
          <button
            onClick={handleSignOut}
            className="bg-customPink text-center flex items-center justify-center w-[100%] p-2 rounded-md text-white font-semibold hover:bg-customPinkDarker"
          >
            SignOut
          </button>
        </Popup>
      ) : (
        <Link to="/signin">
          <p className="text-white border py-3 px-5 rounded-md text-md font-semibold hover:shadow-md cursor-pointer">
            SignIn
          </p>
        </Link>
      )}
    </header>
  );
};

export default Header;
