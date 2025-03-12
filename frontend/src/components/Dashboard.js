import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    let updatedTasks = tasks;
    if (filter === "completed") {
      updatedTasks = tasks.filter((task) => task.completed);
    } else if (filter === "pending") {
      updatedTasks = tasks.filter((task) => !task.completed);
    }
    if (searchQuery) {
      updatedTasks = updatedTasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredTasks(updatedTasks);
  }, [tasks, filter, searchQuery]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to continue.");
        return;
      }
      const response = await axios.get("http://localhost:5000/api/tasks/gettasks", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const saveTask = async () => {
    if (!title || !description || !dueDate) {
      setError("All fields are required.");
      return;
    }
    
    const token = localStorage.getItem("token");
    const taskData = { title, description, dueDate };

    try {
      if (editingTask) {
        await axios.put(`http://localhost:5000/api/tasks/edittask/${editingTask._id}`, taskData, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setEditingTask(null);
      } else {
        const response = await axios.post("http://localhost:5000/api/tasks/createtask", taskData, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setTasks([...tasks, response.data]);
      }
      
      setTitle("");
      setDescription("");
      setDueDate("");
      setShowForm(false);
      fetchTasks();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to save task. Please try again.");
    }
  };

  const editTask = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setShowForm(true);
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/tasks/deletetask/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const toggleTaskCompletion = async (task) => {
    try {
      const token = localStorage.getItem("token");
      const updatedTask = { ...task, completed: !task.completed };

      await axios.put(`http://localhost:5000/api/tasks/edittask/${task._id}`, updatedTask, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="task-manager-container">
      <h2 className="task-manager-title">Task Manager</h2>
      {error && <p className="task-error-message">{error}</p>}
      <button onClick={() => navigate("/login")} className="task-logout-btn">Logout</button>
      
      <div className="task-search-container">
        <input type="text" className="task-search-input" placeholder="Search tasks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button className="task-search-btn">Search</button>
        <button onClick={() => setShowForm(!showForm)} className="task-add-btn">{showForm ? "Cancel" : "Add Task"}</button>
      </div>

      {showForm && (
        <div className="task-form-container">
          <input type="text" className="task-input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="text" className="task-input" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="date" className="task-input" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          <button onClick={saveTask} className="task-submit-btn">{editingTask ? "Update Task" : "Save Task"}</button>
        </div>
      )}
      
      <div className="task-filter-container">
        <button onClick={() => setFilter("all")} className={`task-filter-btn ${filter === "all" ? "active" : ""}`}>All</button>
        <button onClick={() => setFilter("completed")} className={`task-filter-btn ${filter === "completed" ? "active" : ""}`}>Completed</button>
        <button onClick={() => setFilter("pending")} className={`task-filter-btn ${filter === "pending" ? "active" : ""}`}>Pending</button>
      </div>
      
      <ul className="task-list-container">
        {filteredTasks.map((task) => (
          <li key={task._id} className={`task-item ${task.completed ? "task-completed" : "task-pending"}`}>
            <div className="task-content">
            <input
              type="checkbox"
              className="task-checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task)}
            />
              <strong className="task-title">{task.title}</strong>
              <span className="task-description">{task.description}</span>
              <span className="task-date">{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="task-actions">
              <button onClick={() => editTask(task)} className="task-edit-btn">Edit</button>
              <button onClick={() => deleteTask(task._id)} className="task-delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
