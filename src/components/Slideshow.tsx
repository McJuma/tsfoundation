import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideProps {
  images: string[];
  texts?: string[];
  interval?: number; // in milliseconds
  autoPlay?: boolean;
  showControls?: boolean;
  className?: string;
}

const Slideshow = ({
  images = [
    "../src/assets/images/group-photo.jpg",
    "../src/assets/images/group-photo.jpg",
    "../src/assets/images/group-photo.jpg",
  ],
  texts = [
    "Supporting orphans and vulnerable children",
    "Building a brighter future together",
    "Join us in making a difference",
  ],
  interval = 5000,
  autoPlay = true,
  showControls = true,
  className = "",
}: SlideProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!autoPlay) return;

    const slideInterval = setInterval(nextSlide, interval);
    return () => clearInterval(slideInterval);
  }, [autoPlay, interval]);

  if (!images.length) return null;

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Slides */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
          style={{
            backgroundImage: `url(${image})`,
            filter: "brightness(0.4)",
          }}
        />
      ))}

      {/* Navigation controls */}
      {showControls && images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Slideshow;
