import { useState, useRef, useEffect } from "react";
import { usePomodoroTimer } from "./hooks/usePomodoroTimer";
import Controls from "./components/Controls";
import SessionTracker from "./components/SessionTracker";
import SettingsModal from "./components/SettingsModal";
import TimerDisplay from "./components/TimerDisplay";

function App() {
  const [config, setConfig] = useState({
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
    sessionsBeforeLongBreak: 4,
  });

  const audioRef = useRef(null);

  const {
    sessionType,
    timeLeft,
    isRunning,
    completedSessions,
    start,
    pause,
    reset,
  } = usePomodoroTimer(config);

  useEffect(() => {
    if (timeLeft === 0 && audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn("Audio play failed:", err);
      });
    }
  }, [timeLeft]);

  const [showSettings, setShowSettings] = useState(false);

  return (
    <main
      role="main"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8"
    >
      <audio
        ref={audioRef}
        src="pomodoro-timer/notification.mp3"
        preload="auto"
      />

      <button
        onClick={() => setShowSettings(true)}
        className="absolute top-4 right-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ⚙️ Settings
      </button>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        currentConfig={config}
        onSave={(newConfig) => setConfig(newConfig)}
      />

      <TimerDisplay sessionType={sessionType} timeLeft={timeLeft} />

      <Controls
        isRunning={isRunning}
        onStart={start}
        onPause={pause}
        onReset={reset}
      />

      <SessionTracker
        completedSessions={completedSessions}
        sessionsBeforeLongBreak={config.sessionsBeforeLongBreak}
      />
    </main>
  );
}

export default App;
