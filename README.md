# ⏳ Pomodoro Timer

A fully customizable Pomodoro Timer built with **React** and **Tailwind CSS**, featuring skip session functionality, localStorage persistence, progress bar, and configurable work/break durations.

## ✨ Features

- **Pomodoro Technique**: Alternate between work sessions, short breaks, and long breaks.
- **Customizable Settings** ⚙️: Change work, short break, long break durations, and session cycles.
- **Progress Bar** 📊: Visual indicator of remaining time.
- **Skip Session** ⏭️: Jump directly to the next session.
- **LocalStorage Persistence** 💾: Settings and progress are saved automatically.
- **Responsive Design** 📱: Optimized for desktop and mobile.

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/nurf21/pomodoro-timer.git
cd pomodoro-timer
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`.

## ⚙️ Configuration

You can adjust the **default durations** in `usePomodoroTimer.js` or via the in-app **Settings Modal**:

| Setting                    | Default |
| -------------------------- | ------- |
| Work Session (minutes)     | 25      |
| Short Break (minutes)      | 5       |
| Long Break (minutes)       | 15      |
| Sessions Before Long Break | 4       |

Changes are saved to `localStorage` automatically.

## 🎯 Usage

1. **Start** the timer to begin a work session.
2. **Pause/Resume** as needed.
3. **Skip** to the next session if you want to.
4. **Open Settings** to change durations and session counts.
5. Watch the **progress bar** to track remaining time.

## 🛠️ Built With

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://motion.dev/) – animations
- [Vite](https://vite.dev/) – fast build tool

## 🧑‍💻 Credits

- Project template and inspiration from [roadmap.sh](https://roadmap.sh/projects/pomodoro-timer)

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

💡 **Pro Tip**: The Pomodoro technique recommends 25 min work + 5 min short break + 15 min long break after 4 cycles.
