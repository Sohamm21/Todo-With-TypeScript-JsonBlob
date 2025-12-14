import { Clock, Pencil, Trash2 } from "lucide-react";
import { TaskData } from "../../types";
import { saveTasks } from "../../services/todoService";

interface TaskListProps {
  tasksToShow: TaskData[];
  priorityColors: Record<string, string>;
  setTasks: (tasksToShow: TaskData[]) => void;
  tasks: TaskData[];
  onEditTask: (task: TaskData) => void;
  onDeleteTask: (taskId: string) => void;
  isCompletedTasks?: boolean;
}

const TaskList = ({ tasksToShow, priorityColors, tasks, setTasks, onEditTask, onDeleteTask, isCompletedTasks }: TaskListProps) => {
  if (!tasksToShow?.length) return null;

  const handleTaskStatus = async (taskToUpdate: TaskData) => {
    try {
      const updatedTasks = tasks.map(task => 
        task.id === taskToUpdate.id 
          ? { ...task, status: task.status === "pending" ? "completed" : "pending" }
          : task
      );
      
      await saveTasks(updatedTasks);
      
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleEditTask = (task: TaskData) => {
    onEditTask(task);
  };

  const handleDeleteTask = (taskId: string) => {
    onDeleteTask(taskId);
  };

  return (
    <div className="border border-gray-300 h-[365px] rounded-md overflow-y-auto shadow-[inset_0px_4px_6px_rgba(0,0,0,0.1),inset_0px_-4px_6px_rgba(0,0,0,0.1)]">
      {tasksToShow.map((task) => (
        <div
          key={task.id}
          data-testid="task-container"
          className={`task h-17 m-1 p-2 flex items-center justify-between gap-4 shadow-sm border border-gray-300 rounded-md hover:bg-gray-100 ${isCompletedTasks ? "bg-gray-100/50" : ""}`}
        >
          <div className="flex items-center gap-2">
            <input
              data-testid="task-status"
              type="checkbox"
              onChange={() => handleTaskStatus(task)}
              className="w-4 h-4 cursor-pointer"
              checked={task.status === "completed"}
            />
          </div>
          <div className={`flex-2 truncate font-semibold ${isCompletedTasks ? "line-through" : ""}`}>{task.title}</div>
          <div className="hidden sm:flex sm:flex-1 truncate flex-row items-center">
            <Clock className="mr-1 text-gray-500" size={18} />
            {new Date(task.deadline).toDateString()}
          </div>
          <div className="text-end flex flex-row items-center gap-2 ml-5 sm:gap-5 sm:ml-0">
            <Pencil
              data-testid="edit-task"
              className="sm:mr-1 text-gray-500 cursor-pointer hover:text-gray-600 hover:scale-105"
              size={18}
              onClick={() => handleEditTask(task)}
            />
            <Trash2
              data-testid="delete-task"
              className="sm:mr-1 text-gray-500 cursor-pointer hover:text-red-500 hover:scale-105"
              size={18}
              onClick={() => handleDeleteTask(task.id)}
            />
            <div
              data-testid="priority-indicator"
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
