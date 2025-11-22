import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  padding = 'md',
  onClick,
  shadow = true 
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      onClick={onClick}
      className={`
        bg-white dark:bg-gray-900 rounded-xl
        ${shadow ? 'shadow-lg' : ''}
        ${hover ? 'hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer' : ''}
        ${paddings[padding]}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;