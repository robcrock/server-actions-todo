"use client"

import { Todo } from "@/todos"
import { useState } from "react"

import {addTodo} from "@/todos"

export default function Todos({todos, todoCount}: {todos: Todo[], todoCount: number}) {
  const [newTodo, setNewTodo] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodo(newTodo)
    setNewTodo("")
  }

  return (
    <div className="space-y-6">
      <p className="text-gray-800 font-medium">Total Todos: {todoCount}</p>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="bg-gray-50 p-3 rounded-md shadow-sm text-gray-800 font-medium">
            {todo.title}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 placeholder-gray-400"
          placeholder="Add a new todo"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add
        </button>
      </form>
    </div>
  )
}
