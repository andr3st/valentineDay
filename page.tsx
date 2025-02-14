"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function ValentinePage() {
  const [noButtonStyle, setNoButtonStyle] = useState({
    position: "static" as "static" | "fixed",
    top: "auto",
    left: "auto",
  });
  const [hasAccepted, setHasAccepted] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const moveButton = () => {
    if (typeof window !== "undefined" && noButtonRef.current) {
      const buttonWidth = noButtonRef.current.clientWidth;
      const buttonHeight = noButtonRef.current.clientHeight;

      // Calcula el área disponible en la ventana
      const maxX = window.innerWidth - buttonWidth;
      const maxY = window.innerHeight - buttonHeight;

      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;

      setNoButtonStyle({
        position: "fixed",
        top: `${randomY}px`,
        left: `${randomX}px`,
      });
    }
  };

  const handleYesClick = () => {
    setHasAccepted(true);
  };

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center">
      <div className="w-full max-w-md p-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-8">
          {hasAccepted
            ? "Thank you for being my Valentine! ❤️"
            : "Will you be my Valentine?"}
        </h1>

        <div className="mb-8 relative">
          {/* GIF de pregunta */}
          <Image
            src="/images/valentine-question.gif"
            alt="Valentine Question GIF"
            width={300}
            height={200}
            className={`mx-auto transition-opacity duration-500 ${
              hasAccepted
                ? "opacity-0 absolute top-0 left-1/2 -translate-x-1/2"
                : "opacity-100"
            }`}
          />

          {/* GIF de celebración */}
          <Image
            src="/images/valentine-celebration.gif"
            alt="Valentine Celebration GIF"
            width={300}
            height={200}
            className={`mx-auto transition-opacity duration-500 ${
              hasAccepted
                ? "opacity-100"
                : "opacity-0 absolute top-0 left-1/2 -translate-x-1/2"
            }`}
          />
        </div>

        {!hasAccepted && (
          <div className="relative flex justify-center gap-4">
            <button
              onClick={handleYesClick}
              className="relative z-10 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded-lg transition-colors"
            >
              Yes
            </button>

            <button
              ref={noButtonRef}
              onMouseEnter={moveButton}
              style={noButtonStyle}
              className="z-0 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-8 rounded-lg transition-colors"
            >
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
