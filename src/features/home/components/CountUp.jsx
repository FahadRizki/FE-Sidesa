"use client";

import { useState, useEffect } from "react";

const CountUp = ({ end, duration = 2000, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function for smoother animation
      const easeOutCubic = 1 - Math.pow(1 - percentage, 3);
      const currentCount = Math.floor(easeOutCubic * end);

      setCount(currentCount);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  // Format number with dots for thousands separator
  const formattedCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <span>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
};

export default CountUp;
