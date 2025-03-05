# Todo Application with TypeScript, React and JsonBlob 

A modern, responsive todo application built with TypeScript, React, and Tailwind CSS. This application allows users to manage their tasks with features like priority levels, deadlines, and task status tracking.

## Features

- Create, edit, and delete tasks
- Set task priorities with visual indicators
- Add deadlines to tasks
- Mark tasks as complete/incomplete
- Responsive design for mobile and desktop
- Filter tasks by status (pending/completed)
- Modern UI with Tailwind CSS
- Type-safe development with TypeScript
- Persistent data storage using JSONBlob

// ... existing code ...

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Material-UI
- Vitest for testing
- ESLint for code linting
- JSONBlob for data persistence

## Data Persistence

This application uses JSONBlob as a simple data persistence solution. JSONBlob provides a RESTful API that allows storing and retrieving JSON data. The application stores all tasks in a single JSONBlob endpoint, which enables:

- Real-time task updates
- Data persistence between sessions
- No backend setup required
- Simple API integration
