import React from "react";

const Card = ({ img, hoverImg, alt, price, title, onQuickAdd }) => (
  <article className="group w-full">
    <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] bg-neutral sm:rounded-[14px]">
      <img src={img || "/img/short.png"} alt={alt || title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] group-hover:opacity-0" />
      <img src={hoverImg || img} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100" />
      <button type="button" onClick={(event) => { event.stopPropagation(); onQuickAdd?.(); }} className="absolute inset-x-0 bottom-0 translate-y-full bg-black py-2 text-xs text-white transition duration-300 group-hover:translate-y-0 hover:bg-[#EF4824] sm:py-3 sm:text-sm">Quick add</button>
    </div>
    <div className="mt-2 flex items-start justify-between gap-2 text-[12px] sm:mt-3 sm:gap-4 sm:text-[15px]"><p className="font-medium">{title}</p><p className="shrink-0 font-medium">{price}</p></div>
  </article>
);

export default Card;
