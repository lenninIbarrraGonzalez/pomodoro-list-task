import { Task } from "../types/task";
import { useTask } from "../context/TaskContext";

type Props = {
  task: Task;
};

export const TaskItem = ({ task }: Props) => {
  const { setActiveTask } = useTask();

  return (
    <li className={`list-group-item ${task.isActive ? "bg-success bg-opacity-25" : ""}`}>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <p className="mb-1 fw-medium">{task.name}</p>
          <small className="text-muted">Pomodoros: {task.pomodoros}</small>
        </div>
        <button
          className="btn btn-sm btn-success"
          onClick={() => setActiveTask(task.id)}
        >
          Seleccionar
        </button>
      </div>
    </li>
  );
};
