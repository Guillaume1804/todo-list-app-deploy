const express = require('express'); // eslint-disable-line 
const mongoose = require('mongoose'); // eslint-disable-line 
const cors = require('cors'); // eslint-disable-line 

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://todo-user1:mdpuser1@cluster0.pth9bwu.mongodb.net/ToDo?retryWrites=true&w=majority&appName=Cluster0');

// Définir le schéma et le modèle
const TaskSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Task = mongoose.model('Task', TaskSchema, 'Tasks');

// Routes
app.get('/Tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/Tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

app.get('/Tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

app.put('/Tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

app.delete('/Tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});