import React, { useEffect, useState } from "react";
import Countdown from "./countdown";
import ringing from "../resources/ringing.mp3";
import { useLocation } from "react-router-dom";
// import "./timer.css";

const Timer = () => {
  const location = useLocation();
  const timeData = location.state;

  const [workTime, setWorkTime] = useState(25);

  let buzzer = new Audio(ringing);

  useEffect(() => {
    setTiming();
    return ()=>{
      console.log('useeffect cleanup')
    }
  }, [timeData]);

  const setTiming = () => {
    if (timeData) setWorkTime(timeData?.work);
  };

  function timerCallback() {
    buzzer.play();
  }
  return (
    <>
      <div className="bg-counterBg py-11  w-1/2 w-max-[50%]  m-11 rounded-3xl drop-shadow h-auto">
        <p className="text-white text-5xl title font-semibold text-center">
          Timer
        </p>
        <Countdown
          time={workTime}
          statusChange={timerCallback}
          toContinue={false}
        />
      </div>
    </>
  );
};

export default Timer;
