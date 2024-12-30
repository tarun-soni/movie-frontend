import React from 'react';

const ShowRating = ({ value }: { value: number }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center">
        <span className="text-sm font-medium text-primary">
          {value.toFixed(1)}
        </span>
        <span className="text-sm font-medium text-muted-foreground">★</span>
      </div>
    </div>
  );
};

export default ShowRating;
