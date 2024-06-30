import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import Addmode from "../components/Addmode.jsx";
import { changeUser } from "../redux/user.js";

const Modes = () => {
  const [toDisplay, setToDisplay] = useState(true);
  const [deleteError, setDeleteError] = useState(false);
  const popupRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect");

    if (location.pathname === "/signin" || location.pathname === "/signup") {
      handleDisplayChange(false);
    } else {
      handleDisplayChange(true);
    }
  }, [location.pathname]);

  const handleDisplayChange = (value) => {
    setToDisplay(value);
  };

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const modes = currentUser?.customModes;

  const handleDeleteMode = async (modeId) => {
    const res = await fetch(
      `api/user/deleteMode/${currentUser._id}?modeId=${modeId}`,
      {
        method: "DELETE",
      }
    );

    try {
      const data = await res.json();
      if (data.success === false) {
        setDeleteError(true);
        return;
      }
      dispatch(changeUser(data));
      navigate("/");
    } catch (error) {
      setDeleteError(true);
    }
  };

  const addButton = () => {
    return (
      <button
        to="/add"
        className="border-white py-2 px-8 border border-dashed title text-white text-2xl hover:bg-modesHover hover:scale w-full text-center"
      >
        <p className="hover:scale-110">+</p>
      </button>
    );
  };

  const closePopup = () => {
    popupRef.current?.close();
  };

  if (!toDisplay) return null;

  return (
    <>
      <div className="hidden lg:block">
        <div className="flex flex-col gap-3 bg-modes p-3 items-center max-w-[300px] h-auto ">
          <h1 className="text-4xl title font-bold text-white">Modes</h1>
          <Link
            to="/"
            state={{ work: 25, rest: 5 }}
            className="border-white py-2 px-8 border title text-white text-2xl hover:bg-modesHover hover:scale w-full"
          >
            <p className="hover:scale-110">Pomodoro</p>
          </Link>
          <Link
            to="/timer"
            state={{ work: 25, rest: null }}
            className="border-white py-2 px-8 border title text-white text-center text-2xl hover:bg-modesHover hover:scale w-full"
          >
            <p className="hover:scale-110">Timer</p>
          </Link>
          <Link
            to="/stopwatch"
            className="border-white py-2 px-8 border title text-white text-2xl hover:bg-modesHover hover:scale w-full"
          >
            <p className="hover:scale-110">Stopwatch</p>
          </Link>
          <Link
            to="/clock"
            className="border-white py-2 px-8 border title text-white text-2xl hover:bg-modesHover hover:scale w-full text-center"
          >
            <p className="hover:scale-110">Clock</p>
          </Link>

          {modes &&
            modes.length > 0 &&
            modes.map((mode) => {
              // console.log(typeof mode.rest);
              return (
                <Link
                  to="/"
                  state={{ work: mode.work, rest: mode.rest }}
                  key={mode._id}
                  className="border-white py-2 px-8 border title text-white text-xl hover:bg-modesHover hover:scale w-full customModeBtn flex flex-col items-center relative"
                >
                  <p className="hover:scale-110 text-center">
                    {mode.rest ? "Pomodoro" : "Timer"}
                  </p>
                  <p className="text-center text-sm">
                    {mode.work}
                    {mode.rest ? "/" + mode.rest : ""}
                  </p>
                  <button
                    onClick={() => handleDeleteMode(mode._id)}
                    className="customModeDeleteBtn absolute right-2 top-2 h-4 w-4 rounded-full text-white opacity-0 flex items-center justify-center"
                  >
                    x
                  </button>
                </Link>
              );
            })}
          {currentUser && (
            <Popup
              trigger={addButton}
              modal
              position="center center"
              ref={popupRef}
            >
              <Addmode close={closePopup} />
            </Popup>
          )}
        </div>
      </div>
    </>
  );
};

export default Modes;
