import { useMemo, useState } from "react";
import "./index.css";
import TasksModal from "./tasksModal";
import { TaskData } from "../../types";

import TaskList from "./taskList";

interface TaskProps {
  tasks: TaskData[];
  setTasks: (tasks: TaskData[]) => void;
  currentTask: string;
}

const Tasks = ({ tasks, setTasks, currentTask }: TaskProps): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskData | undefined>(undefined);

  const onModalClose = (): void => {
    setShowModal(false);
    setTaskToEdit(undefined);
  };

  const tasksToShow = useMemo(() => {
    const pendingTasks =
      tasks?.filter((task) => task.status === "pending") || [];

    const today = new Date().toISOString().split("T")[0];

    if (pendingTasks?.length) {      
      if (currentTask === "today") {
        return pendingTasks.filter(
          (task) => task?.deadline === today
        );
      } else if (currentTask === "upcoming") {
        return pendingTasks.filter(
          (task) => task?.deadline > today
        );
      } else if (currentTask === "overdue") {
        return pendingTasks.filter(
          (task) => task?.deadline < today
        );
      }
    }
    return [];
  }, [tasks, currentTask]);

  const saveTasksToAPI = async (updatedTasks: TaskData[]) => {
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
  };

  const handleOnClickSave = async (
    taskData: Omit<TaskData, "id" | "status">
  ): Promise<void> => {
    try {
      let updatedTasks: TaskData[];
      
      if (taskToEdit) {
        // Edit existing task
        updatedTasks = tasks.map(task => 
          task.id === taskToEdit.id 
            ? { ...task, ...taskData }
            : task
        );
      } else {
        // Create new task
        const newTask: TaskData = {
          ...taskData,
          id: crypto.randomUUID(),
          status: "pending",
        };
        updatedTasks = [...tasks, newTask];
      }

      await saveTasksToAPI(updatedTasks);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleEditTask = (task: TaskData) => {
    setTaskToEdit(task);
    setShowModal(true);
  };

  const priorityColors: Record<string, string> = {
    high: "bg-red-500",
    medium: "bg-orange-400",
    low: "bg-yellow-500",
  };

  return (
    <div className="w-full">
      {showModal && (
        <TasksModal 
          onModalClose={onModalClose} 
          onSave={handleOnClickSave}
          taskToEdit={taskToEdit}
        />
      )}

      <div className="tasks-header flex justify-between items-center">
        <h2>Tasks</h2>
        <button
          className="bg-[#646cff] rounded-md px-3 py-2 hover:bg-[#535bf2] font-semibold cursor-pointer"
          onClick={() => setShowModal((prev) => !prev)}
        >
          + Add Task
        </button>
      </div>

      <div className="bg-white mt-5 p-5 text-black w-full h-[500px] rounded-md">
        {tasksToShow.length ? (
          <TaskList 
            tasksToShow={tasksToShow} 
            priorityColors={priorityColors} 
            tasks={tasks} 
            setTasks={setTasks}
            onEditTask={handleEditTask}
          />
        ) : (
          <div className="border border-gray-300 text-sm text-gray-500 h-full flex items-center justify-center rounded-md">
            No data to display
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
