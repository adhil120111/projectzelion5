import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShoppingCart, CreditCard, Truck, Package } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'completed' | 'current' | 'upcoming';
}

const orderSteps: Step[] = [
  {
    id: 1,
    title: "Browse & Select",
    description: "Explore our premium cricket gear collection",
    icon: <ShoppingCart size={20} />,
    status: 'completed'
  },
  {
    id: 2,
    title: "Secure Payment",
    description: "Safe and encrypted payment processing",
    icon: <CreditCard size={20} />,
    status: 'completed'
  },
  {
    id: 3,
    title: "Quality Check",
    description: "Each item undergoes rigorous quality inspection",
    icon: <Package size={20} />,
    status: 'current'
  },
  {
    id: 4,
    title: "Fast Delivery",
    description: "Express shipping to your doorstep",
    icon: <Truck size={20} />,
    status: 'upcoming'
  }
];

function Stepper() {
  const [currentStep, setCurrentStep] = useState(2);

  const updateStepStatus = (steps: Step[], current: number): Step[] => {
    return steps.map((step, index) => ({
      ...step,
      status: index < current ? 'completed' : index === current ? 'current' : 'upcoming'
    }));
  };

  const stepsWithStatus = updateStepStatus(orderSteps, currentStep);

  return (
    <div className="stepper-container">
      <div className="stepper-header">
        <h3 className="stepper-title">Your Order Journey</h3>
        <p className="stepper-subtitle">Track your premium cricket gear from selection to delivery</p>
      </div>

      <div className="stepper-wrapper">
        {stepsWithStatus.map((step, index) => (
          <div key={step.id} className="step-container">
            <div className="step-connector-wrapper">
              <motion.div
                className={`step-circle ${step.status}`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {step.status === 'completed' ? (
                  <Check size={20} />
                ) : (
                  step.icon
                )}
              </motion.div>
              
              {index < stepsWithStatus.length - 1 && (
                <div className={`step-connector ${step.status === 'completed' ? 'completed' : ''}`}>
                  <motion.div
                    className="connector-progress"
                    initial={{ width: '0%' }}
                    animate={{ 
                      width: step.status === 'completed' ? '100%' : '0%' 
                    }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  />
                </div>
              )}
            </div>
            
            <motion.div
              className="step-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <h4 className={`step-title ${step.status}`}>{step.title}</h4>
              <p className="step-description">{step.description}</p>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="stepper-actions">
        <button 
          className="stepper-btn secondary"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous Step
        </button>
        <button 
          className="stepper-btn primary"
          onClick={() => setCurrentStep(Math.min(stepsWithStatus.length - 1, currentStep + 1))}
          disabled={currentStep === stepsWithStatus.length - 1}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

export default Stepper;