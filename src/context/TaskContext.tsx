import { createContext, useContext, useState } from "react";
import { Task } from "../types/task";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";

interface TaskContextType {
  tasks: Task[];
  activeTask: Task | null;
  addTask: (name: string) => void;
  setActiveTask: (id: string) => void;
  completePomodoro: () => void;
}

const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("pomodoro-tasks", []);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const addTask = (name: string) => {
    const newTask: Task = {
      id: uuidv4(),
      name,
      pomodoros: 0,
      isActive: false,
    };
    setTasks([...tasks, newTask]);
  };

  const setActiveTask = (id: string) => {
    setActiveTaskId(id);
    setTasks(tasks.map(t => ({ ...t, isActive: t.id === id })));
  };

  const completePomodoro = () => {
    if (!activeTaskId) return;
    setTasks(tasks.map(t =>
      t.id === activeTaskId ? { ...t, pomodoros: t.pomodoros + 1 } : t
    ));
  };

  const activeTask = tasks.find(t => t.id === activeTaskId) || null;

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, setActiveTask, completePomodoro, activeTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
