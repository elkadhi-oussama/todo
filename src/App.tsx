import React, { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import { Todo } from "./types";

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    // Fetch todos from the backend when the component mounts
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('http://localhost:5000/todos');
                const data = await response.json();
                setTodos(data); // Assuming the backend returns an array of todos with _id
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, []);

    // Function to add a new todo
    const addTodo = async (text: string) => {
        const newTodo: Todo = {
            _id: '', // Temporary value until the backend confirms
            text,
            completed: false,
        };

        try {
            const response = await fetch('http://localhost:5000/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo),
            });

            const addedTodo = await response.json();
            setTodos((prevTodos) => [...prevTodos, addedTodo]); // Backend should return added todo with _id
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    // Function to toggle the completed status of a todo
    const toggleTodo = async (_id: string) => {
        const todoToUpdate = todos.find(todo => todo._id === _id);
        if (!todoToUpdate) return;

        const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };

        try {
            await fetch(`http://localhost:5000/todos/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTodo),
            });

            setTodos((prevTodos) =>
                prevTodos.map(todo => (todo._id === _id ? updatedTodo : todo))
            );
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    // Function to delete a todo by its ID
    const deleteTodo = async (_id: string) => {
        try {
            await fetch(`http://localhost:5000/todos/${_id}`, {
                method: 'DELETE',
            });
            setTodos((prevTodos) => prevTodos.filter(todo => todo._id !== _id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    // Rendering the main component structure
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-6 w-80">
                <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
                <AddTodo addTodo={addTodo} />
                <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
            </div>
        </div>
    );
};

export default App;
