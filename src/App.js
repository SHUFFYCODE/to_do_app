import React, { useState, useEffect } from 'react';

function App() {
  const [lists, setLists] = useState(() => {
    const saved = localStorage.getItem('lists');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: Date.now(),
            name: 'Default',
            tasks: [],
          },
        ];
  });

  const [taskText, setTaskText] = useState('');
  const [activeListId, setActiveListId] = useState(lists[0]?.id || null);

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  const addTask = () => {
    if (!taskText.trim()) return;

    const updatedLists = lists.map((list) =>
      list.id === activeListId
        ? {
            ...list,
            tasks: [
              ...list.tasks,
              { id: Date.now(), text: taskText, createdAt: new Date().toLocaleString() },
            ],
          }
        : list
    );
    setLists(updatedLists);
    setTaskText('');
  };

  const deleteTask = (taskId) => {
    const updatedLists = lists.map((list) =>
      list.id === activeListId
        ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
        : list
    );
    setLists(updatedLists);
  };

  const addList = () => {
    const newList = {
      id: Date.now(),
      name: `New List ${lists.length + 1}`,
      tasks: [],
    };
    setLists([...lists, newList]);
    setActiveListId(newList.id);
  };

  const renameList = (id, newName) => {
    const updatedLists = lists.map((list) => (list.id === id ? { ...list, name: newName } : list));
    setLists(updatedLists);
  };

  const deleteList = (id) => {
    const updatedLists = lists.filter((list) => list.id !== id);
    setLists(updatedLists);
    if (activeListId === id && updatedLists.length > 0) {
      setActiveListId(updatedLists[0].id);
    } else if (updatedLists.length === 0) {
      // If no lists remain, create a default one
      const defaultList = { id: Date.now(), name: 'Default', tasks: [] };
      setLists([defaultList]);
      setActiveListId(defaultList.id);
    }
  };

  const activeList = lists.find((list) => list.id === activeListId);

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        {lists.map((list) => (
          <div
            key={list.id}
            style={{
              ...styles.tab,
              backgroundColor: list.id === activeListId ? '#444' : '#333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
            }}
          >
            <input
              value={list.name}
              onChange={(e) => renameList(list.id, e.target.value)}
              style={{ ...styles.input, margin: 0, flex: 1 }}
            />
            <button
              onClick={() => deleteList(list.id)}
              style={styles.deleteListButton}
              title="Delete List"
            >
              x
            </button>
          </div>
        ))}
        <button onClick={addList} style={styles.addListButton}>
          + Add List
        </button>
      </div>

      <div style={styles.main}>
        <h1 style={styles.title}>Essential To-Do List</h1>
        <h2 style={styles.subtitle}>
          {activeList?.name ? `> Current Section: ${activeList.name}` : ''}
        </h2>

        {activeList && (
          <>
            <div style={styles.inputRow}>
              <input
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Enter new task"
                style={styles.input}
              />
              <button onClick={addTask} style={styles.button}>
                Add
              </button>
            </div>

            <ul style={styles.taskList}>
              {activeList.tasks.map((task) => (
                <li key={task.id} style={styles.taskItem}>
                  <span>{task.text}</span>
                  <div style={styles.taskMeta}>
                    <small>{task.createdAt}</small>
                    <button onClick={() => deleteTask(task.id)} style={styles.deleteButton}>
                      ❌
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    backgroundColor: '#222',
    color: '#fff',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  sidebar: {
    width: '220px',
    backgroundColor: '#111',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  tab: {
    padding: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  addListButton: {
    padding: '5px',
    marginTop: '10px',
    backgroundColor: '#555',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteListButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px',
    lineHeight: '1',
    padding: '0 6px',
  },
  main: {
    flex: 1,
    padding: '30px 20px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '5px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#bbb',
    marginBottom: '20px',
  },
  inputRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #555',
    backgroundColor: '#333',
    color: '#fff',
    flex: 1,
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#444',
    border: 'none',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  taskList: {
    listStyle: 'none',
    padding: 0,
  },
  taskItem: {
    backgroundColor: '#333',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskMeta: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'red',
    borderRadius: '3px',
    padding: '0 6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '1',
  },
};

export default App;
