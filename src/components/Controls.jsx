import React from "react";

export default function Controls({
  isRunning,
  onStart,
  onPause,
  onReset,
  isDisabled,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 w-full max-w-sm">
      {isRunning ? (
        <button
          onClick={onPause}
          className="flex-1 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Pause
        </button>
      ) : (
        <button
          onClick={onStart}
          className="flex-1 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          disabled={isDisabled}
        >
          {isDisabled ? "Start" : "Start"}
        </button>
      )}

      <button
        onClick={onReset}
        className="flex-1 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Reset
      </button>
    </div>
  );
}
