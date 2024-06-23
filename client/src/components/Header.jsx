import { current } from "@reduxjs/toolkit";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <header className="flex items-center justify-around mx-auto">
      <Link to="/">
        <p className="text-5xl text-white font-bold text-right title p-7">
          Productive<span className="text-customPinkDarker">Pulse</span>
        </p>
      </Link>
      {currentUser ? (
        <p className="text-white title border p-3 rounded-lg bg-customPink">
          {currentUser.username}
        </p>
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
