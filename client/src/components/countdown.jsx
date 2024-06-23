import React, { useEffect, useRef, useState } from "react";
// import "./countdown.css";

const Countdown = ({ time, statusChange }) => {
  const [start, setStart] = useState(false);
  const [sec, setSec] = useState(time * 60);
  const displayRef = useRef(null);

  let timeDisplay = (remainingTime) => {
    let minutes = Math.floor(remainingTime / 60)
      .toString()
      .padStart(2, 0);
    let seconds = (remainingTime % 60).toString().padStart(2, 0);
    if (remainingTime === 0) {
      console.log("hi");
      statusChange();
      handleReset(false);
    }
    return `${minutes}:${seconds}`;
  };

  function handleStart() {
    setStart(true);

    displayRef.current = setInterval(() => {
      setSec((sec) => sec - 1);
    }, 1000);
  }

  function handlePause() {
    setStart(false);
    console.log("pause");
    clearInterval(displayRef.current);
  }

  function handleReset(reset) {
    if (reset) {
      setStart(false);
      setSec(time * 60);
      clearInterval(displayRef.current);
    } else {
      setSec(time * 60);
    }
  }

  useEffect(() => {
    setSec(time * 60);
  }, [time]);

  useEffect(() => {
    return () => clearInterval(displayRef.current);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <span className="text-white text-[10vw] font-bold text-center md:p-7 p-2">
        {timeDisplay(sec)}
      </span>
      <div className="text-[2vw] title text-white flex gap-[50px]">
        {!start ? (
          <button
            className="py-2 w-[10vw] border rounded-lg bg-white text-counterBg text-center drop-shadow-md "
            onClick={handleStart}
          >
            Start
          </button>
        ) : (
          <button
            className="py-2 w-[10vw] border rounded-lg bg-white text-counterBg text-center "
            onClick={handlePause}
          >
            Pause
          </button>
        )}
        <button
          className="py-2 w-[10vw] border rounded-lg bg-white text-counterBg text-center drop-shadow-md"
          onClick={() => handleReset(true)}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Countdown;
