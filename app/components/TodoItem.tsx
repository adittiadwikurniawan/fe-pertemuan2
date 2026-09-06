'use client';

import React from 'react';
import Link from 'next/link';
import { Todo } from '@/types/todo';

export type { Todo };

export default function TodoItem({ todo }: { todo: Todo }) {
  const inputId = `todo-${todo.id}`;

  return (
    <li
      className={`p-4 rounded-md border flex items-center justify-between gap-3 transition-colors ${
        todo.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          id={inputId}
          type="checkbox"
          checked={todo.completed}
          readOnly
          className="w-5 h-5 rounded text-blue-600 cursor-pointer accent-blue-600"
        />
        <label
          htmlFor={inputId}
          className={`text-base font-medium truncate cursor-pointer transition-all ${
            todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {todo.title}
        </label>
      </div>

      <Link
        href={`/task/${todo.id}`}
        className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline shrink-0"
      >
        Detail
      </Link>
    </li>
  );
}
