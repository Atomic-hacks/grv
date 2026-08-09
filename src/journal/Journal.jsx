import React from "react";
import { motion as Motion } from "framer-motion";
import AnimatedPageTitle from "../component/ui/AnimatedPageTitle";

const Journal = () => {
  const featuredArticles = [
    {
      id: 1,
      title: "Crafting Performance Wear",
      date: "04.01.2025",
      image: "/img/goth-2.jpg",
      alt: "Two models wearing performance casual wear",
      size: "large", // Takes up more space
    },
    {
      id: 2,
      title: "Timeless Comfort: The GRV Way",
      date: "05.04.2025",
      image: "/img/goth-7.jpg",
      alt: "Abstract gradient background",
      size: "small",
    },
    {
      id: 3,
      title: "The Value of Quality: Investing in Timeless Fashion",
      date: "06.12.2025",
      image: "/img/goth-9.jpg",
      alt: "Sunlit forest path",
      size: "small",
    },
  ];

  const regularArticles = [
    {
      id: 4,
      title: "Sustainable Materials: Cotton & Wool",
      date: "07.15.2025",
      image: "/img/goth-5.jpg",
      alt: "Natural cotton and wool materials",
    },
    {
      id: 5,
      title: "Behind the Seams: Our Production Process",
      date: "08.20.2025",
      image: "/img/goth-6.jpg",
      alt: "Clothing production process",
    },
    {
      id: 6,
      title: "Style Guide: Minimalist Wardrobe Essentials",
      date: "09.10.2025",
      image: "/img/goth-1.jpg",
      alt: "Minimalist wardrobe essentials",
    },
  ];

  const JournalCard = ({ article, size = "regular" }) => {
    const isLarge = size === "large";

    return (
      <Motion.article
        className="group relative cursor-pointer"
        whileHover="hover"
        initial="initial"
      >
        {/* Image Container */}
        <div
          className={`relative overflow-hidden rounded-[18px] bg-neutral ${isLarge ? "aspect-[4/5]" : "aspect-[4/3]"}`}
        >
          <img
            src={article.image}
            alt={article.alt}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>

        {/* Content */}
        <div className="mt-4 space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h3 className="display flex-1 text-2xl leading-[1]">
              {article.title}
            </h3>

            {/* Animated Arrow */}
            <Motion.div
              variants={{
                initial: { x: 0 },
                hover: { x: 4 },
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex-shrink-0 text-[#EF4824]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 10h10M12 7l3 3-3 3" />
              </svg>
            </Motion.div>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-xs uppercase tracking-[.12em] text-muted">
              {article.date}
            </p>

            {/* Optional icon/indicator for featured articles */}
            {isLarge && (
              <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#EF4824]/40">
                <div className="h-2 w-2 rounded-full bg-[#EF4824]" />
              </div>
            )}
          </div>

          {/* Animated Underline */}
          <Motion.div
            className="h-px origin-left bg-[#EF4824]"
            variants={{
              initial: { scaleX: 0 },
              hover: { scaleX: 1 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </Motion.article>
    );
  };

  return (
    <main className="site-container py-16 md:py-24">
      {/* Section Title */}
      <div className="max-w-3xl">
        <p className="eyebrow">Notes from GRV</p>
        <div className="max-w-xl overflow-hidden">
          <AnimatedPageTitle
            title="Journal."
            className="mt-4 text-5xl md:text-7xl"
          />
        </div>
        <p className="mt-5 max-w-md text-sm leading-6 text-muted">
          Stories on movement, materials, and the pieces that stay in rotation.
        </p>
      </div>

      {/* Featured Label */}
      <p className="eyebrow mt-14 mb-6">Featured stories</p>

      {/* Featured Articles Grid - 2 Equal Columns */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 mb-20 md:mb-28">
        {/* Large Featured Article - Takes 1 column */}
        <div>
          <JournalCard article={featuredArticles[0]} size="large" />
        </div>

        {/* Two Small Featured Articles - Side by side in 1 column */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
          <JournalCard article={featuredArticles[1]} size="small" />
          <JournalCard article={featuredArticles[2]} size="small" />
        </div>
      </div>

      {/* Regular Articles Grid - 3 Equal Columns */}
      <div className="border-t border-black/10 pt-8">
        <p className="eyebrow mb-6">More from the journal</p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {regularArticles.map((article) => (
            <JournalCard key={article.id} article={article} size="regular" />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Journal;
