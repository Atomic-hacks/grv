import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { formatPrice, products } from "../../data/products";

export default function QuickDrawer({ type, onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const isSearch = type === "search";
  const matches = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return products.slice(0, 4);
    return products.filter((product) => [product.name, product.category].some((value) => value.toLowerCase().includes(term)));
  }, [query]);
  const viewProduct = (id) => { onClose(); navigate(`/shop/${id}`); };

  return <AnimatePresence>{type && <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <button type="button" aria-label="Close panel" onClick={onClose} className="absolute inset-0 bg-black/45" />
    <motion.aside aria-label={isSearch ? "Product search" : "Wishlist"} className="absolute right-0 top-0 flex h-full w-full max-w-[470px] flex-col bg-[#f7f5f0] text-black sm:w-[470px]" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 32 }}>
      <header className="flex items-center justify-between border-b border-black/10 px-5 py-5 sm:px-7"><div><p className="eyebrow">GRV / {isSearch ? "Search" : "Wishlist"}</p><h2 className="brand-wordmark mt-1 text-2xl">{isSearch ? "Find your next piece" : "Your saved pieces"}</h2></div><button type="button" onClick={onClose} aria-label="Close panel" className="grid h-10 w-10 place-items-center rounded-full border border-black/20 text-xl transition hover:border-[#EF4824] hover:text-[#EF4824]"><HiXMark /></button></header>
      {isSearch ? <div className="flex min-h-0 flex-1 flex-col px-5 py-6 sm:px-7"><form className="flex gap-2" onSubmit={(event) => event.preventDefault()}><label className="sr-only" htmlFor="inventory-search">Search all products</label><div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-black/15 bg-white px-4"><HiMagnifyingGlass className="shrink-0 text-lg text-muted" /><input id="inventory-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search all products" className="min-w-0 flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-black/40" autoFocus /></div><button type="submit" className="rounded-full bg-[#EF4824] px-5 text-sm font-medium text-white transition hover:bg-black">Search</button></form><p className="mt-6 text-xs uppercase tracking-[.12em] text-muted">{query ? `${matches.length} result${matches.length === 1 ? "" : "s"}` : "Popular right now"}</p><div className="mt-4 flex-1 overflow-y-auto">{matches.length ? <div className="space-y-3">{matches.map((product) => <button key={product.id} type="button" onClick={() => viewProduct(product.id)} className="flex w-full items-center gap-3 rounded-2xl p-2 text-left transition hover:bg-white"><img src={product.image} alt="" className="h-20 w-16 rounded-xl bg-neutral object-cover" /><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{product.name}</span><span className="mt-1 block text-xs text-muted">{product.category}</span></span><span className="text-sm">{formatPrice(product.price)}</span></button>)}</div> : <div className="grid min-h-48 place-items-center text-center"><p className="text-sm text-muted">No products match “{query}”.</p></div>}</div></div> : <div className="grid flex-1 place-items-center px-7 text-center"><div><p className="brand-wordmark text-4xl text-[#EF4824]">GRV</p><p className="mt-3 text-sm text-muted">No product added to wishlist.</p></div></div>}
    </motion.aside>
  </motion.div>}</AnimatePresence>;
}
