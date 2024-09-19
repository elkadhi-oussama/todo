// Importing necessary libraries
import React, { useState } from 'react'; // Importing React and useState hook for state management

// Defining the interface for the props expected by the AddTodo component
interface AddTodoProps {
    addTodo: (text: string) => void; // Function to add a todo, accepting a string as input
}

// Functional component definition
const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
    // State to hold the input text for the new todo
    const [input, setInput] = useState('');

    // Function to handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior
        // Check if input is not just whitespace
        if (input.trim()) {
            addTodo(input); // Call the addTodo function passed via props
            setInput(''); // Clear the input field after adding the todo
        }
    };

    // Rendering the input form for adding todos
    return (
        <form onSubmit={handleSubmit} className="flex mb-4">
            {/* Input field for entering new todo */}
            <input 
                type="text" // Input type is text
                value={input} // Controlled input value from state
                onChange={(e) => setInput(e.target.value)} // Update state on input change
                placeholder="Add a new todo" // Placeholder text for the input
                className="border border-gray-300 rounded-md p-2 flex-grow mr-2" // Tailwind CSS classes for styling
            />
            {/* Submit button to add the todo */}
            <button 
                type="submit" // Button type is submit
                className="bg-blue-500 text-white rounded-md px-4 py-2" // Tailwind CSS classes for styling
            >
                Add
            </button>
        </form>
    );
};

// Exporting the AddTodo component for use in other parts of the application
export default AddTodo;
