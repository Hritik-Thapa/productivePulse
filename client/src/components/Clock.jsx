import React, { useEffect, useState } from "react";

const Clock = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setInterval(() => {
      let time = new Date();
      setHours(time.getHours().toString().padStart(2, 0));
      setMinutes(time.getMinutes().toString().padStart(2, 0));
      setSeconds(time.getSeconds().toString().padStart(2, 0));
    }, 1000);
    return () => {
      clearInterval;
    };
  }, []);

  if (!hours) return "Loading...";

  function handleFullScreen() {}

  return (
    <div className="bg-counterBg py-11  w-1/2 w-max-[50%]  m-11 rounded-3xl drop-shadow h-auto title text-white text-[8vw] font-bold text-center p-2">
      <p className="text-white text-5xl title font-semibold text-center">
        Clock
      </p>
      <div className="my-5">
        {`${hours}:`}
        {`${minutes}:${seconds}`}
      </div>
    </div>
  );
};

export default Clock;
