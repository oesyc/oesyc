"use client";

import { useEffect, useState } from "react";

const SnowEffect = () => {
  const [snowflakes, setSnowflakes] = useState<any[]>([]);

  // Generate random snowflakes on the client side
  useEffect(() => {
    const flakes = [...Array(50)].map(() => ({
      width: Math.random() * 6 + 4,
      height: Math.random() * 6 + 4,
      top: Math.random() * 100,
      left: Math.random() * 100,
      animationDuration: Math.random() * 2 + 2,
      animationDelay: Math.random() * 2,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="relative flex  h-[480px] bg-gradient-to-b from-blue-400 to-purple-500 overflow-hidden text-white items-center justify-center">
      <div className="absolute top-0 left-0 right-0 w-full h-[100px]">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 L10,40 L20,50 L30,30 L40,60 L50,40 L60,50 L70,30 L80,60 L90,50 L100,60 L100,0 L0,0 Z"
            fill="rgba(255,255,255,0.3)"
          />
        </svg>
      </div>
      {/* Snowing Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {snowflakes.map((flake, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-50 animate-fall"
            style={{
              width: `${flake.width}px`,
              height: `${flake.height}px`,
              top: `${flake.top}%`,
              left: `${flake.left}%`,
              animationDuration: `${flake.animationDuration}s`,
              animationDelay: `${flake.animationDelay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Add the text content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-2xl font-bold mb-2">Hi There!</h1>
        <p className="text-xl mb-6">Nice to see you</p>
        <h2 className="text-4xl font-semibold mb-4">Welcome</h2>
        <p className="text-lg max-w-md mx-auto">
          We're thrilled to have you here. Dive in and explore all the new features we have added for you. Enjoy your experience!
        </p>
      </div>

      {/* Bottom Wave using SVG */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-[100px]">
        <svg
          className="absolute bottom-0 left-0 w-full h-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C20,50 40,40 60,50 C80,60 100,40 100,40 L100,100 L0,100 Z"
            fill="rgba(255,255,255,0.3)"    
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SnowEffect;
