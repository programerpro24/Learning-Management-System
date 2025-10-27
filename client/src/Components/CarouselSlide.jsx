import React, { useState, useEffect, useRef } from "react";

//Reusable Slide Component
const Slide = ({ image, title, description }) => (
  <div className="relative flex-shrink-0 w-full h-[400px]">
    <img
      src={image}
      alt={title}
      className="w-[325px] rounded-full m-auto"
    />
    <div className="absolute bottom-0 left-0 bg-black/60 text-white p-4 w-full">
      <h3 className="text-xl font-semibold text-center">{title}</h3>
      <p className="text-sm text-center">{description}</p>
    </div>
  </div>
);

//Main Carousel Component
const CarouselSlide = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef();

  // ⚙️ Define functions first
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // ⚙️ Assign autoplay function once
  useEffect(() => {
    autoPlayRef.current = nextSlide;
  }, [nextSlide]);

  // 🎞️ Auto-slide interval
  useEffect(() => {
    const play = () => {
      if (autoPlayRef.current) autoPlayRef.current();
    };
    const interval = setInterval(play, 4000);
    return () => clearInterval(interval);
  }, []);

 
  return (
    
    <div className="relative w-full overflow-hidden rounded-[50px] shadow-lg">
      <div className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <Slide key={index} {...slide} />
        ))}
    </div>

    
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/50 hover:bg-black/80 rounded-full p-2 transition"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/50 hover:bg-black/80 rounded-full p-2 transition"
      >
        ❯
      </button>
    </div>
  );
};

export default CarouselSlide;


