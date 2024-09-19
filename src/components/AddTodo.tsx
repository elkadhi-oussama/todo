// src/components/AddTodo.tsx
import React, { useState } from 'react';

interface AddTodoProps {
    addTodo: (text: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            addTodo(input);
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex mb-4">
            <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Add a new todo" 
                className="border border-gray-300 rounded-md p-2 flex-grow mr-2"
            />
            <button 
                type="submit" 
                className="bg-blue-500 text-white rounded-md px-4 py-2"
            >
                Add
            </button>
        </form>
    );
};

export default AddTodo;
