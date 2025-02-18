# Next.js Todo App with Drag-and-Drop Functionality

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It features a drag-and-drop to-do list with the ability to add, delete, and rearrange tasks. It uses `@hello-pangea/dnd` for drag-and-drop functionality and `@mantine/core` for UI components.

---

## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <project-folder>
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run the development server:**
    ```bash
    npm run dev
    ```

4. **Open the application:**
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the project by modifying `app/page.tsx`. The page auto-updates as you edit the file.

---

## Approach

This application is built using the following approach:

- **Component Structure:** The UI is organized using React functional components and hooks (`useState`, `useListState` from `@mantine/hooks`) to manage state.
- **Data Management:** The to-do items are categorized into two states: `inCompleteTodos` and `completedTodos`. This separation allows for efficient handling of tasks based on their completion status.
- **Drag-and-Drop:** Implemented using `@hello-pangea/dnd`. It enables users to:
  - Reorder tasks within the same category (incomplete or completed).
  - Move tasks between the incomplete and completed categories.
- **Adding and Deleting Tasks:**
  - Users can add new tasks using an input field and a button.
  - Tasks can be deleted using a trash icon next to each task.
- **Styling:** The UI is styled using `@mantine/core` components for consistent design and `clsx` for conditional class management.

---

## Trade-offs and Improvements

### Trade-offs:
- **Unique Key Constraint:** The `todo` string is used as the key for the draggable items, which may cause issues if two tasks have identical descriptions. Using a unique `id` as the key would be more robust.
- **State Management:** The current state management approach is suitable for a small-scale application but might not scale well with more complex requirements. Implementing a global state management solution (e.g., Redux, Zustand) could enhance maintainability.

### Improvements:
- **Persistent Storage:** Currently, tasks are stored in memory. Integrating local storage or a backend database would allow tasks to persist across browser sessions.
- **Input Validation:** Implementing input validation (e.g., preventing empty tasks) would improve user experience.
- **Accessibility Enhancements:** Adding ARIA attributes to improve accessibility for users with assistive technologies.
- **Enhanced Drag-and-Drop Features:**
  - Adding animations to make the drag-and-drop experience smoother.
  - Allowing multi-select and bulk actions for tasks.
- **Performance Optimization:** Memoization techniques (`useMemo`, `useCallback`) could be used to optimize rendering performance for larger task lists.