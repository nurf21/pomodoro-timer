import { useState, useEffect, useRef } from "react";

export function usePomodoroTimer(config) {
  const [timeLeft, setTimeLeft] = useState(config.work);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState("work"); // 'work' | 'shortBreak' | 'longBreak'
  const [completedSessions, setCompletedSessions] = useState(0);

  const intervalRef = useRef(null);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    pause();
    if (sessionType === "work") setTimeLeft(config.work);
    if (sessionType === "shortBreak") setTimeLeft(config.shortBreak);
    if (sessionType === "longBreak") setTimeLeft(config.longBreak);
  };

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

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      switchSession();
      setIsRunning(false);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  // 🔁 Watch for config changes and reset
  useEffect(() => {
    reset();
  }, [config]);

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
