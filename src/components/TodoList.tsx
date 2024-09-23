import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types';

interface TodoListProps {
    todos: Todo[];
    toggleTodo: (id: string) => void; // Change type to string
    deleteTodo: (id: string) => void; // Change type to string
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo }) => {
    return (
        <ul className="list-none p-0">
            {todos.map(todo => (
                <TodoItem 
                    key={todo._id} // Use _id as key
                    todo={todo} 
                    toggleTodo={toggleTodo} 
                    deleteTodo={deleteTodo} 
                />
            ))}
        </ul>
    );
};

export default TodoList;
