'use client';

import React, { useState } from 'react';
import { TaskItem } from '@/types/api-todo';
import { todoService } from '@/services/todoService';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';

interface ApiTodoListProps {
  initialTasks: TaskItem[];
}

export default function ApiTodoList({ initialTasks }: ApiTodoListProps) {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);

  const handleToggleTask = async (id: number, currentCompleted: boolean) => {
    const targetStatus = !currentCompleted;

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: targetStatus } : t))
    );

    try {
      await todoService.updateTodoStatus(id, targetStatus);
    } catch (err) {
      console.warn('Simulasi update ke API DummyJSON gagal (fallback state):', err);
    }
  };

  const handleDeleteTask = async (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));

    try {
      await todoService.deleteTodo(id);
    } catch (err) {
      console.warn('Simulasi hapus ke API DummyJSON gagal (fallback state):', err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-dark-70">Daftar Tugas</h2>
        <span className="text-xs bg-gray-200 text-gray-600 px-2.5 py-1 rounded-full font-medium">
          {tasks.length} item
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <p className="text-sm text-gray-500">Tidak ada tugas.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id, task.completed)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600"
                />

                <div className="min-w-0 flex-1">
                  <p className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-dark-70'}`}>
                    {task.title}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="default">ID: #{task.id}</Badge>
                <Badge variant="default">User: {task.userId}</Badge>
                <Badge variant={task.completed ? 'success' : 'muted'}>
                  {task.completed ? 'Selesai' : 'Pending'}
                </Badge>
                <Button
                  type="button"
                  variant="destructive"
                  size="xs"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Hapus
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
