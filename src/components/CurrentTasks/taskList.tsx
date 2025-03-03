import { Clock, Pencil } from "lucide-react";
import { TaskData } from "../../types";

interface TaskListProps {
  tasksToShow: TaskData[];
  priorityColors: Record<string, string>;
  setTasks: (tasksToShow: TaskData[]) => void;
  tasks: TaskData[];
  onEditTask: (task: TaskData) => void;
  isCompletedTasks?: boolean;
}

const TaskList = ({ tasksToShow, priorityColors, tasks, setTasks, onEditTask, isCompletedTasks }: TaskListProps) => {
  if (!tasksToShow?.length) return null;

  const handleTaskStatus = async (taskToUpdate: TaskData) => {
    try {
      const updatedTasks = tasks.map(task => 
        task.id === taskToUpdate.id 
          ? { ...task, status: task.status === "pending" ? "completed" : "pending" }
          : task
      );
      
      const response = await fetch(
        "https://jsonblob.com/api/jsonBlob/1345963441663434752",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(updatedTasks),
        }
      );
      if (!response.ok) throw new Error("Failed to save task");
      
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleEditTask = (task: TaskData) => {
    onEditTask(task);
  };

  return (
    <div className="border border-gray-300 h-[365px] rounded-md overflow-y-auto shadow-[inset_0px_4px_6px_rgba(0,0,0,0.1),inset_0px_-4px_6px_rgba(0,0,0,0.1)]">
      {tasksToShow.map((task) => (
        <div
          key={task.id}
          className={`task h-17 m-1 p-2 flex items-center justify-between gap-4 shadow-sm border border-gray-300 rounded-md hover:bg-gray-100 ${isCompletedTasks ? "bg-gray-100/50" : ""}`}
        >
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={() => handleTaskStatus(task)}
              className="w-4 h-4 cursor-pointer"
              checked={task.status === "completed"}
            />
          </div>
          <div className={`flex-2 truncate font-semibold ${isCompletedTasks ? "line-through" : ""}`}>{task.title}</div>
          <div className="sm:flex-1 truncate flex flex-row items-center">
            <Clock className="mr-1 text-gray-500" size={18} />
            {new Date(task.deadline).toDateString()}
          </div>
          <div className="text-end flex flex-row items-center gap-2 ml-5 sm:gap-5 sm:ml-0">
            <Pencil
              className="sm:mr-1 text-gray-500 cursor-pointer hover:text-gray-600 hover:scale-105"
              size={18}
              onClick={() => handleEditTask(task)}
            />
            <div
              className={`w-6 h-8 rounded-sm inset-shadow-xs inset-shadow-yellow-600 ${
                priorityColors[task.priority] || "bg-gray-500"
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
