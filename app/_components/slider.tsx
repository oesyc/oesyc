"use client";
import React, { useState, useEffect } from 'react';
import { FaTasks, FaUserFriends, FaChartLine, FaCogs } from 'react-icons/fa';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const features = [
  {
    icon: <FaTasks size={40} className="text-blue-500" />,
    title: "Task Management",
    description: "Effortlessly organize, prioritize, and assign tasks to team members. With features like custom labels, due dates, and checklists, you can streamline your workflow and focus on what truly matters to ensure nothing falls through the cracks.",
  },
  {
    icon: <FaUserFriends size={40} className="text-green-500" />,
    title: "Team Collaboration",
    description: "Work seamlessly with your team using real-time updates and collaboration tools. Share progress, discuss tasks, and tag members for instant communication and efficient team alignment across projects.",
  },
  {
    icon: <FaChartLine size={40} className="text-purple-500" />,
    title: "Progress Tracking",
    description: "Monitor the overall progress of your projects through visual analytics and progress bars. Easily identify bottlenecks, track task completion, and ensure that your projects stay on schedule.",
  },
  {
    icon: <FaCogs size={40} className="text-red-500" />,
    title: "Customizable Workflow",
    description: "Adapt Oesyc to your team's unique workflow with customizable boards, columns, and cards. Tailor your project management to match the way your team operates, ensuring flexibility and control over every aspect.",
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? features.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  // Select three slides to display at a time
  const visibleSlides = [
    features[currentIndex],
    features[(currentIndex + 1) % features.length],
    features[(currentIndex + 2) % features.length],
  ];

  return (
    <div className="relative w-full flex justify-center items-center mt-10 px-4">
      {/* Container for the three slides */}
      <div className="flex space-x-4">
        {visibleSlides.map((feature, index) => (
          <div
            key={index}
            className="w-80 h-80 bg-slate-100 rounded-lg shadow-lg flex flex-col items-start p-6 text-left"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Arrows for manual navigation */}
      <div className="absolute right-4 bottom-[-30px] flex space-x-2">
        <button onClick={goToPrevSlide} className="p-1 bg-transparent border border-pink-600 rounded-none">
          <AiOutlineLeft size={24} />
        </button>
        <button onClick={goToNextSlide} className="p-1 bg-transparent border border-fuchsia-800 rounded-none">
          <AiOutlineRight size={24} />
        </button>
      </div>
    </div>
    
  );
};

export default Slider;
