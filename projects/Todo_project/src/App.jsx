import { useState } from "react";
import { Sparkles, Trash2 } from "lucide-react";
import { useEffect } from "react";
import "./App.css";
function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [taskText, setTaskText] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    setTodos([...todos, { id: Date.now(), text: taskText, completed: false }]);
    setTaskText("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <main className="app">
      <div className="blob blob-one"></div>
      <div className="blob blob-two"></div>
      <section className="todo-card">
        <div className="hero-icon">
          <Sparkles size={28} />
        </div>
        <p className="eyebrow">Daily Focus</p>
        <h1>Todo App</h1>
        <p className="subtitle">Plan, track, and finish your tasks.</p>

        <div className="stats">
          <span>Total: {totalTodos}</span>
          <span>Completed: {completedTodos}</span>
        </div>

        <form className="todo-form" onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Add a new task..."
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />{" "}
          <button>Add</button>
        </form>

        <div className="filters">
          <button
            type="button"
            className={filter === "all" ? "active-filter" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            type="button"
            className={filter === "active" ? "active-filter" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            type="button"
            className={filter === "completed" ? "active-filter" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        {todos.length === 0 && (
          <div className="empty-state">
            <p>No tasks yet</p>
            <small>Add your first task to start your day.</small>
          </div>
        )}

        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <li key={todo.id} className={todo.completed ? "completed" : ""}>
              <button
                className="check-btn"
                type="button"
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.completed ? "✓" : ""}
              </button>
              <span>{todo.text}</span>
              <button
                className="delete-btn"
                type="button"
                onClick={() => deleteTodo(todo.id)}
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
