"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import UniversalMessage from "./UniversalMessage";

interface Props {
  id: string;
}

function RepostButton({ id }: Props) {
  const [showMessage, setShowMessage] = useState("");

  const handleRepostClick = async () => {
    setShowMessage("Reposting...");
    setTimeout(() => {
      setShowMessage("");
    }, 3000); 
  };

  return (
    <>
      <Link href={`/repost/${id}`}>
        <Image
          src="/assets/repost.svg"
          alt="heart"
          width={22}
          height={22}
          className="cursor-pointer object-contain transition"
          onClick={handleRepostClick}
        />
      </Link>
      {showMessage && <UniversalMessage message={showMessage} />}
    </>
  );
}

export default RepostButton;
