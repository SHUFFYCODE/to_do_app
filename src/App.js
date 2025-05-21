import React, { useState, useEffect } from 'react';

function App() {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('General');
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;
    const newTask = {
      id: Date.now(),
      text: task,
      time: new Date().toLocaleTimeString(),
      category
    };
    setTasks([...tasks, newTask]);
    setTask('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const categories = [...new Set(tasks.map(t => t.category))];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Essential To-Do List</h1>

      <div style={styles.inputContainer}>
        <input
          value={task}
          onChange={e => setTask(e.target.value)}
          placeholder="Enter new task"
          style={styles.input}
        />
        <input
          value={category}
          onChange={e => setCategory(e.target.value)}
          placeholder="Category (e.g. Indoor, Work, Kitchen)"
          style={styles.input}
        />
        <button onClick={addTask} style={styles.addButton}>Add</button>
      </div>

      {categories.map(cat => (
        <div key={cat} style={styles.section}>
          <h2 style={styles.sectionTitle}>{cat}</h2>
          <ul style={styles.list}>
            {tasks
              .filter(t => t.category === cat)
              .map(task => (
                <li key={task.id} style={styles.taskItem}>
                  <span>{task.text} <small style={styles.time}>({task.time})</small></span>
                  <button onClick={() => deleteTask(task.id)} style={styles.deleteButton}>
                    ❌
                  </button>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#121212',
    color: '#f0f0f0',
    minHeight: '100vh',
    padding: '30px',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    fontSize: '2em',
    marginBottom: '20px'
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #444',
    backgroundColor: '#1e1e1e',
    color: '#f0f0f0',
    flex: '1 1 200px'
  },
  addButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#2196F3',
    color: '#fff',
    cursor: 'pointer'
  },
  section: {
    marginTop: '30px'
  },
  sectionTitle: {
    borderBottom: '1px solid #555',
    paddingBottom: '5px'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  taskItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '8px'
  },
  deleteButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'red',
    fontSize: '16px',
    cursor: 'pointer'
  },
  time: {
    fontSize: '0.8em',
    color: '#bbb'
  }
};

export default App;
