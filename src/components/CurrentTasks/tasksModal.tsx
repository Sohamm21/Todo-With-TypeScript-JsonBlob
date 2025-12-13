import Modal from "./modal";
import { useState, useEffect } from "react";
import { TaskData } from "../../types";
import { CircularProgress } from "@mui/material";

const PRIORITY_OPTIONS: { label: string; value: string }[] = [
  {
    label: "None",
    value: "none",
  },
  {
    label: "High",
    value: "high",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Low",
    value: "low",
  },
];

interface TasksModalProps {
  onModalClose: () => void;
  onSave: (taskData: {
    title: string;
    priority: string;
    deadline: string;
    description: string;
  }) => void;
  error: boolean;
  taskToEdit?: TaskData;
  isLoading: boolean;
}

const TasksModal = ({ onModalClose, onSave, taskToEdit, error, isLoading }: TasksModalProps): JSX.Element => {
  const date = new Date();
  const today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const [formData, setFormData] = useState({
    title: "",
    priority: "none",
    deadline: today,
    description: "",
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        priority: taskToEdit.priority,
        deadline: taskToEdit.deadline,
        description: taskToEdit.description,
      });
    }
  }, [taskToEdit]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const taskDetailsBody = (): JSX.Element => {
    return (
      <Modal.Body>
        <div className="text-black flex flex-col text-sm">
          <label htmlFor="title" className="mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Add a task title"
            className="w-full border border-gray-300 rounded-sm h-7 pl-[5px]"
          />
          {error && (<span className="text-red-500 text-xs">Title is required</span>)}
          <div className="flex flex-row w-full justify-between gap-5 mt-4">
            <div className="flex flex-col w-1/2">
              <label htmlFor="priority" className="mb-1">
                Priority
              </label>
              <select
                name="Priority"
                id="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-sm h-7"
              >
                {PRIORITY_OPTIONS.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="hover:bg-gray-200"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="deadline" className="mb-1">
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-sm h-7 pl-[5px]"
                onFocus={(e) => e.target.showPicker()}
              />
            </div>
          </div>
          <label htmlFor="description" className="mt-4 mb-1">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Add a task description"
            className="w-full border border-gray-300 rounded-sm h-20 pl-[5px] resize-none"
          ></textarea>
        </div>
      </Modal.Body>
    );
  };

  const taskDetailsFooter = (): JSX.Element => {
    return (
      <Modal.Footer>
        <div className="flex flex-row justify-end gap-2">
          <button
            className="bg-white text-[#646cff] rounded-md px-3 py-2 hover:text-[#535bf2] font-semibold cursor-pointer border border-[#646cff] hover:border-[#535bf2] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onModalClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="bg-[#646cff] rounded-md px-3 py-2 w-15 justify-center text-white hover:bg-[#535bf2] font-semibold cursor-pointer flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              onSave(formData);
            }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress color="inherit" thickness={5} size={15} /> : "Save"}
          </button>
        </div>
      </Modal.Footer>
    );
  };

  const renderModal = (): JSX.Element => {
    return (
      <Modal onModalClose={onModalClose} disableModalClose={isLoading}>
        <Modal.Header>
          <h2 className="text-black mt-2">Task Details</h2>
        </Modal.Header>
        {taskDetailsBody()}
        {taskDetailsFooter()}
      </Modal>
    );
  };
  return <>{renderModal()}</>;
};

export default TasksModal;
