const Todo = require('../models/Todo.cjs');
const express = require('express');
const router = express.Router();

router.post('/todo/add', async (req, res) => {
  const { value } = req.body;
  try {
    const todo = new Todo({ value });
    await todo.save();
    res.status(201).json({ message: 'Todo added successfully', todo });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

router.put('/todo/update/:id', async (req, res) => {
  const { value, completed } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, { value, completed }, { new: true });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo updated successfully', todo });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

router.delete('/todo/delete/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

router.delete('/todo/delete', async (req, res) => {
  try {
    await Todo.deleteMany({});
    res.status(200).json({ message: 'All todos deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todos' });
  }
});

module.exports = router;
