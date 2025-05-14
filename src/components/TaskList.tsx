import { useState } from "react";
import { useTask } from "../context/TaskContext";
import { TaskItem } from "./TaskItem";

export const TaskList = () => {
  const { tasks, addTask } = useTask();
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addTask(name);
      setName("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nueva tarea"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button className="btn btn-primary">Agregar</button>
      </form>

      <ul className="list-group">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};
