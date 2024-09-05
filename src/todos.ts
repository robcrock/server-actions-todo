"use server"

import fs from "node:fs/promises"
import {revalidateTag, unstable_cache} from "next/cache"

export interface Todo {
  id: string
  title: string
  completed: boolean
}

export async function getTodosFromFile(): Promise<Todo[]> {
  const file = await fs.readFile("todos.json", "utf-8")
  return JSON.parse(file)
}

export const getTodos = unstable_cache(getTodosFromFile, ["todo-list"], {
  tags: ["todo-list"],
})

export async function getTodoCount(): Promise<number> {
  const todos = await getTodos()
  return todos.length
}

export async function addTodo(title: string): Promise<Todo> {
  
  const todos = await getTodos()
  const newTodo: Todo = {
    id: Date.now().toString(),
    title,
    completed: false,
  }
  todos.push(newTodo)
  await fs.writeFile("todos.json", JSON.stringify(todos, null, 2))
  revalidateTag("todo-list")
  return newTodo
}

export async function deleteTodo(id: string): Promise<void> {
  const todos = await getTodos()
  const updatedTodos = todos.filter(todo => todo.id !== id)
  await fs.writeFile("todos.json", JSON.stringify(updatedTodos, null, 2))
  revalidateTag("todo-list")
}

export async function updateTodo(id: string, updates: Partial<Todo>): Promise<Todo> {
  const todos = await getTodos()
  const todoIndex = todos.findIndex(todo => todo.id === id)
  if (todoIndex === -1) {
    throw new Error("Todo not found")
  }
  todos[todoIndex] = { ...todos[todoIndex], ...updates }
  await fs.writeFile("todos.json", JSON.stringify(todos, null, 2))
  revalidateTag("todo-list")
  return todos[todoIndex]
}
