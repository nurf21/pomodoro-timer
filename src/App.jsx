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

      <div className="mt-6 space-x-4">
        {isRunning ? (
          <button onClick={pause} className="btn">
            Pause
          </button>
        ) : (
          <button onClick={start} className="btn">
            Start
          </button>
        )}
        <button onClick={reset} className="btn">
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
