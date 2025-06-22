import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  TrendingUp, 
  ShieldCheck, 
  Hammer, 
  Leaf, 
  Globe,
  Users,
  Trophy,
  Target,
  Zap,
  Heart,
  Award
} from 'lucide-react';

function About() {
  const features = [
    {
      title: "Player-Centric Design",
      description: "Every product is crafted with feedback from professionals to ensure comfort and control.",
      icon: <Lightbulb size={28} />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Cutting-Edge Innovation",
      description: "Advanced materials and precision engineering set us apart in durability and performance.",
      icon: <TrendingUp size={28} />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Uncompromised Quality",
      description: "Each item undergoes strict quality checks to meet elite international standards.",
      icon: <ShieldCheck size={28} />,
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Craftsmanship & Precision",
      description: "Hand-finished products built by experienced artisans for accuracy and finesse.",
      icon: <Hammer size={28} />,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Sustainable Manufacturing",
      description: "Eco-conscious sourcing and processes reflect our responsibility to the planet.",
      icon: <Leaf size={28} />,
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Trusted Worldwide",
      description: "Relied upon by international players and leagues across continents.",
      icon: <Globe size={28} />,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Community Driven",
      description: "Built by cricketers, for cricketers. Our community shapes every product we create.",
      icon: <Users size={28} />,
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Championship Legacy",
      description: "Trusted by champions in over 50 countries and used in major tournaments worldwide.",
      icon: <Trophy size={28} />,
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Performance Analytics",
      description: "Data-driven design using advanced analytics to optimize every aspect of performance.",
      icon: <Target size={28} />,
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Lightning Fast Service",
      description: "Express delivery and instant customer support to keep you in the game.",
      icon: <Zap size={28} />,
      color: "from-violet-500 to-purple-500"
    },
    {
      title: "Passion for Cricket",
      description: "Our love for the game drives everything we do, from design to delivery.",
      icon: <Heart size={28} />,
      color: "from-red-500 to-pink-500"
    },
    {
      title: "Award Winning Design",
      description: "Recognized globally for innovation and excellence in sports equipment design.",
      icon: <Award size={28} />,
      color: "from-emerald-500 to-green-500"
    },
  ];

  return (
    <section className="about-section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="about-header"
        >
          <h2 className="section-title">About Zelion</h2>
          <p className="section-subtitle">
            Zelion isn't just a cricket brand—it's a statement of elite performance, 
            refined design, and innovation. Crafted for champions, our gear blends 
            modern technology with timeless craftsmanship.
          </p>
        </motion.div>

        <div className="bento-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bento-card"
            >
              <div className={`feature-icon bg-gradient-to-br ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;