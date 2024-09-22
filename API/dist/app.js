"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const todo_1 = __importDefault(require("./todo"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Enable CORS for all routes
app.use((0, cors_1.default)());
// Middleware to parse JSON bodies
app.use(express_1.default.json());
//test route
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send("hello api");
}));
// Create a new Todo
app.post("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        const newTodo = new todo_1.default({ text });
        yield newTodo.save();
        res.status(201).json(newTodo);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating todo", error });
    }
}));
// Get all Todos
app.get("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.default.find();
        res.status(200).json(todos);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving todos", error });
    }
}));
// Get a Todo by ID
app.get("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield todo_1.default.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json(todo);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving todo", error });
    }
}));
// Update a Todo
app.put("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTodo = yield todo_1.default.updateOne({ _id: req.params.id }, { $set: req.body });
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        updatedTodo.modifiedCount
            ? res.status(200).json({ message: "Todo update" })
            : res.status(200).json({ message: "the todo already update" });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating todo", error });
    }
}));
// Delete a Todo
app.delete("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTodo = yield todo_1.default.deleteOne({ _id: req.params.id });
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        deletedTodo.deletedCount
            ? res.status(200).json({ message: "Todo deleted" })
            : res.status(200).json({ message: "the todo already deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting todo", error });
    }
}));
// Export the app
exports.default = app;
