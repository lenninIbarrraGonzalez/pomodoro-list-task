import { TaskProvider } from "./context/TaskContext";
import { TaskList } from "./components/TaskList";
import { PomodoroTimer } from "./components/PomodoroTimer";

function App() {
  return (
    <TaskProvider>
      <div className="container py-5 bg-light min-vh-100">
        <h1 className="text-center mb-5">🍅 Pomodoro con Lista de Tareas</h1>
        <div className="row">
          <div className="col-md-6 mb-4">
            <TaskList />
          </div>
          <div className="col-md-6 mb-4">
            <PomodoroTimer />
          </div>
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
