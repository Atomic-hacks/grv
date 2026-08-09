import React from "react";
import { motion as Motion } from "framer-motion";

const AnimatedPageTitle = ({ title, subtitle, className = "" }) => {
  return (
    <>
      <Motion.h2
        className={` inline-block text-6xl md:text-7xl font-semibold ${className}`}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, ease: [0.9, 0, 0.3, 1] }}
      >
        {title}
      </Motion.h2>

      {subtitle ? (
        <Motion.p
          className="overflow-hidden text-sm text-neutral-600 font-semibold"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, ease: [0.9, 0, 0.3, 1] }}
        >
          {subtitle}
        </Motion.p>
      ) : null}
    </>
  );
};

export default AnimatedPageTitle;
