import React, { useRef, useLayoutEffect, useState } from 'react';
import { 
  motion, 
  useScroll, 
  useVelocity, 
  useTransform, 
  useMotionValue, 
  useSpring, 
  useAnimationFrame 
} from 'framer-motion';

interface ScrollVelocityProps {
  texts: string[];
  velocity?: number;
  numCopies?: number;
  className?: string;
}

function useElementWidth(ref: React.RefObject<HTMLElement>) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);

  return width;
}

function VelocityText({ 
  children, 
  baseVelocity = 100, 
  numCopies = 6,
  className = ""
}: {
  children: React.ReactNode;
  baseVelocity?: number;
  numCopies?: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(
    smoothVelocity,
    [0, 1000],
    [0, 5],
    { clamp: false }
  );

  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);

  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return "0px";
    const totalWidth = copyWidth * numCopies;
    const wrapped = ((v % totalWidth) + totalWidth) % totalWidth;
    return `${-wrapped}px`;
  });

  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const spans = [];
  for (let i = 0; i < numCopies; i++) {
    spans.push(
      <span 
        className={`scroll-text ${className}`} 
        key={i} 
        ref={i === 0 ? copyRef : null}
      >
        {children}
      </span>
    );
  }

  return (
    <div className="scroll-container">
      <motion.div className="scroll-inner" style={{ x }}>
        {spans}
      </motion.div>
    </div>
  );
}

function ScrollVelocity({ 
  texts = ["ZELION"], 
  velocity = 100, 
  numCopies = 6,
  className = ""
}: ScrollVelocityProps) {
  return (
    <section className="scroll-velocity-section">
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          numCopies={numCopies}
          className={className}
        >
          {text}
        </VelocityText>
      ))}
    </section>
  );
}

export default ScrollVelocity;