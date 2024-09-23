import React from 'react';
import { Todo } from '../types';

interface TodoItemProps {
    todo: Todo;
    toggleTodo: (id: string) => void; // Change type to string
    deleteTodo: (id: string) => void; // Change type to string
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo }) => {
    return (
        <li 
            className={`flex justify-between items-center cursor-pointer p-2 rounded-md mb-2 ${todo.completed ? 'bg-green-200 line-through' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={() => toggleTodo(todo._id)} // Use _id
        >
            <span>{todo.text}</span>
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    deleteTodo(todo._id); // Use _id
                }} 
                className="text-red-500 hover:text-red-700"
            >
                Delete
            </button>
        </li>
    );
};

export default TodoItem;
