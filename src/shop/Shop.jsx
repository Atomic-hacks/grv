import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../component/ui/Card";
import { products as allProducts, formatPrice } from "../data/products";
import { useCart } from "../context/CartContext";

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const categories = [
    "All",
    "Tops",
    "Bottoms",
    "Outerwear",
    "Accessories",
    "New",
    "Summer 2025",
  ];
  const filtered =
    activeCategory === "All"
      ? allProducts
      : activeCategory === "New"
        ? allProducts.filter((item) => item.isNew)
        : allProducts.filter((item) => item.category === activeCategory);
  const shuffledProducts = [...filtered].sort(
    (a, b) =>
      ([...a.id].reduce((n, c) => n + c.charCodeAt(0), 0) % 17) -
      ([...b.id].reduce((n, c) => n + c.charCodeAt(0), 0) % 17),
  );
  return (
    <main>
      <section className="site-container pt-5 md:pt-7">
        <div className="relative min-h-[500px] overflow-hidden rounded-[28px] bg-black md:min-h-[610px]">
          <img
            src="/img/goth-1.jpg"
            alt="GRV new season"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
          <div className="relative flex min-h-[500px] max-w-2xl flex-col justify-end p-7 text-white md:min-h-[610px] md:p-12">
            <p className="text-xs font-medium uppercase tracking-[.18em] text-[#ff7a1a]">
              Spring / summer 2026
            </p>
            <h1 className="display mt-4 text-5xl uppercase md:text-7xl">
              Make your
              <br />
              <span className="text-[#EF4824]">own</span> momentum.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/80">
              Performance-ready essentials with a street-level point of view.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#catalogue"
                className="rounded-full bg-[#EF4824] px-6 py-3 text-sm font-medium transition hover:bg-[#f25735]"
              >
                Shop the drop
              </a>
              <Link
                to="/brand"
                className="rounded-full border border-white/60 px-6 py-3 text-sm font-medium transition hover:bg-white/20 hover:text-black"
              >
                The GRV story
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="catalogue" className="site-container py-20 md:py-32">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside>
            <p className="eyebrow">Collections</p>
            <h2 className="display mt-3 text-4xl">All products</h2>
            <p className="mt-4 text-sm leading-6 text-muted">
              Explore the pieces made for your next move.
            </p>
            <label className="mt-8 block text-xs font-medium uppercase tracking-[.12em] text-muted">
              Collection
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="mt-3 w-full appearance-none rounded-full border border-black/15 bg-white px-5 py-3 text-sm text-black outline-none focus:border-[#e85d04]"
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </label>
            <div className="mt-6 hidden flex-col items-start gap-3 lg:flex">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-sm ${activeCategory === category ? "text-[#e85d04]" : "text-muted hover:text-black"}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </aside>
          <div>
            <div className="mb-6 flex justify-between border-b border-black/10 pb-4 text-sm">
              <span>{shuffledProducts.length} products</span>
              <span className="text-muted">Curated order</span>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 xl:grid-cols-3">
              {shuffledProducts.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/shop/${item.id}`)}
                >
                  <Card
                    img={item.image}
                    hoverImg={item.hoverImage}
                    alt={item.name}
                    title={item.name}
                    price={formatPrice(item.price)}
                    onQuickAdd={() => addToCart(item, 1)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
