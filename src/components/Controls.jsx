import React from "react";

export default function Controls({
  isRunning,
  onStart,
  onPause,
  onReset,
  isDisabled,
}) {
  return (
    <div className="flex gap-4 justify-center mt-6">
      {isRunning ? (
        <button
          onClick={onPause}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
        >
          Pause
        </button>
      ) : (
        <button
          onClick={onStart}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          disabled={isDisabled}
        >
          {isDisabled ? "Start" : "Start"}
        </button>
      )}

      <button
        onClick={onReset}
        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
      >
        Reset
      </button>
    </div>
  );
}
