/**
 * @file Ratings - Interactive star rating component.
 * @description Renders a row of 5 clickable star buttons. Filled stars (FaStar) indicate
 * the active rating; empty stars (FaRegStar) indicate unselected. Supports
 * controlled usage via the rating prop and change notification via onRatingChange.
 *
 * @props
 *   - rating {number} - Current rating value (1-5). Syncs to internal state on change.
 *   - onRatingChange {(rating: number) => void} - Callback when a star is clicked.
 *
 * @dependencies
 *   - @/components/ui/button (Button) - Ghost-styled clickable star buttons.
 *   - react-icons/fa (FaStar, FaRegStar) - Filled and outline star icons.
 */
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

type RatingProps = {
  rating?: number;
  onRatingChange?: (rating: number) => void;
};

const Ratings: React.FC<RatingProps> = ({ rating, onRatingChange }) => {
  const [activeRating, setActiveRating] = useState(0);

  const handleStarClick = (starValue: number) => {
    setActiveRating(starValue);
    onRatingChange?.(starValue);
  };

  useEffect(() => {
    if (rating) {
      setActiveRating(rating);
    }
  }, [rating]);

  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => i + 1).map((item) => (
        <Button
          type="button"
          variant="ghost"
          key={item}
          onClick={() => handleStarClick(item)}
          className="flex items-center space-x-1 px-2"
        >
          {activeRating >= item ? <FaStar color="#FFC107" /> : <FaRegStar />}
        </Button>
      ))}
    </div>
  );
};

export default Ratings;
