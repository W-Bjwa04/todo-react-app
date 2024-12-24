import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'

function TodoItem({ todo }) {
  const { updateTodo, deleteTodo, toggleComplete } = useTodo()

  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.todo)

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg })
    setIsTodoEditable(false)
  }

  const toggleCompleted = () => {
    toggleComplete(todo.id)
  }

  return (
    <div
      className={`flex items-center gap-x-3 p-3 rounded-lg shadow-md transition duration-300 text-gray-800 ${
        todo.completed ? 'bg-green-100' : 'bg-pink-100'
      }`}
    >
      {/* Checkbox for Completion */}
      <input
        type="checkbox"
        className="cursor-pointer w-5 h-5 accent-green-500"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      
      {/* Editable Todo Text */}
      <input
        type="text"
        className={`flex-grow px-2 py-1 text-sm rounded-md outline-none transition ${
          isTodoEditable
            ? 'bg-white border border-gray-300 focus:ring-2 focus:ring-green-500'
            : 'bg-transparent border-none'
        } ${todo.completed ? 'line-through text-gray-500' : ''}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />

      {/* Edit/Save Button */}
      <button
        className={`w-8 h-8 flex items-center justify-center rounded-md border text-gray-600 hover:bg-gray-200 transition ${
          todo.completed ? 'cursor-not-allowed opacity-50' : ''
        }`}
        onClick={() => {
          if (todo.completed) return

          if (isTodoEditable) {
            editTodo()
          } else setIsTodoEditable((prev) => !prev)
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? '✔️' : '✏️'}
      </button>

      {/* Delete Button */}
      <button
        className="w-8 h-8 flex items-center justify-center rounded-md border text-red-500 hover:bg-red-100 transition"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  )
}

export default TodoItem
