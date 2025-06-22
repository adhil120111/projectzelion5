import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Award, Shield, Zap } from 'lucide-react';

interface CarouselSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  badge: string;
  features: string[];
  price: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: "Elite Pro Cricket Bat",
    description: "Handcrafted from premium English willow, this bat delivers exceptional power and precision. Trusted by international players for its perfect balance and superior performance.",
    image: "https://images.pexels.com/photos/3657154/pexels-photo-3657154.jpeg/",
    badge: "Best Seller",
    features: ["English Willow", "Professional Grade", "Hand-Finished"],
    price: "₹15,999"
  },
  {
    id: 2,
    title: "Guardian Pro Pads",
    description: "Advanced protection technology meets comfort in these professional-grade batting pads. Lightweight yet durable, offering maximum mobility without compromising safety.",
    image: "https://images.pexels.com/photos/28759016/pexels-photo-28759016.jpeg",
    badge: "Premium",
    features: ["Lightweight Design", "Superior Protection", "Moisture-Wicking"],
    price: "₹8,999"
  },
  {
    id: 3,
    title: "Complete Cricket Kit",
    description: "Everything you need to dominate the field. This comprehensive kit includes our signature bat, protective gear, and premium accessories for the serious cricketer.",
    image: "https://images.pexels.com/photos/3800517/pexels-photo-3800517.jpeg",
    badge: "Complete Set",
    features: ["Full Equipment", "Professional Quality", "Travel Case Included"],
    price: "₹35,999"
  }
];

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="carousel-slide"
          >
            <div className="slide-content">
              <div className="slide-image-container">
                <img 
                  src={slides[currentSlide].image} 
                  alt={slides[currentSlide].title}
                  className="slide-image"
                />
                <div className="slide-badge">
                  <Star size={16} />
                  <span>{slides[currentSlide].badge}</span>
                </div>
              </div>
              
              <div className="slide-info">
                <h3 className="slide-title">{slides[currentSlide].title}</h3>
                <p className="slide-description">{slides[currentSlide].description}</p>
                
                <div className="slide-features">
                  {slides[currentSlide].features.map((feature, index) => (
                    <span key={index} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="slide-footer">
                  <span className="slide-price">{slides[currentSlide].price}</span>
                  <button className="slide-button">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button className="carousel-btn carousel-btn-prev" onClick={prevSlide}>
          <ChevronLeft size={24} />
        </button>
        
        <button className="carousel-btn carousel-btn-next" onClick={nextSlide}>
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'indicator-active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;