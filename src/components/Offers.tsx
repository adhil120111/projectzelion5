/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  Star, 
  Trophy, 
  Target,
  Shield,
  Zap,
  Gift,
  Percent,
  Clock,
  Crown,
  Award,
  Users,
  Sparkles
} from 'lucide-react';

interface EmailFormData {
  email: string;
  selectedOffer?: string;
}

function Offers() {
  const [formData, setFormData] = useState<EmailFormData>({
    email: '',
    selectedOffer: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // 3x3 Bento Grid Offers (9 cards total)
  const offers = [
    {
      id: 'elite-pro-bundle',
      title: "Elite Pro Bundle",
      discount: "25% OFF",
      description: "Complete cricket kit with premium bat, pads, and gloves for professional players",
      originalPrice: "₹45,999",
      offerPrice: "₹34,499",
      icon: <Trophy size={24} />,
      color: "from-yellow-500 to-orange-500",
      badge: "Best Value",
      features: ["Premium English Willow Bat", "Professional Pads & Gloves", "Complete Protection Set"],
      type: "product"
    },
    {
      id: 'professional-bat-series',
      title: "Professional Bat Series",
      discount: "20% OFF",
      description: "Handcrafted English willow bats for serious players",
      originalPrice: "₹19,999",
      offerPrice: "₹15,999",
      icon: <Target size={24} />,
      color: "from-green-500 to-emerald-500",
      badge: "Limited Time",
      features: ["English Willow Wood", "Hand-Finished", "Professional Grade"],
      type: "product"
    },
    {
      id: 'guardian-protection-set',
      title: "Guardian Protection Set",
      discount: "30% OFF",
      description: "Complete protective gear including pads, helmet, and guards",
      originalPrice: "₹25,999",
      offerPrice: "₹18,199",
      icon: <Shield size={24} />,
      color: "from-blue-500 to-cyan-500",
      badge: "Popular",
      features: ["Lightweight Design", "Superior Protection", "Moisture-Wicking"],
      type: "product"
    },
    {
      id: 'speed-training-kit',
      title: "Speed Training Kit",
      discount: "15% OFF",
      description: "Professional training equipment for skill development",
      originalPrice: "₹12,999",
      offerPrice: "₹11,049",
      icon: <Zap size={24} />,
      color: "from-purple-500 to-indigo-500",
      badge: "New",
      features: ["Training Cones", "Speed Ladder", "Agility Equipment"],
      type: "product"
    },
    {
      id: 'champions-collection',
      title: "Champions Collection",
      discount: "35% OFF",
      description: "Exclusive gear used by international cricket champions",
      originalPrice: "₹55,999",
      offerPrice: "₹36,399",
      icon: <Crown size={24} />,
      color: "from-pink-500 to-rose-500",
      badge: "Exclusive",
      features: ["Championship Grade", "Limited Edition", "Signed Certificate"],
      type: "product"
    },
    {
      id: 'academy-starter-pack',
      title: "Academy Starter Pack",
      discount: "40% OFF",
      description: "Perfect starter kit for cricket academy students",
      originalPrice: "₹18,999",
      offerPrice: "₹11,399",
      icon: <Award size={24} />,
      color: "from-emerald-500 to-green-500",
      badge: "Student Special",
      features: ["Academy Approved", "Beginner Friendly", "Growth Kit"],
      type: "product"
    },
    {
      id: 'premium-membership',
      title: "Premium Membership",
      discount: "50% OFF",
      description: "Exclusive access to limited editions and early releases",
      originalPrice: "₹9,999/year",
      offerPrice: "₹4,999/year",
      icon: <Sparkles size={24} />,
      color: "from-violet-500 to-purple-500",
      badge: "VIP Access",
      features: ["Early Access", "Exclusive Discounts", "Priority Support"],
      type: "membership"
    },
    {
      id: 'wicket-keeper-special',
      title: "Wicket Keeper Special",
      discount: "28% OFF",
      description: "Complete wicket keeping gear with gloves, pads and helmet",
      originalPrice: "₹22,999",
      offerPrice: "₹16,559",
      icon: <Users size={24} />,
      color: "from-cyan-500 to-blue-500",
      badge: "Specialist",
      features: ["Keeper Gloves", "Leg Guards", "Protective Helmet"],
      type: "product"
    },
    {
      id: 'team-bulk-order',
      title: "Team Bulk Order",
      discount: "45% OFF",
      description: "Special pricing for cricket teams and academies",
      originalPrice: "₹1,25,000",
      offerPrice: "₹68,750",
      icon: <Star size={24} />,
      color: "from-red-500 to-pink-500",
      badge: "Team Deal",
      features: ["Minimum 11 Sets", "Custom Branding", "Free Delivery"],
      type: "bulk"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, email: value }));
    setError('');
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // EmailJS configuration
      const templateParams = {
        user_email: formData.email,
        selected_offer: formData.selectedOffer || 'Newsletter Subscription',
        to_email: 'adhiln968@gmail.com',
        message: `New subscription from: ${formData.email}${formData.selectedOffer ? ` - Selected Offer: ${formData.selectedOffer}` : ''}`,
        subject: 'New Newsletter Subscription - Zelion Cricket'
      };

      // Replace these with your actual EmailJS credentials
      const serviceId = 'your_service_id';
      const templateId = 'your_template_id';
      const publicKey = 'your_public_key';

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setIsSubmitted(true);
      setFormData({ email: '', selectedOffer: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Failed to send email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClaimOffer = (offerId: string, offerTitle: string) => {
    setFormData(prev => ({ ...prev, selectedOffer: offerTitle }));
    // Scroll to email form
    const emailForm = document.getElementById('email-subscription-form');
    emailForm?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderOfferCard = (offer: any, index: number) => {
    return (
      <motion.div
        key={offer.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="offer-card"
      >
        <div className="offer-badge">{offer.badge}</div>
        <div className={`offer-icon bg-gradient-to-br ${offer.color}`}>
          {offer.icon}
        </div>
        {offer.discount && <div className="offer-discount">{offer.discount}</div>}
        <h3 className="offer-title">{offer.title}</h3>
        <p className="offer-description">{offer.description}</p>
        
        {offer.features && (
          <div className="offer-features">
            {offer.features.map((feature: string, idx: number) => (
              <span key={idx} className="feature-tag">
                {feature}
              </span>
            ))}
          </div>
        )}
        
        {offer.originalPrice && (
          <div className="offer-pricing">
            <span className="original-price">{offer.originalPrice}</span>
            <span className="offer-price">{offer.offerPrice}</span>
          </div>
        )}
        
        <button 
          className="offer-button"
          onClick={() => handleClaimOffer(offer.id, offer.title)}
        >
          {offer.type === 'membership' ? 'Join Now' : 
           offer.type === 'bulk' ? 'Get Quote' : 'Claim Offer'}
        </button>
      </motion.div>
    );
  };

  return (
    <section className="offers-section">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="offers-header"
        >
          <div className="offers-badge">
            <Gift size={20} />
            <span>Exclusive Offers</span>
          </div>
          <h2 className="section-title">Glimpse to our assets</h2>
          <p className="section-subtitle">
            "Zelion balls changed the game for me!" - Pro Cricketer
          </p>
        </motion.div>

        {/* Centered Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="offers-image-container"
        >
          <img 
            src="/images/product-kit.png" 
            alt="Zelion Cricket Equipment" 
            className="offers-image"
          />
          <div className="image-glow"></div>
        </motion.div>

        {/* Email Subscription Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="email-subscription"
          id="email-subscription-form"
        >
          <div className="subscription-content">
            <div className="subscription-info">
              <h3 className="subscription-title">Stay Updated with Exclusive Offers</h3>
              <p className="subscription-description">
                Join our community of cricket enthusiasts and be the first to know about 
                new products, special discounts, and exclusive deals.
              </p>
              <div className="subscription-benefits">
                <div className="benefit-item">
                  <Percent size={16} />
                  <span>Early access to sales</span>
                </div>
                <div className="benefit-item">
                  <Gift size={16} />
                  <span>Exclusive member discounts</span>
                </div>
                <div className="benefit-item">
                  <Clock size={16} />
                  <span>New product notifications</span>
                </div>
              </div>
            </div>

            <div className="subscription-form-container">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="subscription-form">
                  {formData.selectedOffer && (
                    <div className="selected-offer-display">
                      <Gift size={16} />
                      <span>Selected: {formData.selectedOffer}</span>
                    </div>
                  )}
                  <div className="email-input-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="your@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="email-input"
                      disabled={isSubmitting}
                    />
                    <button 
                      type="submit" 
                      className="submit-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="spinner"></div>
                      ) : (
                        <Send size={18} />
                      )}
                    </button>
                  </div>
                  {error && (
                    <div className="error-message">
                      {error}
                    </div>
                  )}
                </form>
              ) : (
                <div className="success-message">
                  <CheckCircle size={48} />
                  <h4>Successfully Subscribed!</h4>
                  <p>Thank you for joining our community. Check your email for exclusive offers.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* 3x3 Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="offers-bento-grid"
        >
          {offers.map((offer, index) => renderOfferCard(offer, index))}
        </motion.div>
      </div>
    </section>
  );
}

export default Offers;