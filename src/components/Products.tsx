import React from 'react';
import { motion } from 'framer-motion';
import Carousel from './Carousel';
import Stepper from './Stepper';

function Products() {
  return (
    <section className="products-section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="products-header"
        >
          <h2 className="section-title">Our Products</h2>
          <p className="section-subtitle">
            Explore our flagship cricket gear designed for champions who demand excellence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Carousel />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="stepper-section"
        >
          <Stepper />
        </motion.div>
      </div>
    </section>
  );
}

export default Products;