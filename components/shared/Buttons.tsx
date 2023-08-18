"use client";
import { useState } from "react";
import Image from "next/image";
import UniversalMessage from "./UniversalMessage";

interface Props{
    id: string,
}

function Buttons({id}: Props) {
  const [isClicked, setIsClicked] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Shared from My App",
          text: "Check out this thread!",
          url: `/thread/${id}`,
        });
        setIsClicked(!isClicked);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      console.log("Web Share API not supported");
    }
  };

  const handleCopyLink = () => {
    const textField = document.createElement("textarea");
    textField.value = `https://threads-app-sooty.vercel.app/thread/${id}`;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    setIsClicked(!isClicked);
    setShowMessage("Link copied to clipboard!");
    setTimeout(() => {
        setShowMessage("");
      }, 3000);
  };

  const handleMenuToggle = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <div className="relative inline-block">
        <Image
          src="/assets/share.svg"
          alt="share"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
          onClick={handleMenuToggle}
        />
        {isClicked && (
          <div className="absolute top-10 right-30 z-10 bg-dark-3 rounded-lg p-2 w-[200px]">
            <Image
              src="/assets/close.png"
              alt="close"
              id="close-share-button"
              width={40}
              height={40}
              className="absolute text-white py-1 px-2 rounded cursor-pointer right-0"
              onClick={handleMenuToggle}
            />
            <button
              className="text-base-regular text-light-2 px-1 rounded cursor-pointer mt-2"
              onClick={handleCopyLink}
            >
              Copy Thread Link
            </button>
            <div className="w-full h-[2px] mt-1 bg-dark-2"/>
            <button
              className="text-base-regular text-light-2 px-1 rounded cursor-pointer mt-2"
              onClick={handleShareClick}
            >
              Share Thread Via
            </button>
          </div>
        )}
        {showMessage && <UniversalMessage message={showMessage} />}
      </div>
    </>
  );
}

export default Buttons;