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
    <div style={styles.container}>
      <h1 style={styles.title}>My To-Do List</h1>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={task}
          onChange={e => setTask(e.target.value)}
          placeholder="What do you need to do?"
          onKeyDown={e => e.key === 'Enter' && addTask()}
        />
        <button style={styles.addButton} onClick={addTask}>Add</button>
      </div>

      <ul style={styles.list}>
        {tasks.map(t => (
          <li key={t.id} style={styles.listItem}>
            <span>{t.text}</span>
            <button style={styles.deleteButton} onClick={() => deleteTask(t.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    margin: '40px auto',
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    display: 'flex',
    marginBottom: 20,
  },
  input: {
    flexGrow: 1,
    padding: '10px 15px',
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
    outline: 'none',
  },
  addButton: {
    marginLeft: 10,
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    backgroundColor: 'white',
    padding: '10px 15px',
    marginBottom: 10,
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    border: 'none',
    color: 'white',
    borderRadius: '50%',
    width: 26,
    height: 26,
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 1,
  },
};

export default App;
