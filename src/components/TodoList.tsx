// Importing necessary libraries
import React from 'react'; // Importing React to create the functional component
import TodoItem from './TodoItem'; // Importing the TodoItem component to display individual todos
import { Todo } from '../types'; // Importing the Todo type definition for TypeScript

// Defining the interface for the props expected by the TodoList component
interface TodoListProps {
    todos: Todo[]; // Array of todos to be displayed
    toggleTodo: (id: number) => void; // Function to toggle the completion state of a todo
    deleteTodo: (id: number) => void; // Function to delete a todo
}

// Functional component definition
const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo }) => {
    return (
        <ul className="list-none p-0"> {/* Unordered list for the todo items */}
            {todos.map(todo => ( // Mapping over the todos array to render each todo item
                <TodoItem 
                    key={todo.id} // Unique key for each todo item (required by React)
                    todo={todo} // Passing the current todo object to TodoItem
                    toggleTodo={toggleTodo} // Passing the toggleTodo function
                    deleteTodo={deleteTodo} // Passing the deleteTodo function
                />
            ))}
        </ul>
    );
};

// Exporting the TodoList component for use in other parts of the application
export default TodoList;
