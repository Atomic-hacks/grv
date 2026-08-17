import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiArrowUpRight } from "react-icons/hi2";
import Card from "../component/ui/Card";
import {
  formatPrice,
  getBrandById,
  productService,
} from "../catalog/productService";
import { useCart } from "../context/CartContext";

// one row config per collection shown on the page — each owns its own fetch
const ROW_LIMIT = 8;

const collectionSources = [
  {
    key: "featured",
    label: "Featured",
    href: "/category/featured",
    fetchItems: () => productService.getFeatured(ROW_LIMIT),
  },
  {
    key: "new-arrivals",
    label: "New Arrivals",
    href: "/category/new-arrivals",
    fetchItems: () =>
      productService
        .search({ sort: "newest", limit: ROW_LIMIT })
        .then((result) => result.items),
  },
  {
    key: "tops",
    label: "Tops",
    href: "/category/tops",
    fetchItems: () =>
      productService
        .search({ categoryIds: ["tops"], limit: ROW_LIMIT })
        .then((result) => result.items),
  },
  {
    key: "outerwear",
    label: "Outerwear",
    href: "/category/outerwear",
    fetchItems: () =>
      productService
        .search({ categoryIds: ["outerwear"], limit: ROW_LIMIT })
        .then((result) => result.items),
  },
  {
    key: "bottoms",
    label: "Bottoms",
    href: "/category/bottoms",
    fetchItems: () =>
      productService
        .search({ categoryIds: ["bottoms"], limit: ROW_LIMIT })
        .then((result) => result.items),
  },
  {
    key: "accessories",
    label: "Accessories",
    href: "/category/accessories",
    fetchItems: () =>
      productService
        .search({ categoryIds: ["accessories"], limit: ROW_LIMIT })
        .then((result) => result.items),
  },
];

const Arrow = () => <HiArrowUpRight aria-hidden="true" />;

// derive a stable anchor id from an href like "/category/tops"
const slugFromHref = (href) =>
  href.replace(/^\/category\//, "");

function CollectionRow({ label, href, fetchItems }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchItems()
      .then((data) => {
        if (active) setItems(data || []);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [fetchItems]);

  if (!loading && items.length === 0) return null;

  return (
    <section className="site-container py-12 md:py-16">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="eyebrow">Collection</p>
          <h2 className="display mt-3 text-3xl md:text-4xl">{label}</h2>
        </div>
        <Link to={href} className="group editorial-link shrink-0">
          Shop {label} <Arrow />
        </Link>
      </div>

      {loading ? (
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] w-[45vw] shrink-0 animate-pulse rounded-[12px] bg-neutral sm:w-[220px]"
            />
          ))}
        </div>
      ) : (
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/shop/${item.slug}`)}
              className="w-[45vw] shrink-0 snap-start cursor-pointer sm:w-[220px] lg:w-[240px]"
            >
              <Card
                img={item.image}
                hoverImg={item.hoverImage}
                title={item.name}
                brand={getBrandById(item.brandId)?.name}
                badge={item.status?.isNew ? "New" : undefined}
                price={formatPrice(item.price)}
                onQuickAdd={() => addToCart(item, 1)}
                alt={item.name}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function BrandStrip() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    let active = true;
    productService.getBrands().then((data) => {
      if (active) setBrands(data);
    });
    return () => {
      active = false;
    };
  }, []);

  if (brands.length === 0) return null;

  return (
    <section id="brands" className="site-container py-12 md:py-16">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="eyebrow">Collection</p>
          <h2 className="display mt-3 text-3xl md:text-4xl">Brands</h2>
        </div>
        <Link to="/category/brands" className="group editorial-link shrink-0">
          Shop all brands <Arrow />
        </Link>
      </div>
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            to={`/brand/${brand.slug}`}
            className="group relative aspect-[3/4] w-[45vw] shrink-0 snap-start overflow-hidden rounded-[12px] sm:w-[220px] lg:w-[240px]"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <p className="absolute bottom-4 left-4 text-sm font-medium uppercase tracking-[.1em] text-white">
              {brand.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Collections() {
  return (
    <main>
      <section className="site-container pt-5 md:pt-7">
        <div className="grid min-h-[560px] overflow-hidden rounded-[24px] bg-[#0a0a0a] text-white lg:grid-cols-[.92fr_1.08fr]">
          <div className="flex flex-col justify-between p-8 md:p-12 lg:p-16">
            <p className="text-xs uppercase tracking-[.18em] text-[#EF4824]">
              GRV / Collections
            </p>
            <div>
              <h1 className="display text-6xl uppercase leading-[.88] md:text-8xl">
                Every
                <br />
                collection,
                <br />
                <span className="text-[#EF4824]">one place.</span>
              </h1>
              <p className="mt-7 max-w-sm text-sm leading-6 text-white/65">
                Womenswear, menswear, bags, accessories — enter through
                whichever one matches your mood.
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
          Jump to a collection
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
          {collectionSources.map(({ key, label, href }) => (
            <a
              key={key}
              href={`#${slugFromHref(href)}`}
              className="shrink-0 rounded-full border border-black/15 px-4 py-2 text-xs uppercase tracking-[.1em] transition hover:border-[#EF4824] hover:bg-[#EF4824] hover:text-white"
            >
              {label}
            </a>
          ))}
          <Link
            to="/category/brands"
            className="shrink-0 rounded-full border border-[#EF4824] bg-[#EF4824] px-4 py-2 text-xs uppercase tracking-[.1em] text-white"
          >
            Brands
          </Link>
        </div>
      </section>

      {/* one horizontally-scrolling row per collection */}
      <div className="divide-y divide-black/10">
        {collectionSources.map((source) => (
          <div key={source.key} id={slugFromHref(source.href)}>
            <CollectionRow {...source} />
          </div>
        ))}
      </div>

      <BrandStrip />

      <section className="site-container grid gap-4 pb-24 pt-4 md:grid-cols-3 md:pb-32">
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
