import React, { useEffect, useState } from "react";
import Countdown from "./countdown";
import ringing from "../resources/ringing.mp3";
import { useLocation } from "react-router-dom";
// import "./timer.css";

const Pomodoro = () => {
  const location = useLocation();
  const timeData = location.state;

  const [workTime, setWorkTime] = useState(25);
  const [restTime, setRestTime] = useState(5);
  const [isWorking, setIsWorking] = useState(true);
  const [toContinue, setToContinue]=useState(false)
  let buzzer = new Audio(ringing);

  useEffect(() => {
    console.log('timechange useeffect')
    setTiming();
    console.log(timeData);
    return ()=>{
      console.log('useeffect cleanup')
      
    }
  }, [timeData]);

  const setTiming = () => {
    if (timeData) setWorkTime(timeData?.work);
    if (timeData) setRestTime(timeData?.rest);
  };

  function isWorkingCallBack() {
    buzzer.play();
    if (restTime) {
      console.log('callback')
      setIsWorking(!isWorking);
      setToContinue(true)
    }
  }
  return (
    <>
      <div className="bg-counterBg py-11  w-1/2 w-max-[50%]  m-11 rounded-3xl drop-shadow h-auto">
        <p className="text-white text-5xl title font-semibold text-center">
          {restTime ? (isWorking ? "Work" : "Break") : "Timer"}
        </p>
        {console.log(isWorking,toContinue)}
        <Countdown
          time={isWorking ? workTime : restTime}
          statusChange={isWorkingCallBack}
          toContinue={toContinue}
          isWorking={isWorking}
        />
      </div>
    </>
  );
};

export default Pomodoro;
