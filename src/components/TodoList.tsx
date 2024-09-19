// src/components/TodoList.tsx
import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types';

interface TodoListProps {
    todos: Todo[];
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo }) => {
    return (
        <ul className="list-none p-0">
            {todos.map(todo => (
                <TodoItem 
                    key={todo.id} 
                    todo={todo} 
                    toggleTodo={toggleTodo} 
                    deleteTodo={deleteTodo} 
                />
            ))}
        </ul>
    );
};

export default TodoList;
