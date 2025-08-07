import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsModal({
  isOpen,
  onClose,
  currentConfig,
  onSave,
}) {
  const [work, setWork] = useState(currentConfig.work / 60);
  const [shortBreak, setShortBreak] = useState(currentConfig.shortBreak / 60);
  const [longBreak, setLongBreak] = useState(currentConfig.longBreak / 60);
  const [sessionsBeforeLongBreak, setSessionsBeforeLongBreak] = useState(
    currentConfig.sessionsBeforeLongBreak
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      work: work * 60,
      shortBreak: shortBreak * 60,
      longBreak: longBreak * 60,
      sessionsBeforeLongBreak,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl p-6 w-full max-w-md mx-4 sm:mx-0 shadow-xl"
        >
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="workDuration" className="block font-medium">
                Work Duration (minutes)
              </label>
              <input
                id="workDuration"
                type="number"
                min="1"
                value={work}
                onChange={(e) => setWork(Number(e.target.value))}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="shortBreakDuration" className="block font-medium">
                Short Break Duration (minutes)
              </label>
              <input
                id="shortBreakDuration"
                type="number"
                min="1"
                value={shortBreak}
                onChange={(e) => setShortBreak(Number(e.target.value))}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="longBreakDuration" className="block font-medium">
                Long Break Duration (minutes)
              </label>
              <input
                id="longBreakDuration"
                type="number"
                min="1"
                value={longBreak}
                onChange={(e) => setLongBreak(Number(e.target.value))}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="sessions" className="block font-medium">
                Sessions Before Long Break
              </label>
              <input
                id="sessions"
                type="number"
                min="1"
                value={sessionsBeforeLongBreak}
                onChange={(e) =>
                  setSessionsBeforeLongBreak(Number(e.target.value))
                }
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
