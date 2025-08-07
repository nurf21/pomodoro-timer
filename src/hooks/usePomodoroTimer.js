import { useState, useEffect, useRef } from "react";
import { saveState, loadState } from "../utils/storage";

export function usePomodoroTimer() {
  const stored = loadState();
  const [config, setConfig] = useState(
    stored?.config || {
      work: 25 * 60,
      shortBreak: 5 * 60,
      longBreak: 15 * 60,
      sessionsBeforeLongBreak: 4,
    }
  );

  const [timeLeft, setTimeLeft] = useState(() => {
    if (stored?.timeLeft && stored?.sessionType && stored?.config) {
      return stored.timeLeft;
    }
    return stored?.config?.work || 25 * 60;
  });

  const [isRunning, setIsRunning] = useState(false);

  const [sessionType, setSessionType] = useState(
    () => stored?.sessionType || "work"
  ); // 'work' | 'shortBreak' | 'longBreak'

  const [completedSessions, setCompletedSessions] = useState(
    () => stored?.completedSessions || 0
  );

  const intervalRef = useRef(null);
  const hasMounted = useRef(false);

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

  const skipSession = () => {
    switchSession();
    setIsRunning(false);
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
    if (hasMounted.current) {
      reset();
    } else {
      hasMounted.current = true;
    }
  }, [config]);

  useEffect(() => {
    saveState({
      config,
      sessionType,
      timeLeft,
      completedSessions,
    });
  }, [config, sessionType, timeLeft, completedSessions]);

  return {
    config,
    timeLeft,
    isRunning,
    sessionType,
    completedSessions,
    setConfig,
    start,
    pause,
    reset,
    skipSession,
  };
}
