"use client"
import Image from "next/image";
import { useState } from "react";

interface Props {
    currentUserLiked: boolean;
}

function LikeButton ({ currentUserLiked }: Props) {
    const [isLiked, setIsLiked] = useState(false)
    const handleLiked = ()=>{
        isLiked ? setIsLiked(false) : setIsLiked(true);
    }

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
                    className="cursor-pointer object-contain transition"
                    onClick={handleLiked}
                  />
        </>
    )
}

export default LikeButton;