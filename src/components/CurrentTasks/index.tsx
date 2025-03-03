import { useState } from "react";
import SegmentedControl from "./segmentedControl";
import Tasks from "./tasks";

import { TaskData } from "../../types";

interface CurrentTasksProps {
  tasks: TaskData[];
  setTasks: (tasks: TaskData[]) => void;
};

const tabs = [
  { label: "Today", value: "today" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Overdue", value: "overdue" },
];

const CurrentTasks = ( { tasks, setTasks }: CurrentTasksProps): JSX.Element => {
  const [currentTask, setCurrentTask] = useState("today");

  const handleTabChange = (tab: string) => {
    setCurrentTask(tab);
  };

  return (
    <>
      <SegmentedControl
        currentTask={currentTask}
        tabs={tabs}
        handleTabChange={handleTabChange}
        name="tasks"
      />
      <Tasks tasks={tasks} setTasks={setTasks} currentTask={currentTask} />
    </>
  );
};

export default CurrentTasks;
