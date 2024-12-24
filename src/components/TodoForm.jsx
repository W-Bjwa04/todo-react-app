import React, { useState } from 'react'
import { useTodo } from '../contexts'

function TodoForm() {

  const [todo, setTodo] = useState("")

  const { addTodo } = useTodo()
  
  const add = (e) => {
    e.preventDefault()

    if (!todo) return 

    addTodo({ todo, completed: false })

    setTodo("")
  }

  return (
    <form 
      onSubmit={add} 
      className="flex items-center justify-center gap-2 p-4 bg-gray-100 shadow-md rounded-lg"
    >
      <input
        type="text"
        placeholder="Write your task here..."
        className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none duration-200 focus:ring-2 focus:ring-green-500 bg-white shadow-sm text-black placeholder-gray-400"
        value={todo}
        onChange={(event) => setTodo(event.target.value)}
      />
      <button 
        type="submit" 
        className="rounded-lg px-5 py-2 bg-green-600 text-white font-semibold hover:bg-green-700 transition duration-200 shadow-md"
      >
        Add
      </button>
    </form>
  )
}

export default TodoForm
