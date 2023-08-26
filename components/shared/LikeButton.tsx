"use client"
import Image from "next/image";
import { useState } from "react";

interface Props {
  currentUserLiked: boolean;
}

function LikeButton({ currentUserLiked }: Props) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLiked = () => {
    setIsLiked(!isLiked);
  };

  // Define CSS classes for the heart icon based on the liked state
  const heartIconClasses = `cursor-pointer object-contain transform transition-transform duration-1000 ${
    currentUserLiked || isLiked
      ? "pop-up"
      : "push-down"
  }`;

  return (
    <>
      <Image
        src={
          currentUserLiked || isLiked
            ? "/assets/heart-filled.svg"
            : "/assets/heart-gray.svg"
        }
        alt="heart"
        width={24}
        height={24}
        className={heartIconClasses}
        onClick={handleLiked}
      />
    </>
  );
}

export default LikeButton;
