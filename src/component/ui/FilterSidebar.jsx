import React from "react";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function FilterSidebar({
  open,
  onClose,
  title,
  description,
  facets,
  query,
  facetQueryKey,
  updateQuery,
  toggleFacet,
  clearFilters,
}) {
  // lock body scroll + close on Escape while the mobile drawer is open
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const content = (
    <>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Product discovery</p>
          <h2 className="display mt-3 text-4xl">{title}</h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Close filters"
          className="text-2xl leading-none"
        >
          &times;
        </button>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">{description}</p>

      <label className="mt-8 block text-xs font-medium uppercase tracking-[.12em] text-muted">
        Search
        <input
          value={query.search || ""}
          onChange={(event) =>
            updateQuery({ search: event.target.value || undefined })
          }
          placeholder="Search products"
          className="mt-3 w-full rounded-full border border-black/15 bg-white px-5 py-3 text-sm text-black outline-none focus:border-[#e85d04]"
        />
      </label>

      <label className="mt-5 block text-xs font-medium uppercase tracking-[.12em] text-muted">
        Sort
        <select
          value={query.sort}
          onChange={(event) => updateQuery({ sort: event.target.value })}
          className="mt-3 w-full appearance-none rounded-full border border-black/15 bg-white px-5 py-3 text-sm text-black outline-none focus:border-[#e85d04]"
        >
          <option value="relevance">Relevance</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </label>

      <button
        onClick={clearFilters}
        className="mt-5 text-xs uppercase tracking-[.12em] text-[#e85d04]"
      >
        Clear filters
      </button>

      <div className="mt-7 space-y-6">
        {facets.map((facet) => (
          <fieldset key={facet.key}>
            <legend className="text-xs font-medium uppercase tracking-[.12em] text-muted">
              {facet.label}
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {facet.options.map((option) => {
                const selected = (
                  query[facetQueryKey[facet.key]] || []
                ).includes(option.value);
                return (
                  <button
                    key={option.value}
                    onClick={() => toggleFacet(facet.key, option.value)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition ${
                      selected
                        ? "border-black bg-black text-white"
                        : "border-black/15 hover:border-black"
                    }`}
                  >
                    {option.label}{" "}
                    <span className="opacity-60">{option.count}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
    </>
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40"
            aria-hidden="true"
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm overflow-y-auto bg-white px-6 py-8 shadow-xl lg:w-[380px]"
          >
            {content}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
