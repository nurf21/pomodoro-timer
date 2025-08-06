import { useState, useEffect, useRef } from "react";

export function usePomodoroTimer(
  config = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
    sessionsBeforeLongBreak: 4,
  }
) {
  const [timeLeft, setTimeLeft] = useState(config.work);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState("work"); // 'work' | 'shortBreak' | 'longBreak'
  const [completedSessions, setCompletedSessions] = useState(0);

  const intervalRef = useRef(null);

  // Start timer
  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  // Pause timer
  const pause = () => {
    setIsRunning(false);
  };

  // Reset timer to current session default
  const reset = () => {
    pause();
    if (sessionType === "work") setTimeLeft(config.work);
    if (sessionType === "shortBreak") setTimeLeft(config.shortBreak);
    if (sessionType === "longBreak") setTimeLeft(config.longBreak);
  };

  // Switch sessions automatically
  const switchSession = () => {
    if (sessionType === "work") {
      const newSessions = completedSessions + 1;
      setCompletedSessions(newSessions);
      if (newSessions % config.sessionsBeforeLongBreak === 0) {
        setSessionType("longBreak");
        setTimeLeft(config.longBreak);
      } else {
        setSessionType("shortBreak");
        setTimeLeft(config.shortBreak);
      }
    } else {
      setSessionType("work");
      setTimeLeft(config.work);
    }
  };

  // Timer effect
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      switchSession();
      setIsRunning(false); // Stop until user restarts
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  return {
    timeLeft,
    isRunning,
    sessionType,
    completedSessions,
    start,
    pause,
    reset,
  };
}
