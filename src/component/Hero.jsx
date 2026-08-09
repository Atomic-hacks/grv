import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "./ui/Card";
import { products, formatPrice } from "../data/products";
import { useCart } from "../context/CartContext";
import { HiArrowUpRight } from "react-icons/hi2";

const Arrow = () => <HiArrowUpRight aria-hidden="true" className="inline-block text-base" />;

export default function Hero() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const arrivals = products.slice(0, 3);
  const slides = [
    "/img/hero3.jpg",
    "/img/hero1.jpg",

    "/img/hero4.jpg",
    "/img/hero5.jpg",
    "/img/hero6.jpg",
    "/img/hero7.jpg",

    "/img/hero9.jpg",
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(
      () => setActiveSlide((slide) => (slide + 1) % slides.length),
      5500,
    );
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <main>
      <section className="mx-auto w-[calc(100%-40px)] pt-5 md:w-[80vw] md:pt-7">
        <div className="relative min-h-[580px] overflow-hidden rounded-[18px] bg-neutral md:h-[80vh] md:min-h-0">
          {slides.map((src, index) => (
            <img
              key={src}
              src={src}
              alt="GRV seasonal collection"
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${index === activeSlide ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative flex min-h-[580px] flex-col justify-between p-7 text-white md:h-[80vh] md:min-h-0 md:p-11">
            <div>
              <p className="text-xs font-medium tracking-[.16em] uppercase">
                The new uniform
              </p>
              <h1 className="display mt-5 max-w-4xl text-5xl uppercase md:text-7xl lg:text-[78px]">
                Designed for the
                <br />
                <span className="text-[#EF4824]">world in motion.</span>
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <Link
                className="rounded-full bg-white/20 px-6 py-3 text-sm font-medium text-black transition duration-300 hover:bg-[#EF4824] hover:text-white"
                to="/shop"
              >
                Shop collection
              </Link>
              <Link
                className="border-b border-white hover:text-[#ef4824] pb-1 text-sm"
                to="/brand"
              >
                Our approach <Arrow />
              </Link>
            </div>
            <div className="absolute bottom-7 right-7 flex gap-2 md:bottom-11 md:right-11">
              {slides.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Show slide ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2 rounded-full transition-all ${index === activeSlide ? "w-7 bg-[#EF4824]" : "w-2 bg-white/70"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-container py-24 md:py-36">
        <div className="mb-9 flex items-end justify-between gap-6 md:mb-12">
          <div>
            <p className="eyebrow">Featured</p>
            <h2 className="display mt-3 text-4xl md:text-5xl">New arrivals</h2>
            <p className="mt-3 text-sm text-muted">
              Modern staples, made to be lived in.
            </p>
          </div>
          <Link to="/shop" className="editorial-link shrink-0">
            View all <Arrow />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-3">
          {arrivals.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/shop/${item.id}`)}
              className="cursor-pointer"
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
      </section>

      <section className="site-container pb-24 md:pb-36">
        <div className="mb-9 text-center md:mb-12">
          <p className="eyebrow">Explore</p>
          <h2 className="display mt-3 text-4xl md:text-5xl">Shop by mood</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Link
            to="/shop/tops"
            className="group relative min-h-[500px] overflow-hidden rounded-[16px] bg-neutral md:min-h-[640px]"
          >
            <img
              src="/img/hero9.jpg"
              alt="Tops collection"
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7 text-white md:p-9">
              <h3 className="display text-4xl">
                Everyday
                <br />
                layers
              </h3>
              <span className="rounded-full border border-white px-4 py-2 text-sm">
                Shop <Arrow />
              </span>
            </div>
          </Link>
          <div className="grid gap-5">
            <Link
              to="/shop/bottoms"
              className="group relative min-h-[305px] overflow-hidden rounded-[16px] bg-neutral"
            >
              <img
                src="/img/hero5.jpg"
                alt="Bottoms collection"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-7 text-white">
                <h3 className="display text-3xl">Built to move</h3>
                <Arrow />
              </div>
            </Link>
            <Link
              to="/shop/summer"
              className="group relative min-h-[305px] overflow-hidden rounded-[16px] bg-[#EF4824] p-7 text-white"
            >
              <img
                src="/img/hero4.jpg"
                alt="Summer edit"
                className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-multiply transition duration-500 group-hover:scale-[1.04]"
              />
              <div className="relative flex h-full flex-col justify-between">
                <p className="text-xs uppercase tracking-[.14em]">
                  Summer 2025
                </p>
                <h3 className="display text-4xl">
                  The light
                  <br />
                  side of utility <Arrow />
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-off-white py-24 md:py-32">
        <div className="site-container grid items-center gap-12 md:grid-cols-2">
          <div className="overflow-hidden rounded-[16px] bg-neutral">
            <img
              src="/img/goth-4.jpg"
              alt="GRV garments in the studio"
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </div>
          <div className="max-w-lg md:px-10">
            <p className="eyebrow">The everyday edit</p>
            <h2 className="display mt-4 text-4xl md:text-5xl">
              Essential, but never ordinary.
            </h2>
            <p className="mt-6 max-w-md leading-7 text-muted">
              Easy silhouettes, considered material choices and an
              unapologetically individual point of view.
            </p>
            <Link to="/brand" className="editorial-link mt-8">
              Meet GRV <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-neutral py-24 text-center md:py-32">
        <div className="site-container max-w-4xl">
          <p className="text-2xl text-[#EF4824]">★★★★★</p>
          <blockquote className="display mt-7 text-3xl leading-tight md:text-5xl">
            “Clothes that feel unmistakably like you — without having to try too
            hard.”
          </blockquote>
          <p className="mt-7 text-sm">— Nia A., Lagos</p>
        </div>
      </section>

      <section className="site-container grid divide-y divide-black/10 py-14 md:grid-cols-4 md:divide-x md:divide-y-0 md:py-20">
        <div className="py-6 md:px-8 md:first:pl-0">
          <p className="font-medium">Free shipping</p>
          <p className="mt-2 text-sm text-muted">On orders over $200</p>
        </div>
        <div className="py-6 md:px-8">
          <p className="font-medium">Easy returns</p>
          <p className="mt-2 text-sm text-muted">30 days, no fuss</p>
        </div>
        <div className="py-6 md:px-8">
          <p className="font-medium">Premium support</p>
          <p className="mt-2 text-sm text-muted">Here when you need us</p>
        </div>
        <div className="py-6 md:px-8">
          <p className="font-medium">Secure payments</p>
          <p className="mt-2 text-sm text-muted">Encrypted checkout</p>
        </div>
      </section>
    </main>
  );
}
