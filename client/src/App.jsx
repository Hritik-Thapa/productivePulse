import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Stopwatch, Timer, Clock, Header, Modes } from "./components";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-background h-screen ">
      <BrowserRouter>
        <Header />
        <div className="flex flex-row justify-evenly">
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
      </BrowserRouter>
    </div>
  );
}

export default App;
