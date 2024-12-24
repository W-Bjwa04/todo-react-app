import { useEffect, useState } from "react"
import { TodoProvider } from "./contexts"
import { TodoForm, TodoItem } from "./components"

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    )
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="min-h-screen py-10 transition-colors duration-300 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-gray-900 dark:text-gray-100">
          <h1 className="text-3xl font-bold text-center mb-6">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="divide-y divide-gray-300 dark:divide-gray-700">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <div key={todo.id} className="py-3">
                  <TodoItem todo={todo} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">No todos yet. Add your first one!</p>
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
