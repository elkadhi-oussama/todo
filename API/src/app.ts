// src/app.ts
import express, { Request, Response } from "express";
import Todo from "./todo";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
//test route
app.get("/",async (req: Request, res: Response)=>{
    res.status(200).send("hello api")
})


// Create a new Todo
app.post("/todos", async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const newTodo = new Todo({ text });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error });
  }
});

// Get all Todos
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving todos", error });
  }
});

// Get a Todo by ID
app.get("/todos/:id", async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving todo", error });
  }
});

// Update a Todo
app.put("/todos/:id", async (req: Request, res: Response) => {
  try {
    const updatedTodo = await Todo.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    updatedTodo.modifiedCount
      ? res.status(200).json({ message: "Todo update" })
      : res.status(200).json({ message: "the todo already update" });
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
});

// Delete a Todo
app.delete("/todos/:id", async (req: Request, res: Response) => {
  try {
    const deletedTodo = await Todo.deleteOne({_id:req.params.id});
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    deletedTodo.deletedCount
    ? res.status(200).json({ message: "Todo deleted" })
    : res.status(200).json({ message: "the todo already deleted" });
   
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
});

// Export the app
export default app;
