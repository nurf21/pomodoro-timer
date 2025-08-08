import { motion } from "framer-motion";

export default function Controls({
  isRunning,
  onStart,
  onPause,
  onReset,
  onSkip,
}) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row gap-4 justify-center mt-6 w-full max-w-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isRunning ? (
        <button
          onClick={onPause}
          className="flex-1 py-3 px-4 rounded-xl bg-yellow-400 text-white text-base font-semibold shadow hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-400 transition"
        >
          Pause
        </button>
      ) : (
        <button
          onClick={onStart}
          className="flex-1 py-3 px-4 rounded-xl bg-green-500 text-white text-base font-semibold shadow hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 transition"
        >
          Start
        </button>
      )}

      <button
        onClick={onReset}
        className="flex-1 py-3 px-4 rounded-xl bg-gray-400 text-white text-base font-semibold shadow hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
      >
        Reset
      </button>
      <button
        onClick={onSkip}
        className="flex-1 py-3 px-4 rounded-xl bg-red-500 text-white text-base font-semibold shadow hover:bg-red-400 dark:bg-red-600 dark:hover:bg-red-500 transition"
      >
        Skip
      </button>
    </motion.div>
  );
}
