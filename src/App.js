import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [task, setTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: task }]);
    setTask('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Simple To-Do List</h1>
      <input
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder="Enter new task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            {t.text} <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
