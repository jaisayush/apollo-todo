import { todoController } from "../controllers/todoController";
import express from "express";

const todoRoutes = express.Router();

// Route to get all todos
todoRoutes.get("/todos", todoController.getTodos);

// Route to create a new todo
todoRoutes.post("/createTodo", todoController.createTodo);

// Route to delete a todo by ID
todoRoutes.delete("/deleteTodos/:id", todoController.deleteTodo);

export default todoRoutes;
