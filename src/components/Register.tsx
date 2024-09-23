// src/components/Register.tsx
import React, { useState } from "react";
import { useAuth } from '../AuthContext';
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate(); // Initialize navigate
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with your registration logic
    try {
      const response = await fetch(
        "https://apis-todo-server.vercel.app/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
       
        setSuccess("Registration successful! You can now log in.");
        setUsername("");
        setPassword("");
        setError("");
        login(data.user._id); // Assuming the response contains userId
                navigate('/todos'); 
      } else {
        const data = await response.json();

        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError("An error occurred during registration");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
      <h1 className="text-red-600 text-2xl font-bold mb-4 text-center">Todo App</h1>
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
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
            Register
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mt-2">{success}</p>
        )}
        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
