import { TaskData } from "../types";

const API_URL = "https://api.jsonblob.com/019b1816-1c18-74f4-9601-4a7393a1770a";

export const fetchTasks = async (): Promise<TaskData[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

export const saveTasks = async (tasks: TaskData[]): Promise<void> => {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(tasks),
  });

  if (!response.ok) {
    throw new Error("Failed to save tasks");
  }
};
