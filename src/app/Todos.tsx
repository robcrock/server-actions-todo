"use client"

import { Todo } from "@/todos"
import { useState } from "react"

import { addTodo, deleteTodo, updateTodo } from "@/todos"

export default function Todos({todos, todoCount}: {todos: Todo[], todoCount: number}) {
  const [newTodo, setNewTodo] = useState("")
  const [editingTodo, setEditingTodo] = useState<string | null>(null)
  const [editText, setEditText] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodo(newTodo)
    setNewTodo("")
  }

  const handleDelete = (id: string) => {
    deleteTodo(id)
  }

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo.id)
    setEditText(todo.title)
  }

  const handleUpdate = (id: string) => {
    updateTodo(id, { title: editText })
    setEditingTodo(null)
    setEditText("")
  }

  const handleToggleComplete = (todo: Todo) => {
    updateTodo(todo.id, { completed: !todo.completed })
  }

  return (
    <div className="space-y-6">
      <p className="text-gray-800 font-medium">Total Todos: {todoCount}</p>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="bg-gray-50 p-3 rounded-md shadow-sm text-gray-800 font-medium flex justify-between items-center">
            {editingTodo === todo.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-grow px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <span className={todo.completed ? "line-through" : ""}>
                {todo.title}
              </span>
            )}
            <div className="space-x-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo)}
                className="mr-2"
              />
              {editingTodo === todo.id ? (
                <button
                  onClick={() => handleUpdate(todo.id)}
                  className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(todo)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(todo.id)}
                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
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
