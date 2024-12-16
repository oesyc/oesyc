"use client";
import React, { useEffect, useState } from 'react';

const slides = [
  {
    heading: "Seamless Task Management",
    description: "Organize your tasks effortlessly with our intuitive drag-and-drop interface. Stay focused and boost your productivity with features designed for simplicity.",
    image: "/c1.webp",
  },
  {
    heading: "Collaborative Workspaces",
    description: "Invite your team to collaborate in real-time. Share boards, assign tasks, and track progress together, no matter where you are.",
    image: "/c2.webp",
  },
  {
    heading: "Customizable Boards",
    description: "Tailor your boards to fit your workflow. Choose from various templates or create your own to manage projects, track goals, or plan events.",
    image: "/c3.webp",
  },
  {
    heading: "Real-Time Notifications",
    description: "Stay updated with instant notifications. Get alerts for task assignments, comments, and updates, so you never miss an important change.",
    image: "/c4.webp",
  },
];

const HeadingSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex bg-white p-8 w-[80%] items-center">
      <div className="flex flex-col space-y-4 w-1/2 relative mr-10">
        {slides.map((slide, index) => (
          <div key={index} className="flex items-start relative">
            {activeIndex === index && (
              <div className="absolute left-0 h-full w-1 border-l-4 border-fuchsia-800" />
            )}
            <div className={`flex flex-col ${activeIndex === index ? 'pl-4' : ''}`}>
              <h2
                className={`text-xl font-bold transition-transform duration-300 ${
                  activeIndex === index
                    ? 'text-3xl bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'
                    : 'text-neutral-500 text-light pb-8 pt-2 border-b border-[#6432FF]'
                }`}
              >
                {slide.heading}
              </h2>
              {activeIndex === index && (
                <p className="text-black mt-2">{slide.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/2 h-1/2 flex justify-center items-center">
        <img
          src={slides[activeIndex].image}
          alt={slides[activeIndex].heading}
          className="w-70 h-70 object-cover transition-opacity duration-300"
        />
      </div>
    </div>
  );
};

export default HeadingSlider;
