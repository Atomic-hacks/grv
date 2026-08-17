"use client";

import React, { useState } from "react";
import { cn } from "../../../lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }) => {
    const isHovered = hovered === index;

    return (
      <div
        role={card.onClick ? "link" : undefined}
        tabIndex={card.onClick ? 0 : undefined}
        onClick={card.onClick}
        onKeyDown={(event) => {
          if (card.onClick && (event.key === "Enter" || event.key === " "))
            card.onClick();
        }}
        onFocus={() => setHovered(index)}
        onBlur={() => setHovered(null)}
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "group relative rounded-3xl h-72 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 md:h-[28rem] transition-all duration-500 ease-out",
          hovered !== null && !isHovered && "opacity-60 scale-[0.98]",
        )}
      >
        <img
          src={card.src}
          alt={card.title}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out",
            isHovered && "scale-[1.04]",
          )}
        />

        {/* darkening scrim, strengthens on hover so text stays legible */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-90",
          )}
        />

        {/* content block: title always anchored, description reveals above it without overlapping */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 px-5 pb-5 pt-10 md:px-6 md:pb-6">
          <p
            className={cn(
              " font-semibold leading-6 text-white/85 transition-all duration-300 ease-out",
              isHovered
                ? "max-h-24 translate-y-0 opacity-100"
                : "max-h-0 -translate-y-1 opacity-0",
            )}
          >
            {card.description}
          </p>
          <p className="text-lg font-medium uppercase tracking-[.1em] text-white md:text-xl">
            {card.title}
          </p>
        </div>
      </div>
    );
  },
);

Card.displayName = "Card";

export function FocusCards({ cards }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
