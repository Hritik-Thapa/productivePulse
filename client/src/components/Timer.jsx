import React, { useEffect, useState } from "react";
import Countdown from "./countdown";
import ringing from "../resources/ringing.mp3";
import { useLocation } from "react-router-dom";
// import "./timer.css";

const Timer = () => {
  const [workTime, setWorkTime] = useState(25);
  const [restTime, setRestTime] = useState(5);
  const location = useLocation();
  const timeData = location.state;
  console.log(timeData);
  const [isWorking, setIsWorking] = useState(true);

  useEffect(() => {
    setTiming();
  }, [timeData]);

  const setTiming = () => {
    console.log("setTimeing", timeData?.work, timeData?.rest);
    if (timeData) setWorkTime(timeData?.work);
    else setWorkTime(25);
    if (timeData) setRestTime(timeData?.rest);
    else setRestTime(5);
  };

  console.log(`session=${workTime} rest:${restTime}`);
  let buzzer = new Audio(ringing);

  function isWorkingCallBack() {
    buzzer.play();
    if (restTime) {
      setIsWorking(!isWorking);
    }
  }

  return (
    <>
      <div className="bg-counterBg py-11  w-[50%] m-11 rounded-3xl drop-shadow h-auto">
        <p className="text-white text-5xl title font-semibold text-center">
          {restTime ? (isWorking ? "Work" : "Break") : "Timer"}
        </p>
        <Countdown
          time={isWorking ? workTime : restTime}
          statusChange={isWorkingCallBack}
        />
      </div>
    </>
  );
};

export default Timer;
