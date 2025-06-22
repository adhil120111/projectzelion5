import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Offers from './components/Offers';
import ScrollVelocity from './components/ScrollVelocity';
import Contact from './components/Contact';
import './styles/beam-theme.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      
      <section id="home">
        <Home />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="products">
        <Products />
      </section>

      <section id="offers">
        <Offers />
      </section>

      <ScrollVelocity
        texts={["ZELION", "CRICKET", "CHAMPIONS"]}
        numCopies={8}
        velocity={60}
      />

      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}

export default App;