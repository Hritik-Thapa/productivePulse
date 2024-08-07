import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "../redux/user.js";
import { useNavigate } from "react-router-dom";
const Addmode = ({ close }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    work: 25,
    rest: 5,
  });
  const [pomo, setPomo] = useState("pomodoro");
  const [error, setError] = useState("");

  function handleTimeChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  }
  function handleTypeChange(e) {
    setPomo(e.target.value);
    if( pomo==="pomodoro" )setFormData({...formData, rest: null})
    console.log(pomo);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`/api/user/addMode/${currentUser?._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    try {
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        return
      }
      dispatch(changeUser(data));
      close();
    } catch (err) {
      if(err.errorCode==="C444") navigate('/singin')
      setError(err.message);
    }
  }

  return (
    <div>
      <form
        // onSubmit={handleSubmit}
        className="bg-modes p-4 flex flex-col rounded-xl text-white gap-3 "
      >
        <label className="text-xl">Type</label>
        <select
          onChange={handleTypeChange}
          id="type"
          className="bg-modes border border-white text-lg rounded-md p-3 text-center focus:outline-none"
        >
          <option value="pomodoro">Pomodoro</option>
          <option value="timer">Timer</option>
        </select>
        <label className="text-xl">Work</label>
        <input
          type="number"
          value={formData.work}
          min={5}
          step={5}
          onChange={handleTimeChange}
          id="work"
          className="bg-modes border border-white text-lg rounded-md p-3 font-semibold focus:outline-none"
        />
        {pomo === "pomodoro" && (
          <>
            <label className="text-xl">Rest</label>
            <input
              type="number"
              value={formData.rest}
              min={5}
              step={5}
              onChange={handleTimeChange}
              id="rest"
              className="bg-modes border border-white text-lg rounded-md p-3 font-semibold focus:outline-none"
            />
          </>
        )}
        <button
          type="submit"
          className="p-3 text-xl border border-white rounded-md hover:bg-customPinkDarker m-3"
          onClick={handleSubmit}
        >
          Add Mode
        </button>
      {error && (<p className="text-red-700 text-center p-2">{error}</p>)}
      </form>
    </div>
  );
};

export default Addmode;
