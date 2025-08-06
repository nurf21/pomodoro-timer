import Controls from "./components/Controls";
import TimerDisplay from "./components/TimerDisplay";
import { usePomodoroTimer } from "./hooks/usePomodoroTimer";

function App() {
  const {
    sessionType,
    timeLeft,
    completedSessions,
    start,
    pause,
    reset,
    isRunning,
  } = usePomodoroTimer();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <TimerDisplay
        sessionType={sessionType}
        timeLeft={timeLeft}
        completedSessions={completedSessions}
      />

      <Controls
        isRunning={isRunning}
        onStart={start}
        onPause={pause}
        onReset={reset}
      />
    </div>
  );
}

export default App;
