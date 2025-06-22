import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

function Home() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="home-section">
      <div className="home-content">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="home-text"
        >
          <div className="home-badge">
            <Star className="badge-icon" size={16} />
            <span>Premium Cricket Gear</span>
          </div>
          
          <h1 className="home-title">
            Crafted for
            <span className="title-gradient"> Champions</span>
          </h1>
          
          <p className="home-subtitle">
            Experience the perfect blend of innovation, quality, and performance. 
            Zelion cricket gear is designed for players who demand excellence.
          </p>
          
          <div className="home-buttons">
            <button 
              className="btn-primary"
              onClick={() => scrollToSection('products')}
            >
              Explore Products
              <ArrowRight size={18} />
            </button>
            <button 
              className="btn-secondary"
              onClick={() => scrollToSection('about')}
            >
              Our Story
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="home-visual"
        >
          <div className="hero-image-container">
            <img 
              src="/images/product-kit.png" 
              alt="Zelion Cricket Equipment" 
              className="hero-image"
            />
            <div className="hero-glow"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Home;