import { useEffect, useState } from "react";
import CurrentTasks from "../components/CurrentTasks";
import { fetchTasks } from "../services/todoService";
import { TaskData } from "../types";
import "./index.css";

const TodoWrapper = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  
  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="todo-wrapper px-2 sm:px-70">
      <div className="header bg-linear-to-t from-sky-700/60 to-indigo-500/60 mb-5 sm:mb-10 rounded-b-xl">
        <h1>Todo App</h1>
      </div>
      <div className="todo-list">
        <CurrentTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
};

export default TodoWrapper;
