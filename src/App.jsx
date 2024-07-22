import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:5000/Tasks');
    setTasks(response.data);
  };

  const addTask = async () => {
    const response = await axios.post('http://localhost:5000/Tasks', { text, completed: false });
    setTasks([...tasks, response.data]);
    setText('');
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/Tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  const toggleTask = async (id) => {
    const task = tasks.find(task => task._id === id);
    const response = await axios.put(`http://localhost:5000/Tasks/${id}`, { ...task, completed: !task.completed });
    setTasks(tasks.map(t => t._id === id ? response.data : t));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="mb-4">
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          className="border p-2 mr-2" 
          placeholder="New Task" 
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2">Add Task</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task._id} className="mb-2 flex justify-between items-center">
            <span 
              onClick={() => toggleTask(task._id)} 
              className={`cursor-pointer ${task.completed ? 'line-through' : ''}`}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task._id)} className="bg-red-500 text-white px-4 py-2">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
