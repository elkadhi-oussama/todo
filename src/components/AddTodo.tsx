import React, { useState } from 'react';

interface AddTodoProps {
    addTodo: (text: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            addTodo(input);
            setInput('');
            setError('');
        } else {
            setError('Please enter a valid todo.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col mb-4">
            <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new todo"
                className="border border-gray-300 rounded-md p-2 mb-2" // Margin bottom for spacing
            />
            <button 
                type="submit"
                className="bg-blue-500 text-white rounded-md px-4 py-2 mb-2 transition duration-300 ease-in-out hover:bg-blue-600"
                
            >
                Add
            </button>
            {error && (
                <p className="text-red-500 mt-2 text-sm font-medium"> {/* Error message styles */}
                    {error}
                </p>
            )}
        </form>
    );
};

export default AddTodo;
