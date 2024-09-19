// src/components/TodoItem.tsx
import React from 'react';
import { Todo } from '../types';

interface TodoItemProps {
    todo: Todo;
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo }) => {
    return (
        <li 
            className={`flex justify-between items-center cursor-pointer p-2 rounded-md mb-2 ${todo.completed ? 'bg-green-200 line-through' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={() => toggleTodo(todo.id)}
        >
            <span>{todo.text}</span>
            <button 
                onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering toggleTodo
                    deleteTodo(todo.id);
                }} 
                className="text-red-500 hover:text-red-700"
            >
                Delete
            </button>
        </li>
    );
};

export default TodoItem;
