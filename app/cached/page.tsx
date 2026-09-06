import React from 'react';
import TodoCachedApp from './components/TodoCachedApp';
import { getTodos } from '@/lib/todos';

export default async function CachedPage() {
  const todos = await getTodos();

  return (
    <main className="min-h-screen p-6 md:p-10 bg-white text-dark-70">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="bg-white p-6 md:p-8 rounded-xl">
          <header className="mb-8 border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              Daftar Tugas (Todo List)
            </h1>
          </header>

          <TodoCachedApp initialTodos={todos} />
        </div>
      </div>
    </main>
  );
}

