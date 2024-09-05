import { getTodos, getTodoCount } from "@/todos"
import Todos from "./Todos";

export default async function Home() {
  const todos = await getTodos()
  const todoCount = await getTodoCount()
  
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <main className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Server Action Todos</h1>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <Todos todos={todos} todoCount={todoCount} />
        </div>
      </main>
    </div>
  );
}
