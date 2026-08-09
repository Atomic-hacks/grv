import React from "react";

const Journalcard = ({ img, alt, title, time }) => {
  return (
    <div className="w-full h-[450px]">
      <div className="relative overflow-hidden size-full">
        <img
          src={img || ""}
          alt={alt || title}
          className="object-cover size-full"
        />
      </div>

      <div className="flex w-full justify-between pt-4">
        <p className=" text-neutral-800 font-semibold">{title}</p>
      </div>
      <div className="flex w-full justify-between pt-4">
        <p className="text-gray-600 text-xs font-semibold">{time}</p>
      </div>
    </div>
  );
};

export default Journalcard;
