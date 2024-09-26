import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Stopwatch, Timer, Clock, Header, Modes } from "./components";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import "./App.css";
import Todolist from "./containers/todolist";
import Pomodoro from "./components/Pomodoro";

function App() {

  return (
    <BrowserRouter>
      <div className="bg-background flex flex-col items-center min-h-[100vh]">
        <Header />
        <div className="flex flex-row justify-evenly items-center w-4/5 ">
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Pomodoro />} />
            <Route path="/timer" element={<Timer />} />

            <Route path="/stopwatch" element={<Stopwatch />} />
            <Route path="/clock" element={<Clock />} />
          </Routes>
          <Modes />
        </div>
        <Todolist />
      </div>
    </BrowserRouter>
  );
}

export default App;
