import React, { useState, useEffect } from "react";

function App() {
  const [lists, setLists] = useState(() => {
    const saved = localStorage.getItem("todo_lists");
    return saved ? JSON.parse(saved) : [{ id: Date.now(), name: "Default", tasks: [] }];
  });
  const [currentListId, setCurrentListId] = useState(lists[0]?.id || null);
  const [newListName, setNewListName] = useState("");
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    localStorage.setItem("todo_lists", JSON.stringify(lists));
  }, [lists]);

  const currentList = lists.find((list) => list.id === currentListId);

  const addList = () => {
    if (!newListName.trim()) return;
    const newList = { id: Date.now(), name: newListName.trim(), tasks: [] };
    setLists([...lists, newList]);
    setCurrentListId(newList.id);
    setNewListName("");
  };

  const renameList = (id, newName) => {
    setLists(
      lists.map((list) =>
        list.id === id ? { ...list, name: newName.trim() || list.name } : list
      )
    );
  };

  const addTask = () => {
    if (!taskText.trim()) return;
    const newTask = {
      id: Date.now(),
      text: taskText.trim(),
      time: new Date().toLocaleString(),
    };
    setLists(
      lists.map((list) =>
        list.id === currentListId
          ? { ...list, tasks: [...list.tasks, newTask] }
          : list
      )
    );
    setTaskText("");
  };

  const deleteTask = (taskId) => {
    setLists(
      lists.map((list) =>
        list.id === currentListId
          ? { ...list, tasks: list.tasks.filter((t) => t.id !== taskId) }
          : list
      )
    );
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <div
        style={{
          width: "220px",
          borderRight: "1px solid #ccc",
          padding: "20px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <h2>Task Lists</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {lists.map((list) => (
            <li key={list.id} style={{ marginBottom: "8px" }}>
              <input
                type="text"
                value={list.name}
                onChange={(e) => renameList(list.id, e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  fontWeight: list.id === currentListId ? "bold" : "normal",
                  cursor: "pointer",
                }}
                onClick={() => setCurrentListId(list.id)}
              />
            </li>
          ))}
        </ul>
        <div style={{ marginTop: "20px" }}>
          <input
            placeholder="New list name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            style={{ width: "100%", padding: "6px", boxSizing: "border-box" }}
          />
          <button
            onClick={addList}
            style={{ width: "100%", marginTop: "6px", padding: "8px" }}
          >
            Add List
          </button>
        </div>
      </div>

      <div style={{ flex: 1, padding: "20px" }}>
        <h1>{currentList?.name || "Select a List"}</h1>
        <div>
          <input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Enter new task"
            style={{ padding: "8px", width: "300px", marginRight: "10px" }}
          />
          <button onClick={addTask} style={{ padding: "8px 15px" }}>
            Add Task
          </button>
        </div>

        <ul style={{ marginTop: "20px" }}>
          {currentList?.tasks.map((task) => (
            <li
              key={task.id}
              style={{
                marginBottom: "10px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "6px",
              }}
            >
              <span>{task.text}</span>{" "}
              <small style={{ fontSize: "0.8rem", color: "#888" }}>
                (Added: {task.time})
              </small>{" "}
              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#ff5555",
                  color: "#fff",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                  padding: "2px 7px",
                }}
              >
                Delete
              </button>
            </li>
          ))}
          {currentList?.tasks.length === 0 && <p>No tasks yet.</p>}
        </ul>
      </div>
    </div>
  );
}

export default App;
