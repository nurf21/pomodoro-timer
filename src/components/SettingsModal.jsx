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
          className="bg-white rounded-xl p-6 w-full max-w-md mx-auto shadow-2xl space-y-4"
        >
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
            Timer Settings
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="workDuration" className="flex flex-col gap-1">
                <span className="text-sm text-gray-600">
                  Work Duration (minutes)
                </span>
              </label>
              <input
                id="workDuration"
                type="number"
                min="1"
                value={work}
                onChange={(e) => setWork(Number(e.target.value))}
                className="border rounded-md px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            <div>
              <label
                htmlFor="shortBreakDuration"
                className="flex flex-col gap-1"
              >
                <span className="text-sm text-gray-600">
                  Short Break Duration (minutes)
                </span>
              </label>
              <input
                id="shortBreakDuration"
                type="number"
                min="1"
                value={shortBreak}
                onChange={(e) => setShortBreak(Number(e.target.value))}
                className="border rounded-md px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            <div>
              <label
                htmlFor="longBreakDuration"
                className="flex flex-col gap-1"
              >
                <span className="text-sm text-gray-600">
                  Long Break Duration (minutes)
                </span>
              </label>
              <input
                id="longBreakDuration"
                type="number"
                min="1"
                value={longBreak}
                onChange={(e) => setLongBreak(Number(e.target.value))}
                className="border rounded-md px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            <div>
              <label htmlFor="sessions" className="flex flex-col gap-1">
                <span className="text-sm text-gray-600">
                  Sessions Before Long Break
                </span>
              </label>
              <input
                id="sessions"
                type="number"
                min="1"
                value={sessionsBeforeLongBreak}
                onChange={(e) =>
                  setSessionsBeforeLongBreak(Number(e.target.value))
                }
                className="border rounded-md px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-gray-100 text-sm hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600"
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
