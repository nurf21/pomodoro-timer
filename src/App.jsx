import { useState } from "react";
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

  const {
    sessionType,
    timeLeft,
    isRunning,
    completedSessions,
    start,
    pause,
    reset,
  } = usePomodoroTimer(config);

  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <button
        onClick={() => setShowSettings(true)}
        className="absolute top-4 right-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ⚙️ Settings
      </button>

      <main role="main">
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
    </div>
  );
}

export default App;
