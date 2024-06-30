import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Stopwatch, Timer, Clock, Header, Modes } from "./components";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import "./App.css";
import Todolist from "./conatainers/todolist";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="bg-background flex flex-col items-center min-h-[100vh]">
        <Header />
        <div className="flex flex-row justify-evenly items-center w-4/5 ">
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Timer />} />
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
