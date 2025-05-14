import { useEffect, useState } from "react";
import { useTask } from "../context/TaskContext";

const DURATION = 25 * 60;

export const PomodoroTimer = () => {
  const { activeTask, completePomodoro } = useTask();
  const [seconds, setSeconds] = useState(DURATION);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setSeconds(DURATION);
    setIsRunning(false);
  }, [activeTask?.id]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && seconds > 0) {
      timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    } else if (isRunning && seconds === 0) {
      setIsRunning(false);
      completePomodoro();
    }
    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  const format = (s: number) =>
    `${Math.floor(s / 60)}:${s % 60 < 10 ? "0" : ""}${s % 60}`;

  if (!activeTask) {
    return (
      <div className="alert alert-secondary text-center">
        Selecciona una tarea para empezar
      </div>
    );
  }

  return (
    <div className="card text-center">
      <div className="card-body">
        <h2 className="card-title h4">{activeTask.name}</h2>
        <p className="display-3 text-danger my-4">{format(seconds)}</p>
        <div className="d-flex justify-content-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="btn btn-outline-primary"
          >
            {isRunning ? "Pausar" : "Iniciar"}
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setSeconds(DURATION);
            }}
            className="btn btn-outline-secondary"
          >
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
};
