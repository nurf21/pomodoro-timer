export default function SessionTracker({
  completedSessions,
  sessionsBeforeLongBreak,
}) {
  const dots = [];

  for (let i = 1; i <= sessionsBeforeLongBreak; i++) {
    const isCompleted = i <= completedSessions % sessionsBeforeLongBreak;
    dots.push(
      <span
        key={i}
        className={`w-4 h-4 rounded-full inline-block mx-1 ${
          isCompleted ? "bg-green-600" : "bg-gray-300"
        }`}
        aria-label={isCompleted ? "Completed" : "Incomplete"}
      ></span>
    );
  }

  return (
    <div className="mt-4 text-center">
      <p className="text-sm text-gray-600">Pomodoro Progress</p>
      <div
        className="flex justify-center items-center mt-1"
        aria-label="Pomodoro cycle progress"
      >
        {dots}
      </div>
      <p className="text-xs text-gray-500 mt-1">
        {completedSessions % sessionsBeforeLongBreak}/{sessionsBeforeLongBreak}{" "}
        before long break
      </p>
    </div>
  );
}
