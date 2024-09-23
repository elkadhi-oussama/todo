// src/components/Login.tsx
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const navigate = useNavigate(); // Initialize navigate

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('https://apis-todo-server.vercel.app/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                login(data.user._id); // Assuming the response contains userId
                navigate('/todos'); // Redirect to TodoApp
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            setError('Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h1 className="text-red-600 text-2xl font-bold mb-4 text-center">Todo App</h1>
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md px-4 py-2 w-full hover:bg-blue-600 transition duration-200"
                >
                    Login
                </button>
            </form>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <p className="text-center mt-4">
                Don't have an account?{' '}
                <a href="/register" className="text-blue-500 hover:underline">Register here</a>
            </p>
        </div>
    </div>
    );
};

export default Login;
