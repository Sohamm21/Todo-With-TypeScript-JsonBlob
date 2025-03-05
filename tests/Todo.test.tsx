import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { TaskData } from "../src/types";
import TaskList from "../src/components/CurrentTasks/taskList";

describe("TaskList Component", () => {
  const mockSetTasks = vi.fn();
  const mockOnEditTask = vi.fn();
  const priorityColors = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
  };

  const tasks: TaskData[] = [
    {
      id: "1",
      title: "Test Task 1",
      status: "pending",
      deadline: new Date().toISOString(),
      priority: "high",
      description: "Test Description",
    },
    {
      id: "2",
      title: "Test Task 2",
      status: "completed",
      deadline: new Date().toISOString(),
      priority: "low",
      description: "Test Description",
    },
  ];

  it("renders task list when tasks are available", () => {
    render(
      <TaskList
        tasksToShow={tasks}
        priorityColors={priorityColors}
        tasks={tasks}
        setTasks={mockSetTasks}
        onEditTask={mockOnEditTask}
      />
    );

    expect(screen.getAllByTestId("task-container")).toHaveLength(2);
    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.getByText("Test Task 2")).toBeInTheDocument();
  });

  it("does not render when tasksToShow is empty", () => {
    render(
      <TaskList
        tasksToShow={[]}
        priorityColors={priorityColors}
        tasks={tasks}
        setTasks={mockSetTasks}
        onEditTask={mockOnEditTask}
      />
    );

    expect(screen.queryByTestId("task-container")).not.toBeInTheDocument();
  });

  it("calls setTasks when checkbox is clicked", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      })
    ) as unknown as jest.Mock;
    
  
    render(
      <TaskList
        tasksToShow={tasks}
        priorityColors={priorityColors}
        tasks={tasks}
        setTasks={mockSetTasks}
        onEditTask={mockOnEditTask}
      />
    );
  
    const checkboxes = screen.getAllByTestId("task-status");
  
    fireEvent.click(checkboxes[0]);
  
    await new Promise((resolve) => setTimeout(resolve, 100));
  
    expect(mockSetTasks).toHaveBeenCalled();
  });
  

  test("calls onEditTask when edit button is clicked", async () => {
    render(
      <TaskList
        tasksToShow={tasks}
        priorityColors={priorityColors}
        tasks={tasks}
        setTasks={mockSetTasks}
        onEditTask={mockOnEditTask}
      />
    );
  
    const editButtons = screen.getAllByTestId("edit-task"); // Get all edit buttons
    fireEvent.click(editButtons[0]); // Click the first edit button
  
    expect(mockOnEditTask).toHaveBeenCalled();
  });  

  it("shows the correct priority color", () => {
    render(
      <TaskList
        tasksToShow={tasks}
        priorityColors={priorityColors}
        tasks={tasks}
        setTasks={mockSetTasks}
        onEditTask={mockOnEditTask}
      />
    );

    const priorityIndicators = screen.getAllByTestId("priority-indicator");
    expect(priorityIndicators[0]).toHaveClass("bg-red-500");
    expect(priorityIndicators[1]).toHaveClass("bg-green-500");
  });
});
