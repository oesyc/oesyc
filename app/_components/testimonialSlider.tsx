"use client";
import React, { useState, useEffect } from 'react';


type Testimonial = {
  name: string;
  profession: string;
  review: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'John Doe',
    profession: 'CEO at Example Corp',
    review: 'This is an amazing service! I highly recommend it to everyone. The team is incredibly professional and easy to work with. Our experience has been nothing short of exceptional, and the results have exceeded our expectations. I cannot imagine running my business without this service now.',
  },
  {
    name: 'Jane Smith',
    profession: 'Founder at Innovate Tech',
    review: 'An exceptional product that truly exceeded my expectations! The user interface is intuitive, the support team is responsive, and the features are exactly what we were looking for. We’ve been using this for months now, and it has dramatically improved our internal processes and overall productivity. I will continue to recommend it to my colleagues.',
  },
  {
    name: 'Samuel Lee',
    profession: 'CTO at Future Enterprises',
    review: 'A game-changer for our business. We saw immediate results after implementing this solution. The team at [Company Name] was helpful throughout the integration process, and the ongoing support has been top-notch. We’ve already noticed a significant improvement in efficiency and performance. This is the future of business operations!',
  },
  {
    name: 'Emily Clark',
    profession: 'CMO at Bright Ideas Co.',
    review: 'Highly professional and reliable. A must-have tool for any business. The level of customer care and attention to detail has been outstanding. The product has helped us streamline our marketing efforts, reduce errors, and track key metrics with ease. We’re more confident in our strategies thanks to this product.',
  },
];

const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);

  // Handle the transition to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle the transition to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Automatically transition to the next slide
  useEffect(() => {
    if (isAutoplay) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval); // Cleanup the interval on component unmount
    }
  }, [isAutoplay, currentIndex]);

  return (
    <div className="w-2/3 py-16 bg-white">
      <div className="mx-auto px-4">
        {/* Testimonial Slider */}
        <div className="relative overflow-hidden rounded-none bg-[#F2F2FF] shadow-lg">
          {/* Current Testimonial */}
          <div className="transition-transform duration-500 ease-in-out transform p-8 h-[300px]">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{testimonials[currentIndex].name}</h3>
                <p className="text-sm text-gray-600">{testimonials[currentIndex].profession}</p>
              </div>
              <div>
                <img
                  src="/quote.png" // Replace with the path to your image
                  alt="quote Icon"
                // Set size of the image
                />
              </div>
            </div>
            <div className="p-5">
              <p className="text-lg italic text-gray-700">{testimonials[currentIndex].review}</p>
            </div>
          </div>
          <div className='px-12 mt-[-30px] pb-8'>
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-3 rounded-lg text-white">
            <p className="text-sm text-white mt-2">Teams report a 20% reduction in time spent on task management, leading to heigher productivity</p>
          </div>
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute right-10 bottom-0 transform -translate-y-1/2 py-1 px-3 bg-opacity-50 bg-transparent text-black rounded-none border border-pink-800 mb-[-15px]"
            onClick={prevSlide}
          >
            &lt;
          </button>
          <button
            className="absolute right-0 bottom-0 transform -translate-y-1/2 py-1 px-3 bg-opacity-50 bg-transparent text-black rounded-none border border-pink-800 mb-[-15px]"
            onClick={nextSlide}
          >
            &gt;
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 mx-2 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-400'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
