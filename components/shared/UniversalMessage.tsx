import { useState, useEffect } from "react";

function UniversalMessage({ message }: { message: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [message]);

  return (
    <div
      className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300 bg-dark-3 text-base-regular text-light-2 rounded p-2`}
    >
      {message}
    </div>
  );
}

export default UniversalMessage;
