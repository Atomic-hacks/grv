import React from "react";
import { FaPlus } from "react-icons/fa";

const Card = ({
  img,
  hoverImg,
  alt,
  price,
  title,
  brand,
  badge,
  onQuickAdd,
}) => (
  <article className="group w-full">
    <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200 rounded-3xl">
      <img
        src={img || "/img/short.png"}
        alt={alt || title}
        loading="lazy"
        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.02] group-hover:opacity-0"
      />

      <img
        src={hoverImg || img}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 ease-out group-hover:scale-[1.02] group-hover:opacity-100"
      />

      {badge && (
        <span className="absolute left-4 top-4 border border-black/20 bg-white/90 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[.16em] text-black backdrop-blur-sm">
          {badge}
        </span>
      )}

      <button
        type="button"
        onClick={async (event) => {
          event.stopPropagation();

          try {
            await onQuickAdd?.();

            alert(`${title} has been added to your cart.`);
          } catch (error) {
            console.error("Failed to add item to cart:", error);
            alert("Sorry, we couldn't add this item to your cart.");
          }
        }}
        className="absolute rounded-full flex justify-center items-center gap-6 bottom-4 left-4 right-4 border border-white/0 bg-white/95 py-2.5 text-[11px] font-medium uppercase tracking-[.14em] text-black opacity-0 backdrop-blur-sm transition-all duration-300 ease-out translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#EF4824] hover:text-white"
      >
        Quick add
        <FaPlus />
      </button>
    </div>

    <div className="mt-4 border-t border-black/10 pt-3">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[10px] uppercase tracking-[.18em] text-muted">
          {brand || "GRV"}
        </p>

        <p className="shrink-0 text-[14px] font-semibold tabular-nums text-muted">
          {price}
        </p>
      </div>

      <p className="mt-1.5 text-[14px] font-light leading-snug tracking-[.01em] sm:text-[15px]">
        {title}
      </p>
    </div>
  </article>
);
export default Card;
