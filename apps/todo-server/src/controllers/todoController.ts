import { Todos } from '../models/todoModel';

const getTodos = async (req, res) => {
  try {
    // Retrieve all todos and sort by createdAt field in descending order
    const todos = await Todos.find().sort({ createdAt: -1 });
    setTimeout(() => {
      res.json(todos);
    }, 1000);
  } catch (error) {
    setTimeout(() => {
      res.status(500).json({ error: 'Server error' });
    }, 1000);
  }
};

const createTodo = async (req, res) => {
  try {
    const { task } = req.body;
    // Create a new todo with the provided task
    const todo = new Todos({
      task,
    });
    await todo.save();
    setTimeout(() => {
      res.status(201).send({ ...todo, isSuccess: true });
    }, 1000);
  } catch (error) {
    setTimeout(() => {
      res.status(400).json({ error: error, isSuccess: false });
    }, 1000);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    // Find and delete a todo by its ID
    const deletedTodo = await Todos.findByIdAndDelete(id);
    if (!deletedTodo) {
      setTimeout(() => {
        return res.status(404).json({ error: 'Todo not found' });
      }, 1000);
    }
    setTimeout(() => {
      res.json({ message: 'Todo deleted successfully', isSuccess: true });
    }, 1000);
  } catch (error) {
    setTimeout(() => {
      res.status(500).json({ error: error, isSuccess: false });
    }, 1000);
  }
};

export const todoController = {
  getTodos,
  createTodo,
  deleteTodo,
};
