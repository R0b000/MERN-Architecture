import React, { useState, useEffect } from 'react';
import './Carousel.css';
import { CarouselProps } from './Carousel.types';

export const Carousel: React.FC<CarouselProps> = ({ children, autoplay = false, autoplaySpeed = 3000, className = '' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;

  useEffect(() => {
    if (autoplay && totalSlides > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, autoplaySpeed);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplaySpeed, totalSlides]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) > minSwipeDistance) {
      distance > 0 ? nextSlide() : prevSlide();
    }
  };

  return (
    <div className={`carousel ${className}`} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div className="carousel__track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="carousel__slide">{slide}</div>
        ))}
      </div>
      {totalSlides > 1 && (
        <>
          <button className="carousel__nav carousel__nav--prev" onClick={prevSlide}>‹</button>
          <button className="carousel__nav carousel__nav--next" onClick={nextSlide}>›</button>
          <div className="carousel__indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`carousel__indicator ${index === currentSlide ? 'carousel__indicator--active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
