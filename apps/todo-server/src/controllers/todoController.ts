import { Todos } from '../models/todoModel';

const getTodos = async (req, res) => {
  try {
    // Retrieve all todos and sort by createdAt field in descending order
    const todos = await Todos.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const createTodo = async (req, res) => {
  try {
    const { task, priority } = req.body;
    // Create a new todo with the provided task and priority
    const todo = new Todos({
      task,
      priority
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    // Find and delete a todo by its ID
    const deletedTodo = await Todos.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const todoController = {
  getTodos,
  createTodo,
  deleteTodo,
};
