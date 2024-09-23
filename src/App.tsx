import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Use Navigate instead of Redirect
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import { Todo } from "./types";
import { AuthProvider, useAuth } from "./AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
};

const AppRoutes: React.FC = () => {
    const { userId } = useAuth();
    
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/todos" element={userId ? <TodoApp /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
const TodoApp: React.FC = () => {
  const { userId, logout  } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      if (!userId) return;
      try {
        const response = await fetch(
          `https://apis-todo-server.vercel.app/todos?userId=${userId}`
        );
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [userId]);

  const addTodo = async (text: string) => {
    if (!userId) return;

    const newTodo: Todo = {
      _id: "",
      text,
      completed: false,
      userId,
    };

    try {
      const response = await fetch(
        "https://apis-todo-server.vercel.app/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo),
        }
      );

      const addedTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, addedTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleTodo = async (_id: string) => {
    const todoToUpdate = todos.find((todo) => todo._id === _id);
    if (!todoToUpdate) return;

    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };

    try {
      await fetch(`https://apis-todo-server.vercel.app/todos/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === _id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (_id: string) => {
    try {
      await fetch(`https://apis-todo-server.vercel.app/todos/${_id}`, {
        method: "DELETE",
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== _id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    <div className="bg-white shadow-md rounded-lg p-6 w-80 relative"> {/* Make parent relative for positioning */}
        <button 
            onClick={logout}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700" // Positioning styles
        >
            Logout
        </button>
        <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
        <AddTodo addTodo={addTodo} />
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
</div>
  );
};

export default App;
