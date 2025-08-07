import { motion, AnimatePresence } from "framer-motion";

export default function TimerDisplay({ sessionType, timeLeft }) {
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
    </div>
  );
}
