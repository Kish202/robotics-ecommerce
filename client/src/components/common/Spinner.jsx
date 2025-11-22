import React from 'react';

const Spinner = ({ size = 'md', className = '', fullScreen = false }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  };

  const spinner = (
    <div
      className={`
        ${sizes[size]}
        border-blue-600 border-t-transparent
        rounded-full animate-spin
        ${className}
      `}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Spinner;