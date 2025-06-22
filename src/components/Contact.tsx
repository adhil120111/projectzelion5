import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Phone, MapPin, ExternalLink, UploadCloud, MessageCircle } from 'lucide-react';

function Contact() {
  const contactItems = [
    {
      title: "Email Us",
      content: "Reach out to our team anytime for inquiries or support.",
      linkText: "contact@zelioncricket.com",
      link: "mailto:contact@zelioncricket.com",
      icon: <Mail size={24} />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Follow Us",
      content: "Stay updated with our latest gear drops and cricket insights.",
      linkText: "@zelioncricket",
      link: "https://instagram.com/zelioncricket",
      icon: <Instagram size={24} />,
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Customer Support",
      content: "Need help with an order? Our support team is here to assist.",
      linkText: "support@zelioncricket.com",
      link: "mailto:support@zelioncricket.com",
      icon: <Phone size={24} />,
      color: "from-yellow-500 to-yellow-500"
    },
    {
      title: "Our Location",
      content: "Visit our headquarters in the heart of Mumbai's cricket district.",
      linkText: "Zelion HQ, Mumbai, India",
      link: "https://maps.google.com",
      icon: <MapPin size={24} />,
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Official Website",
      content: "Visit our official site for the complete Zelion experience.",
      linkText: "zelioncricket.com",
      link: "https://zelioncricket.com/",
      icon: <UploadCloud size={24} />,
      color: "from-red-500 to-red-500"
    },
    {
      title: "Chat With Us",
      content: "Stay connected for more updates and instant support.",
      linkText: "@zelioncricket",
      link: "https://web.whatsapp.com",
      icon: <MessageCircle size={24} />,
      color: "from-green-500 to-emerald-500"
    },
  ];

  return (
    <section className="contact-section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="contact-header"
        >
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Have questions or feedback? We'd love to hear from you and help you 
            find the perfect cricket gear for your game.
          </p>
        </motion.div>

        <div className="contact-grid">
          {contactItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="contact-card"
            >
              <div className={`contact-icon bg-gradient-to-br ${item.color}`}>
                {item.icon}
              </div>
              <h3 className="contact-title">{item.title}</h3>
              <p className="contact-description">{item.content}</p>
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-link"
              >
                {item.linkText}
                <ExternalLink size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;