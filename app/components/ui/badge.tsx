import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'muted';
}

export function Badge({ className = '', variant = 'default', children, ...props }: BadgeProps) {
  const variantClasses = {
    default: 'bg-blue-100 text-blue-700 border border-blue-200',
    success: 'bg-green-100 text-green-700 border border-green-200',
    muted: 'bg-gray-100 text-gray-600 border border-gray-200',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
