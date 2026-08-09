import React from "react";
import { motion as Motion } from "framer-motion";

const RevealImage = ({
  src,
  alt = "",
  className = "",
  revealDuration = 2.1,
  ease = [0.8, 0, 0.3, 1],
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Motion.div
        className="absolute inset-0"
        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: revealDuration, ease }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </Motion.div>
    </div>
  );
};

export default RevealImage;
