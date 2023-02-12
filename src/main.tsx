import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const startBreakTime = 5;
const startSessionTime = 25;
const startTime = startSessionTime * 60;

function App() {
  const [breakLength, setBreakLength] = useState(startBreakTime);
  const [sessionLength, setSessionLength] = useState(startSessionTime);
  const [runTime, setRunTime] = useState(startTime);
  const [time, setTime] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [isStopped, setIsStopped] = useState(false);

  const handlePlay = () => {
    setIsStopped((prev) => !prev);
  };

  useEffect(() => {
    let minutes = String(Math.trunc(startTime / 60));
    let seconds = String(startTime % 60);

    if (minutes.length === 1) minutes = "0" + minutes;
    if (seconds.length === 1) seconds = "0" + seconds;

    setTime(minutes + ":" + seconds);
  }, []);

  useEffect(() => {
    if (!isStopped) {
      setInterval(runCountDown, 500);
      renderTime();
    }
    if (runTime === 0) {
      console.log("Zuende!!!");
    }
  }, [isStopped]);

  const runCountDown = () => {
    setRunTime((prev) => (prev -= 1));
  };

  const renderTime = () => {
    let minutes = String(Math.trunc(runTime / 60));
    let seconds = String(runTime % 60);

    if (minutes.length === 1) minutes = "0" + minutes;
    if (seconds.length === 1) seconds = "0" + seconds;

    setTime(minutes + ":" + seconds);
  };

  return (
    <div className="container">
      <h1>25 + 5 Clock</h1>
      <div className="break">
        <h2 id="break-label">Break Length</h2>
        <button id="break-decrement"></button>
        <span id="break-length">{breakLength}</span>
        <button id="break-increment"></button>
      </div>
      <div className="session">
        <h2 id="session-label">Session Length</h2>
        <button id="session-decrement"></button>
        <span id="session-length">{sessionLength}</span>
        <button id="session-increment"></button>
      </div>
      <div className="timer">
        <h2 id="timer-label">Session</h2>
        <div id="time-left">{time}</div>
      </div>
      <div className="buttons">
        <button id="start_stop" onClick={handlePlay}>
          Play
        </button>
        <button id="reset"></button>
      </div>
    </div>
  );
}
