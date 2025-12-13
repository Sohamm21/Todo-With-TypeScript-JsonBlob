import { useEffect, useState } from "react";
import CurrentTasks from "../components/CurrentTasks";
import "./index.css";

interface TaskData {
  id: string;
  title: string;
  priority: string;
  deadline: string;
  description: string;
}

const TodoWrapper = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  
  const fetchTasks = async () => {
    try {
      const response = await fetch(
        "https://jsonblob.com/api/jsonBlob/1345963441663434752"
      );
      if (response.ok) {
        const data = await response.json();
        Array.isArray(data) && setTasks(data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="todo-wrapper px-2 sm:px-70">
      <div className="header bg-red-500 mb-5 sm:mb-10 rounded-b-xl">
        <h1>Soham's ToDo</h1>
      </div>
      <div className="todo-list">
        <CurrentTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
};

export default TodoWrapper;
