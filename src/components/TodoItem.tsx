// Importing necessary libraries
import React from 'react'; // Importing React to create the functional component
import { Todo } from '../types'; // Importing the Todo type definition for TypeScript

// Defining the interface for the props expected by the TodoItem component
interface TodoItemProps {
    todo: Todo; // The individual todo object to be displayed
    toggleTodo: (id: number) => void; // Function to toggle the completion state of the todo
    deleteTodo: (id: number) => void; // Function to delete the todo
}

// Functional component definition
const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo }) => {
    return (
        <li 
            className={`flex justify-between items-center cursor-pointer p-2 rounded-md mb-2 ${todo.completed ? 'bg-green-200 line-through' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={() => toggleTodo(todo.id)} // Toggles the todo on click
        >
            <span>{todo.text}</span> {/* Displaying the todo text */}
            <button 
                onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from bubbling up to the li element
                    deleteTodo(todo.id); // Calls the delete function when the button is clicked
                }} 
                className="text-red-500 hover:text-red-700" // Styles for the delete button
            >
                Delete
            </button>
        </li>
    );
};

// Exporting the TodoItem component for use in other parts of the application
export default TodoItem;
