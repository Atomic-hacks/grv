import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiArrowUpRight } from "react-icons/hi2";
import Card from "./ui/Card";
import { FlipWords } from "./ui/flip-words";
import {
  formatPrice,
  productService,
  shopNavigation,
} from "../catalog/productService";
import { useCart } from "../context/CartContext";

const Arrow = () => (
  <HiArrowUpRight
    aria-hidden="true"
    className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
  />
);

const pressLogos = ["VOGUE", "GQ", "HYPEBEAST", "COMPLEX", "DAZED", "WWD"];

const socialGrid = [
  "/img/goth-1.jpg",
  "/img/goth-4.jpg",
  "/img/goth-boy.jpg",
  "/img/goth-girl3.jpg",
  "/img/goth-girl4.jpg",
  "/img/goth-towers.jpg",
];

export default function Hero() {
  const [arrivals, setArrivals] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [brands, setBrands] = useState([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    let active = true;
    productService.search({ sort: "newest", limit: 4 }).then((result) => {
      if (active) setArrivals(result.items);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    productService.getFeatured(4).then((items) => {
      if (active) setFeatured(items);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    productService.getBrands().then((items) => {
      if (active) setBrands(items);
    });
    return () => {
      active = false;
    };
  }, []);

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    // TODO: wire to real newsletter provider — currently just a local confirmation state
    setSubscribed(true);
  };

  return (
    <main>
      {/* ---------- HERO ---------- */}
      <section className="site-container pt-5 md:pt-7">
        <div className="grid min-h-[620px] overflow-hidden rounded-[24px] bg-black text-white lg:grid-cols-[1.12fr_.88fr] lg:min-h-[720px]">
          <div className="relative min-h-[410px] lg:order-2 lg:min-h-0">
            <img
              src="/img/goth-1.jpg"
              alt="GRV seasonal campaign"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-7 text-[10px] uppercase tracking-[.18em] text-white/75 lg:left-9">
              GRV / Spring Summer 2026
            </p>
          </div>
          <div className="flex flex-col justify-between p-7 md:p-10 lg:p-14">
            <p className="text-xs uppercase tracking-[.18em] text-[#EF4824]">
              The new uniform
            </p>
            <div className="py-14 lg:py-0">
              <h1 className="display max-w-xl text-5xl uppercase leading-[.9] md:text-7xl xl:text-8xl">
                Built for
                <br />
                the <span className="text-[#EF4824]">world</span>
                <br />
                in motion.
              </h1>
              <p className="mt-7 max-w-sm text-sm leading-6 text-white/70">
                Performance-ready essentials with a street-level point of view.
                Made to move through every version of the day.
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-white/20 pt-5">
              <Link
                to="/shop"
                className="group flex items-center gap-2 text-sm font-medium"
              >
                Shop the collection <Arrow />
              </Link>
              <span className="text-xs text-white/55">01 / 03</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- QUICK CATEGORY NAV ---------- */}
      <section className="site-container py-12 md:py-16">
        <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
          {shopNavigation.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              className="shrink-0 rounded-full border border-black/15 px-4 py-2 text-xs uppercase tracking-[.1em] transition hover:border-black hover:bg-black hover:text-white"
            >
              {label}
            </Link>
          ))}
          <Link
            to="/shop-by"
            className="shrink-0 rounded-full bg-[#EF4824] px-4 py-2 text-xs uppercase tracking-[.1em] text-white"
          >
            Shop by
          </Link>
        </div>
      </section>

      {/* ---------- NEW ARRIVALS ---------- */}
      <section className="site-container pb-24 md:pb-32">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="eyebrow">New in</p>
            <h2 className="display mt-3 text-4xl md:text-5xl">
              The current edit
            </h2>
          </div>
          <Link
            to="/category/new-arrivals"
            className="group editorial-link hidden sm:flex"
          >
            View all <Arrow />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">
          {arrivals.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer"
              onClick={() => navigate(`/shop/${item.slug}`)}
            >
              <Card
                img={item.image}
                hoverImg={item.hoverImage}
                alt={item.name}
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

      {/* ---------- CATEGORY FOCUS BANNERS ---------- */}
      <section className="site-container pb-24 md:pb-32">
        <div className="grid gap-4 lg:grid-cols-2">
          <Link
            to="/category/tops"
            className="group relative min-h-[520px] overflow-hidden rounded-[22px] bg-neutral"
          >
            <img
              src="/img/hero9.jpg"
              alt="GRV tops collection"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7 text-white md:p-9">
              <div>
                <p className="text-xs uppercase tracking-[.16em] text-white/70">
                  Category focus
                </p>
                <h2 className="display mt-2 text-5xl">
                  Layers
                  <br />
                  that lead.
                </h2>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/50">
                <Arrow />
              </span>
            </div>
          </Link>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Link
              to="/category/bottoms"
              className="group relative min-h-[250px] overflow-hidden rounded-[22px] bg-[#EF4824] p-7 text-white"
            >
              <img
                src="/img/hero5.jpg"
                alt="GRV bottoms collection"
                className="absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-multiply transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="relative flex h-full flex-col justify-between">
                <p className="text-xs uppercase tracking-[.16em]">
                  Built to move
                </p>
                <h2 className="display text-4xl">
                  The pace
                  <br />
                  collection <Arrow />
                </h2>
              </div>
            </Link>
            <Link
              to="/shop-by"
              className="group relative min-h-[250px] overflow-hidden rounded-[22px] bg-black p-7 text-white"
            >
              <img
                src="/img/goth-girl3.jpg"
                alt="GRV style story"
                className="absolute inset-0 h-full w-full object-cover opacity-45 transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="relative flex h-full flex-col justify-between">
                <p className="text-xs uppercase tracking-[.16em] text-[#EF4824]">
                  Discovery
                </p>
                <h2 className="display text-4xl">
                  Find your
                  <br />
                  point of view <Arrow />
                </h2>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- BRAND SPOTLIGHT ---------- */}
      {brands.length > 0 && (
        <section className="bg-black py-24 text-white md:py-32">
          <div className="site-container">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="eyebrow text-white/50">The roster</p>
                <h2 className="display mt-3 text-4xl md:text-5xl">
                  Labels we back.
                </h2>
              </div>
              <Link
                to="/category/brands"
                className="group editorial-link hidden text-white sm:flex"
              >
                All brands <Arrow />
              </Link>
            </div>
            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0">
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  to={`/brand/${brand.slug}`}
                  className="group relative aspect-[3/4] w-[70vw] shrink-0 snap-start overflow-hidden rounded-[18px] sm:w-[280px] lg:w-[320px]"
                >
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-lg font-medium uppercase tracking-[.08em] text-white">
                      {brand.name}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/65">
                      {brand.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- EDITORIAL / CAMPAIGN STORY ---------- */}
      <section className="relative min-h-[640px] overflow-hidden md:min-h-[760px]">
        <img
          src="/img/goth-towers.jpg"
          alt="GRV editorial campaign"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent" />
        <div className="site-container relative flex min-h-[640px] items-end pb-16 md:min-h-[760px] md:items-center md:pb-0">
          <div className="max-w-lg text-white">
            <p className="text-xs uppercase tracking-[.18em] text-[#EF4824]">
              The story
            </p>
            <h2 className="display mt-5 text-5xl leading-[.95] md:text-6xl">
              Motion is
              <br />
              the material.
            </h2>
            <p className="mt-6 text-sm leading-7 text-white/75">
              Every piece in this season's edit was built on the same brief:
              nothing that holds you back. We worked with pattern cutters who
              think in movement first, fabric second — the result is a wardrobe
              that keeps pace with wherever your day takes you.
            </p>
            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-2 border-b border-white/50 pb-1 text-sm font-medium"
            >
              Read the full story <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- FEATURED / THE EDIT ---------- */}
      {featured.length > 0 && (
        <section className="site-container py-24 md:py-32">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="eyebrow">Staff picks</p>
              <h2 className="display mt-3 text-4xl md:text-5xl">
                Editors' selects
              </h2>
            </div>
            <Link
              to="/category/featured"
              className="group editorial-link hidden sm:flex"
            >
              View all <Arrow />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">
            {featured.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer"
                onClick={() => navigate(`/shop/${item.slug}`)}
              >
                <Card
                  img={item.image}
                  hoverImg={item.hoverImage}
                  alt={item.name}
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
      )}

      {/* ---------- SHOP BY MOOD / STYLE / BRAND ---------- */}
      <section className="bg-off-white py-24 md:py-32">
        <div className="site-container grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="eyebrow">Shop by</p>
            <h2 className="display mt-4 text-5xl leading-none md:text-6xl">
              Your{" "}
              <FlipWords
                words={["mood", "brand", "style", "occasion", "weather"]}
                duration={2600}
              />
              .
            </h2>
            <p className="mt-6 max-w-sm leading-7 text-muted">
              Start with a feeling, a setting or a point of view. The catalogue
              follows your lead.
            </p>
            <Link
              to="/shop-by"
              className="group editorial-link mt-8 inline-flex"
            >
              Explore your shopping options <Arrow />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              to="/shop/mood/relaxed"
              className="group relative min-h-[310px] overflow-hidden rounded-[20px]"
            >
              <img
                src="/img/goth-4.jpg"
                alt="Relaxed mood"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 px-5 pb-5 pt-14 text-sm uppercase tracking-[.12em] text-white">
                Mood
              </span>
            </Link>
            <Link
              to="/shop/style/streetwear"
              className="group relative min-h-[310px] overflow-hidden rounded-[20px]"
            >
              <img
                src="/img/goth-boy.jpg"
                alt="Streetwear style"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 px-5 pb-5 pt-14 text-sm uppercase tracking-[.12em] text-white">
                Style
              </span>
            </Link>
            <Link
              to="/category/brands"
              className="group relative min-h-[310px] overflow-hidden rounded-[20px]"
            >
              <img
                src="/img/goth-towers.jpg"
                alt="GRV brands"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 px-5 pb-5 pt-14 text-sm uppercase tracking-[.12em] text-white">
                Brands
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- PRESS / AS SEEN IN ---------- */}
      <section className="border-y border-black/10 py-10">
        <div className="site-container">
          <p className="mb-6 text-center text-[10px] uppercase tracking-[.18em] text-muted">
            As seen in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-60">
            {pressLogos.map((name) => (
              <span
                key={name}
                className="text-sm font-semibold uppercase tracking-[.14em]"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SOCIAL / INSTAGRAM GRID ---------- */}
      <section className="site-container py-24 md:py-32">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="eyebrow">Community</p>
            <h2 className="display mt-3 text-4xl md:text-5xl">@grv.official</h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="group editorial-link hidden sm:flex"
          >
            Follow along <Arrow />
          </a>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-6">
          {socialGrid.map((src, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden rounded-[10px]"
            >
              <img
                src={src}
                alt="GRV community post"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
            </a>
          ))}
        </div>
      </section>

      {/* ---------- NEWSLETTER ---------- */}
      <section className="bg-black py-20 text-white md:py-28">
        <div className="site-container flex flex-col items-center text-center">
          <p className="text-xs uppercase tracking-[.18em] text-[#EF4824]">
            Stay in motion
          </p>
          <h2 className="display mt-4 max-w-lg text-4xl md:text-5xl">
            First access to drops, restocks and the odd surprise.
          </h2>
          {subscribed ? (
            <p className="mt-8 text-sm text-white/80">
              You're on the list — welcome to GRV.
            </p>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email address"
                className="w-full flex-1 rounded-full border border-white/25 bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-[#EF4824] px-6 py-3 text-sm font-medium transition hover:bg-[#f25735]"
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="mt-4 text-[11px] text-white/40">
            No spam, unsubscribe anytime.
          </p>
        </div>
      </section>
    </main>
  );
}
