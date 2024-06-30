import React, { useRef, useState } from "react";

const Stopwatch = () => {
  const [startTime, setStartTime] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [start, setStart] = useState(false);
  let displayTime = {
    hours: 0,
    minutes: 0,
    sec: 0,
  };
  const [pausedTime, setPausedTime] = useState({
    hours: 0,
    minutes: 0,
    sec: 0,
  });
  const displayRef = useRef();

  function handleStart() {
    setStart(true);
    setStartTime(new Date().getTime());
    displayRef.current = setInterval(() => {
      const newTime = new Date().getTime();
      setCurrentTime(newTime);
    });
  }
  function handlePause() {
    setStart(false);
    setPausedTime(displayTime);
    clearInterval(displayRef.current);
  }
  function handleReset() {
    setStartTime(null);
    setStart(false);
    clearInterval(displayRef.current);
    setPausedTime({ hours: 0, minutes: 0, sec: 0 });
  }

  function timeDisplay() {
    const pausedTimeSec =
      pausedTime.hours * 3600 + pausedTime.minutes * 60 + pausedTime.sec;
    const time = new Date(currentTime - startTime) / 1000 || 0;
    const timeInSeconds = pausedTimeSec + time;

    displayTime.sec = Math.floor((timeInSeconds % 3600) % 60) || 0;
    displayTime.hours = Math.floor(timeInSeconds / 3600) || 0;
    displayTime.minutes = Math.floor((timeInSeconds % 3600) / 60) || 0;

    let sec = displayTime.sec.toString().padStart(2, 0).slice(-2);
    let hours = displayTime.hours.toString().padStart(2, 0).slice(-2);
    let minutes = displayTime.minutes.toString().padStart(2, 0).slice(-2);
    return (
      <div>
        {start
          ? displayTime.hours > 0
            ? `${hours}:${minutes}:${sec}`
            : `${minutes}:${sec}`
          : `${pausedTime.minutes.toString().padStart(2, 0)}:${pausedTime.sec
              .toString()
              .padStart(2, 0)}`}
      </div>
    );
  }
  return (
    <>
      <div className="bg-counterBg py-11  w-1/2 w-max-[50%]  m-11 rounded-3xl drop-shadow h-auto">
        <p className="text-white text-5xl title font-semibold text-center">
          Stopwatch
        </p>
        <div className="flex flex-col items-center">
          <span className="text-white text-[10vw] font-bold text-center md:p-7 p-2">
            {timeDisplay()}
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
      </div>
    </>
  );
};

export default Stopwatch;
