// Importing necessary libraries and components
import React, { useState } from 'react'; // Importing React and useState hook for state management
import TodoList from './components/TodoList'; // Importing TodoList component to display the list of todos
import AddTodo from './components/AddTodo'; // Importing AddTodo component to add new todos
import { Todo } from './types'; // Importing Todo type for TypeScript type safety

// Main App component definition
const App: React.FC = () => {
  // State to hold the list of todos
  const [todos, setTodos] = useState<Todo[]>([
    // Initial list of todos
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Buy Coffee', completed: false },
    { id: 3, text: 'Read a book', completed: false },
  ]);

  // Function to add a new todo
  const addTodo = (text: string) => {
    // Creating a new todo object
    const newTodo: Todo = {
      id: Date.now(), // Using current timestamp as a unique ID
      text, // Text for the new todo
      completed: false, // Initially set as not completed
    };
    // Updating the todos state by adding the new todo to the existing list
    setTodos([...todos, newTodo]);
  };

  // Function to toggle the completed status of a todo
  const toggleTodo = (id: number) => {
    // Updating the todos state by mapping through existing todos
    setTodos(todos.map(todo => 
      // If the todo ID matches, toggle the completed status
      todo.id === id ? { ...todo, completed: !todo.completed } : todo // Keep existing todo if ID doesn't match
    ));
  };

  // Function to delete a todo by its ID
  const deleteTodo = (id: number) => {
    // Updating the todos state by filtering out the deleted todo
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Rendering the main component structure
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Container for the todo list */}
      <div className="bg-white shadow-md rounded-lg p-6 w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
        {/* Adding new todo input form */}
        <AddTodo addTodo={addTodo} />
        {/* Displaying the list of todos */}
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
};

// Exporting the App component for use in other parts of the application
export default App;
