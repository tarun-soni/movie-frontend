'use client';

interface StarRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  isInteractive?: boolean;
}

export default function StarRating({
  value,
  onChange,
  isInteractive = false,
}: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex items-center space-x-1">
      {stars.map((star) => (
        <span
          key={star}
          onClick={() => isInteractive && onChange?.(star)}
          className={`text-lg ${isInteractive ? 'cursor-pointer' : ''} ${
            star <= value ? 'text-yellow-400' : 'text-gray-300'
          } hover:${isInteractive ? 'text-yellow-500' : ''}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
