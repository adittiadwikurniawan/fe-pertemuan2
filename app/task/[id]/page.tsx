import React from 'react';
import TodoStateOnlyApp from './components/TodoStateOnlyApp';
import { getTodoDetail, getTodos } from '@/lib/todos';
import TaskNotFound from './components/TaskNotFound';
import TaskDetailCard from './components/TaskDetailCard';
export default async function TodoPage() {

  const initialTodos = await getTodos();
  return (
    <main className=" min-h-screen p-6 md:p-10 bg-white text-dark-70">
      <div className=" max-w-2x1 mx-auto space-y-6"> 
      <div className= " bg-white p-6 md:p-8 rounded 2x1 shadow-x1 border border-gray-70">
      <header className= "mb-6 border-b border-gray-100 pb-4">
        <h1 className= "text 2x1 md:text-3xl font-bold text-dark-70 text-center">
          Daftar Tugas (Todo List)</h1> 
      </header>

      </div>
      </div>
    </main>
  )
}

type DetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TodoPage({ params }: DetailPageProps) {
  const { id } = await params;
  const todo = await getTodoDetail(id);

  if (!todo) {
    return <TaskNotFound id={id} />;
  }

  return <TaskDetailCard todo={todo} />;
}
