import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiArrowUpRight } from "react-icons/hi2";
import Card from "../component/ui/Card";
import {
  formatPrice,
  productService,
  shopNavigation,
} from "../catalog/productService";
import { useCart } from "../context/CartContext";

const Arrow = () => <HiArrowUpRight aria-hidden="true" />;

export default function ShopHub() {
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  useEffect(() => {
    let active = true;
    productService.getFeatured(5).then((items) => {
      if (active) setFeatured(items);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <main>
      <section className="site-container pt-5 md:pt-7">
        <div className="grid min-h-[560px] overflow-hidden rounded-[24px] bg-[#0a0a0a] text-white lg:grid-cols-[.92fr_1.08fr]">
          <div className="flex flex-col justify-between p-8 md:p-12 lg:p-16">
            <p className="text-xs uppercase tracking-[.18em] text-[#EF4824]">
              GRV / Shopping
            </p>
            <div>
              <h1 className="display text-6xl uppercase leading-[.88] md:text-8xl">
                Your next
                <br />
                move starts
                <br />
                <span className="text-[#EF4824]">here.</span>
              </h1>
              <p className="mt-7 max-w-sm text-sm leading-6 text-white/65">
                Enter through a category, a mood, a brand, or the pieces
                currently setting the pace.
              </p>
            </div>
            <Link
              to="/category/featured"
              className="group flex items-center gap-2 text-sm"
            >
              Start with the edit <Arrow />
            </Link>
          </div>
          <div className="relative min-h-[340px]">
            <img
              src="/img/goth-7.jpg"
              alt="GRV shopping campaign"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
      <section className="site-container py-10 md:py-14">
        <p className="mb-4 text-[10px] uppercase tracking-[.16em] text-muted">
          Browse the shop
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
          {shopNavigation.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              className="shrink-0 border border-black/15 rounded-full px-4 py-2 text-xs uppercase tracking-[.1em] transition hover:border-[#EF4824] hover:bg-[#EF4824] hover:text-white"
            >
              {label}
            </Link>
          ))}
          <Link
            to="/shop-by"
            className="shrink-0 rounded-full border  border-[#EF4824] bg-[#EF4824] px-4 py-2 text-xs uppercase tracking-[.1em] text-white"
          >
            Shop by
          </Link>
        </div>
      </section>
      <section className="site-container py-16 md:py-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="eyebrow">Featured collection</p>
            <h2 className="display mt-3 text-4xl md:text-5xl">
              Selected for now.
            </h2>
          </div>
          <Link to="/category/featured" className="group editorial-link">
            Shop featured <Arrow />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 xl:grid-cols-5">
          {featured.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer"
              onClick={() => navigate(`/shop/${item.slug}`)}
            >
              <Card
                img={item.image}
                hoverImg={item.hoverImage}
                title={item.name}
                brand="GRV"
                badge={item.status?.isNew ? "New" : undefined}
                price={formatPrice(item.price)}
                onQuickAdd={() => addToCart(item, 1)}
              />
            </div>
          ))}
        </div>
      </section>
      <section className="site-container grid gap-4 pb-24 md:grid-cols-3 md:pb-32">
        <Link
          to="/category/new-arrivals"
          className="group relative min-h-[410px] overflow-hidden rounded-[20px]"
        >
          <img
            src="/img/goth-girl4.jpg"
            alt="New arrivals"
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 text-white">
            <p className="text-xs uppercase tracking-[.14em]">Fresh in</p>
            <h2 className="display mt-2 text-4xl">
              New arrivals <Arrow />
            </h2>
          </div>
        </Link>
        <Link
          to="/category/brands"
          className="group relative min-h-[410px] overflow-hidden rounded-[20px]"
        >
          <img
            src="/img/goth-towers.jpg"
            alt="Brand discovery"
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 text-white">
            <p className="text-xs uppercase tracking-[.14em]">Know the names</p>
            <h2 className="display mt-2 text-4xl">
              Brands <Arrow />
            </h2>
          </div>
        </Link>
        <Link
          to="/shop-by"
          className="group relative min-h-[410px] overflow-hidden rounded-[20px] bg-[#EF4824]"
        >
          <img
            src="/img/goth-flowers.jpg"
            alt="Shop by mood"
            className="absolute inset-0 h-full w-full object-cover opacity-55 mix-blend-multiply transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="relative flex h-full flex-col justify-end p-7 text-white">
            <p className="text-xs uppercase tracking-[.14em]">
              Find your point of view
            </p>
            <h2 className="display mt-2 text-4xl">
              Shop by <Arrow />
            </h2>
          </div>
        </Link>
      </section>
    </main>
  );
}
