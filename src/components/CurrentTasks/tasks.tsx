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
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onModalClose = (): void => {
    setShowModal(false);
    setError(false);
    setTaskToEdit(undefined);
  };

  const tasksToShow = useMemo(() => {
    if (!Array.isArray(tasks)) return [];

    const pendingTasks = tasks.filter((task) => task.status === "pending");
    const today = new Date().toISOString().split("T")[0];

    if (pendingTasks.length) {
      if (currentTask === "today") {
        return pendingTasks.filter((task) => task.deadline === today);
      } else if (currentTask === "upcoming") {
        return pendingTasks.filter((task) => task.deadline > today);
      } else if (currentTask === "overdue") {
        return pendingTasks.filter((task) => task.deadline < today);
      }
    }
    return [];
  }, [tasks, currentTask]);

  const completedTasks = Array.isArray(tasks) ? tasks.filter((task) => task.status === "completed") : [];

  const saveTasksToAPI = async (updatedTasks: TaskData[]) => {
    const response = await fetch(
      "https://api.jsonblob.com/019b1816-1c18-74f4-9601-4a7393a1770a",
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

      if (!taskData.title) {
        setError(true);
        return;
      };

      setIsLoading(true);
      if (taskToEdit) {
        updatedTasks = tasks.map((task) =>
          task.id === taskToEdit.id ? { ...task, ...taskData } : task
        );
      } else {
        const newTask: TaskData = {
          ...taskData,
          id: crypto.randomUUID(),
          status: "pending",
        };
        updatedTasks = [...tasks, newTask];
      }

      await saveTasksToAPI(updatedTasks);
      setIsLoading(false);
      setShowModal(false);
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
          isLoading={isLoading}
          taskToEdit={taskToEdit}
          error={error}
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

      <div className="bg-white mt-5 p-5 text-black w-full rounded-md flex flex-col gap-5 mb-3">
        {tasksToShow.length ? (
          <TaskList
            tasksToShow={tasksToShow}
            priorityColors={priorityColors}
            tasks={tasks}
            setTasks={setTasks}
            onEditTask={handleEditTask}
          />
        ) : (
          <div className="border border-gray-300 text-sm text-gray-500 h-[370px] flex items-center justify-center rounded-md">
            No data to display
          </div>
        )}

        <>
          <div className="font-bold text-lg mt-5">Completed</div>
          {completedTasks.length ? (
            <TaskList
              tasksToShow={completedTasks}
              priorityColors={priorityColors}
              tasks={tasks}
              setTasks={setTasks}
              onEditTask={handleEditTask}
              isCompletedTasks={true}
            />
          ) : (
            <div className="border border-gray-300 text-sm text-gray-500 h-[370px] flex items-center justify-center rounded-md">
              No data to display
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default Tasks;
