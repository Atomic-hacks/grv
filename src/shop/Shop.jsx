import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { HiArrowUpRight } from "react-icons/hi2";
import Card from "../component/ui/Card";
import {
  formatPrice,
  getBrandById,
  parseProductQuery,
  productService,
  serializeProductQuery,
} from "../catalog/productService";
import { useCart } from "../context/CartContext";
import { getDiscoveryContext } from "../catalog/discovery";
import { FilterSidebar } from "../component/ui/FilterSidebar";

const facetQueryKey = {
  category: "categoryIds",
  style: "styleIds",
  mood: "moodIds",
  color: "colors",
  size: "sizes",
};

const categoryCopy = {
  tops: ["Tops", "Layers, jerseys and everyday essentials cut for movement."],
  bottoms: ["Bottoms", "Technical comfort, clean lines and freedom to move."],
  outerwear: ["Outerwear", "Built for changing conditions and repeat wear."],
  accessories: ["Accessories", "The finishing pieces for every movement."],
  featured: ["Featured", "The GRV edit: pieces setting the pace right now."],
  "new-arrivals": [
    "New arrivals",
    "The latest silhouettes to enter the rotation.",
  ],
};

// hero background per plain category route (discovery pages bring their own)
const categoryHero = {
  tops: "/img/goth-boy.jpg",
  bottoms: "/img/goth-7.jpg",
  outerwear: "/img/goth-towers.jpg",
  accessories: "/img/goth-flowers.jpg",
  featured: "/img/goth-1.jpg",
  "new-arrivals": "/img/goth-girl4.jpg",
};

const Arrow = () => <HiArrowUpRight aria-hidden="true" />;

