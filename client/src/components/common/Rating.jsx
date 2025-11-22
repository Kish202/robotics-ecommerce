import React from 'react';
import { Star } from 'lucide-react';

const Rating = ({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  showNumber = false,
  editable = false,
  onChange 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  const handleClick = (index) => {
    if (editable && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[...Array(maxRating)].map((_, index) => (
          <Star
            key={index}
            className={`
              ${sizes[size]}
              ${index < rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
              }
              ${editable ? 'cursor-pointer hover:scale-110 transition-transform' : ''}
            `}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      
      {showNumber && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;