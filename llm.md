# Todo App with TypeScript and JSONBlob

## Project Overview

This is a modern Todo application built with TypeScript, React, and Vite that uses JSONBlob as a cloud-based backend for data persistence. The application demonstrates clean architecture principles, type safety, and modern React patterns.

## Technology Stack

- **Frontend Framework**: React 18.2.0
- **Language**: TypeScript 5.3.3
- **Build Tool**: Vite 5.1.0
- **Styling**: Tailwind CSS 4.0.9
- **UI Components**: Material-UI 6.4.6 (for select components)
- **Icons**: Lucide React 0.477.0
- **Testing**: Vitest 3.0.7 with React Testing Library
- **Backend**: JSONBlob API for cloud storage

## Project Structure

```
src/
├── main.tsx                 # Application entry point
├── App.tsx                 # Root component with routing
├── pages/
│   └── TodoWrapper.tsx     # Main todo container with API integration
├── components/
│   └── CurrentTasks/
│       ├── index.tsx       # Main CurrentTasks component
│       ├── modal.tsx       # Compound modal component
│       ├── segmentedControl.tsx  # Tab navigation
│       ├── taskList.tsx    # Task list renderer
│       ├── tasks.tsx       # Task CRUD operations
│       └── tasksModal.tsx  # Task creation/edit form
└── types/
    └── index.ts           # TypeScript type definitions
```

## Key Components

### TodoWrapper (`src/pages/TodoWrapper.tsx`)
- Main container component that manages the application state
- Handles API integration with JSONBlob
- Fetches initial data and passes it to child components
- **API Endpoints**:
  - Read: `https://jsonblob.com/api/jsonBlob/1345963441663434752`
  - Write: `https://jsonblob.com/api/jsonBlob/019b1816-1c18-74f4-9601-4a7393a1770a`
  - **Note**: Different blob IDs for read/write operations (potential issue)

### CurrentTasks (`src/components/CurrentTasks/index.tsx`)
- Implements tabbed navigation with three views:
  - Today: Tasks due today
  - Upcoming: Future tasks
  - Overdue: Past due tasks
- Uses a segmented control for tab switching
- Manages local state for selected tab and modal visibility

### Tasks Component (`src/components/CurrentTasks/tasks.tsx`)
- Core business logic for task operations
- Implements CRUD operations:
  - `handleToggleComplete`: Toggle task completion status
  - `handleDeleteTask`: Remove tasks
  - `handleAddTask`: Create new tasks
  - `handleEditTask`: Update existing tasks
- Manages task filtering based on selected tab
- Uses localStorage for data persistence
- Posts updates to JSONBlob API

### TaskList (`src/components/CurrentTasks/taskList.tsx`)
- Renders individual task items
- Displays task properties: title, priority, deadline, completion status
- Priority color coding:
  - High: Red
  - Medium: Yellow
  - Low: Green
- Interactive elements for task completion and deletion

### TasksModal (`src/components/CurrentTasks/tasksModal.tsx`)
- Form interface for creating and editing tasks
- Input fields:
  - Title (required)
  - Priority (Low/Medium/High)
  - Deadline (date/time)
  - Description
- Uses Material-UI Select for priority dropdown
- Validates required fields before submission

### Modal System (`src/components/CurrentTasks/modal.tsx`)
- Compound component pattern with:
  - `Modal.Root`: Main container with backdrop
  - `Modal.Title`: Header section
  - `Modal.Content`: Body content
  - `Modal.Footer`: Action buttons
- Handles keyboard events (ESC to close)
- Click outside to dismiss functionality

## Data Model

### Task Interface (`src/types/index.ts`)
```typescript
interface Task {
  id: string;
  title: string;
  deadline: string;
  priority: "low" | "medium" | "high";
  description?: string;
  completed: boolean;
}
```

## Data Flow

1. **Initial Load**: TodoWrapper fetches tasks from JSONBlob API
2. **Local State**: Tasks are stored in component state and localStorage
3. **User Actions**: CRUD operations update local state immediately
4. **Persistence**: Changes are synced to JSONBlob API asynchronously
5. **Tab Filtering**: Tasks are filtered client-side based on deadline

## API Integration

The application uses JSONBlob as a serverless backend:
- **GET**: Fetches initial task data
- **PUT**: Updates the entire task array
- **Headers**: `Content-Type: application/json`
- **CORS**: Handled by JSONBlob

## Key Features

1. **Task Management**
   - Create tasks with title, priority, deadline, and description
   - Mark tasks as complete/incomplete
   - Delete tasks
   - Edit existing tasks

2. **Task Organization**
   - Automatic categorization by deadline
   - Visual priority indicators
   - Completion status tracking

3. **User Interface**
   - Clean, responsive design
   - Mobile-optimized (hides dates on small screens)
   - Intuitive modal interactions
   - Keyboard accessibility

4. **Data Persistence**
   - Cloud storage via JSONBlob
   - Local storage fallback
   - Automatic sync on changes

## Testing

- Test framework: Vitest with React Testing Library
- Test file: `tests/Todo.test.tsx`
- Covers basic component rendering

## Build and Development

```bash
# Development
npm run dev

# Build
npm run build

# Testing
npm run test
npm run test:ui

# Linting
npm run lint

# Preview production build
npm run preview
```

## Potential Improvements

1. **API Consistency**: Resolve the different blob IDs for read/write operations
2. **Error Handling**: Add proper error states for API failures
3. **Loading States**: Implement loading indicators during API calls
4. **Optimistic Updates**: Update UI before API confirmation
5. **Task Persistence**: Consider using a proper backend service
6. **Search/Filter**: Add search functionality for tasks
7. **Sorting**: Allow sorting by priority, deadline, or creation date
8. **Bulk Operations**: Select multiple tasks for bulk actions
9. **Recurring Tasks**: Support for repeating tasks
10. **User Authentication**: Multi-user support with authentication

## Code Quality

- Strict TypeScript configuration
- ESLint for code quality
- Component-based architecture
- Separation of concerns
- Reusable compound components
- Type-safe throughout the application
