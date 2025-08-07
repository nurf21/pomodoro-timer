import { motion } from "framer-motion";

export default function TimerDisplay({
  sessionType,
  timeLeft,
  sessionDuration,
}) {
  // Format seconds into MM:SS
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // Capitalize session label
  const getSessionLabel = (type) => {
    switch (type) {
      case "work":
        return "Work Session";
      case "shortBreak":
        return "Short Break";
      case "longBreak":
        return "Long Break";
      default:
        return "Timer";
    }
  };

  const progress = sessionDuration > 0 ? 1 - timeLeft / sessionDuration : 0;

  return (
    <div className="text-center space-y-2">
      <motion.h2
        key={sessionType}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="text-lg font-medium text-gray-600 tracking-wid"
        aria-live="polite"
      >
        {getSessionLabel(sessionType)}
      </motion.h2>

      <div
        className="font-timer font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
        aria-label={`Time left: ${formatTime(timeLeft)}`}
        role="timer"
        aria-live="polite"
      >
        {formatTime(timeLeft)}
      </div>

      <div
        className="relative w-full h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.floor(progress * 100)}
      >
        <div
          className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-500 ease-out"
          style={{ width: `${progress * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