function ProductRow({ title, subtitle, items, loading, onQuickAdd }) {
  const navigate = useNavigate();
  if (!loading && items.length === 0) return null;

  return (
    <section className="site-container py-12 md:py-16">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="eyebrow">{subtitle}</p>
          <h2 className="display mt-3 text-3xl md:text-4xl">{title}</h2>
        </div>
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
                onQuickAdd={() => onQuickAdd(item)}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [result, setResult] = useState({
    items: [],
    facets: [],
    total: 0,
    hasMore: false,
  });
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState({ items: [], loading: true });
  const [recommended, setRecommended] = useState({ items: [], loading: true });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const navigate = useNavigate();
  const { category, taxonomy, slug } = useParams();
  const { addToCart } = useCart();
  const baseQuery = parseProductQuery(searchParams);
  const routeFilters = {
    tops: { categoryIds: ["tops"] },
    bottoms: { categoryIds: ["bottoms"] },
    outerwear: { categoryIds: ["outerwear"] },
    accessories: { categoryIds: ["accessories"] },
    featured: { featured: true },
    "new-arrivals": { isNew: true },
  };
  const discovery = getDiscoveryContext(taxonomy, slug);
  const query = discovery
    ? { ...baseQuery, ...discovery.query }
    : category
      ? { ...baseQuery, ...(routeFilters[category] || {}) }
      : baseQuery;

  const [catalogueTitle, catalogueDescription] = discovery
    ? [discovery.title, discovery.description]
    : categoryCopy[category] || [
        query.search ? `Search: ${query.search}` : "All products",
        "Explore the pieces made for your next move.",
      ];

  const heroImage = discovery
    ? discovery.image
    : categoryHero[category] || null;

  // categoryIds actually driving this view — used to scope featured/recs
  const activeCategoryIds =
    discovery?.query?.categoryIds || routeFilters[category]?.categoryIds;
  const activeCategoryKey = (activeCategoryIds || []).join(",");

  useEffect(() => {
    let active = true;
    setLoading(true);
    productService.search(query).then((nextResult) => {
      if (active) {
        setResult(nextResult);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [searchParams, category, taxonomy, slug]);

  // Featured products for this category
  useEffect(() => {
    if (!activeCategoryIds || activeCategoryIds.length === 0) {
      setFeatured({ items: [], loading: false });
      return;
    }
    let active = true;
    setFeatured((prev) => ({ ...prev, loading: true }));
    productService
      .search({ categoryIds: activeCategoryIds, featured: true, limit: 8 })
      .then((res) => {
        if (active) setFeatured({ items: res.items, loading: false });
      });
    return () => {
      active = false;
    };
  }, [activeCategoryKey]);

  // Recommendations: newest pieces from outside this category
  useEffect(() => {
    let active = true;
    setRecommended((prev) => ({ ...prev, loading: true }));
    productService.search({ sort: "newest", limit: 12 }).then((res) => {
      if (!active) return;
      const items = activeCategoryIds?.length
        ? res.items.filter(
            (item) =>
              !item.categoryIds.some((id) => activeCategoryIds.includes(id)),
          )
        : res.items;
      setRecommended({ items: items.slice(0, 8), loading: false });
    });
    return () => {
      active = false;
    };
  }, [activeCategoryKey]);

  const updateQuery = (changes) => {
    const next = { ...query, ...changes, page: changes.page ?? 1 };
    setSearchParams(serializeProductQuery(next));
  };
  const toggleFacet = (facetKey, value) => {
    const queryKey = facetQueryKey[facetKey];
    const selected = query[queryKey] || [];
    updateQuery({
      [queryKey]: selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    });
  };
  const clearFilters = () => setSearchParams("");

  return (
    <main>
      {/* Discovery pages bring their own richer hero (image + kicker + related row) */}
      {discovery && (
        <section className="site-container pt-5 md:pt-7">
          <div className="grid min-h-[470px] overflow-hidden rounded-[24px] bg-black text-white lg:grid-cols-[.85fr_1.15fr]">
            <div className="flex flex-col justify-between p-8 md:p-12">
              <p className="text-xs uppercase tracking-[.18em] text-[#EF4824]">
                {discovery.kicker}
              </p>
              <div>
                <h1 className="display max-w-md text-5xl md:text-7xl">
                  {discovery.headline}
                </h1>
                <p className="mt-6 max-w-md text-sm leading-6 text-white/70">
                  {discovery.description}
                </p>
              </div>
              <a
                href="#catalogue"
                className="group flex items-center gap-2 text-sm"
              >
                Explore the edit <span className="text-[#EF4824]">↘</span>
              </a>
            </div>
            <div className="relative min-h-[280px]">
              <img
                src={discovery.image}
                alt={discovery.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <p className="display text-2xl">{discovery.relatedTitle}</p>
            <span className="text-xs uppercase tracking-[.12em] text-muted">
              Curated for{" "}
              <span className="text-[#EF4824]"> {discovery.title}</span>
            </span>
          </div>
        </section>
      )}

      {/* Plain category routes (/category/tops etc.) now get a matching hero */}
      {!discovery && category && (
        <section className="site-container pt-5 md:pt-7">
          <div className="relative min-h-[380px] overflow-hidden rounded-[24px] bg-black md:min-h-[470px]">
            {heroImage && (
              <>
                <img
                  src={heroImage}
                  alt={catalogueTitle}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </>
            )}
            <div className="relative flex min-h-[380px] max-w-xl flex-col justify-end p-7 text-white md:min-h-[470px] md:p-12">
              <p className="text-xs uppercase tracking-[.18em] text-[#EF4824]">
                GRV / {catalogueTitle}
              </p>
              <h1 className="display mt-4 text-5xl uppercase md:text-7xl">
                {catalogueTitle}
              </h1>
              <p className="mt-5 max-w-md text-sm leading-6 text-white/80">
                {catalogueDescription}
              </p>
              <a
                href="#catalogue"
                className="mt-8 flex w-fit items-center gap-2 rounded-full bg-[#EF4824] px-6 py-3 text-sm font-medium transition hover:bg-[#f25735]"
              >
                Shop {catalogueTitle} <Arrow />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Root storefront (no category, no discovery, no search term) */}
      {!category && !discovery && !query.search && (
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
      )}

      <section id="catalogue" className="site-container py-20 md:py-32">
        <div className="">
          <FilterSidebar
            open={filtersOpen}
            onClose={() => setFiltersOpen(false)}
            title={catalogueTitle}
            description={catalogueDescription}
            facets={result.facets}
            query={query}
            facetQueryKey={facetQueryKey}
            updateQuery={updateQuery}
            toggleFacet={toggleFacet}
            clearFilters={clearFilters}
          />

          <div>
            <div className="mb-6 flex items-center justify-between border-y border-black/10 py-4 text-sm">
              <span>
                {loading ? "Loading products…" : `${result.total} products`}
              </span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setFiltersOpen((open) => !open)}
                  className="lg:hidden"
                >
                  {filtersOpen ? "Close filters" : "Filters"}
                </button>
                <span className="text-muted">
                  Sort: {query.sort === "relevance" ? "Relevance" : query.sort}
                </span>
              </div>
            </div>
            {result.items.length ? (
              <>
                <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-4 2xl:grid-cols-5">
                  {result.items.map((item) => (
                    <div
                      key={item.id}
                      className="cursor-pointer"
                      onClick={() => navigate(`/shop/${item.slug}`)}
                    >
                      <Card
                        img={item.image}
                        hoverImg={item.hoverImage}
                        alt={item.name}
                        brand={getBrandById(item.brandId)?.name}
                        badge={item.status?.isNew ? "New" : undefined}
                        title={item.name}
                        price={formatPrice(item.price)}
                        onQuickAdd={(event) => {
                          event?.stopPropagation?.();
                          addToCart(item, 1);
                        }}
                      />
                    </div>
                  ))}
                </div>
                {result.hasMore && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => updateQuery({ page: query.page + 1 })}
                      className="rounded-full border border-black px-6 py-3 text-sm hover:bg-black hover:text-white"
                    >
                      Next page
                    </button>
                  </div>
                )}
              </>
            ) : (
              !loading && (
                <div className="py-20 text-center">
                  <p className="display text-3xl">No pieces found.</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-sm text-[#e85d04] underline"
                  >
                    Reset discovery filters
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Featured pieces from this category — hidden entirely off the root catalogue */}
      {activeCategoryIds?.length > 0 && (
        <ProductRow
          title={`Featured in ${catalogueTitle}`}
          subtitle="Featured"
          items={featured.items}
          loading={featured.loading}
          onQuickAdd={(item) => addToCart(item, 1)}
        />
      )}

      {/* Recommendations, always shown once we have data */}
      <ProductRow
        title="You might also like"
        subtitle="Recommended"
        items={recommended.items}
        loading={recommended.loading}
        onQuickAdd={(item) => addToCart(item, 1)}
      />
    </main>
  );
}
