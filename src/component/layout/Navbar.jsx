import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import {
  HiOutlineBars3,
  HiOutlineHeart,
  HiOutlineMagnifyingGlass,
  HiOutlineShoppingBag,
  HiOutlineUser,
} from "react-icons/hi2";
import QuickDrawer from "./QuickDrawer";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quickDrawer, setQuickDrawer] = useState(null);
  const [navHidden, setNavHidden] = useState(false);
  const { itemCount, openCart } = useCart();
  const location = useLocation();
  useEffect(() => {
    setMenuOpen(false);
    setQuickDrawer(null);
  }, [location.pathname]);
  useEffect(() => {
    let scrollEndTimer;
    const handleScroll = () => {
      setNavHidden(window.scrollY > 80);
      window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(() => setNavHidden(false), 180);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(scrollEndTimer);
    };
  }, []);
  const links = [
    ["Shop", "/shop"],
    ["Collections", "/shop"],
    ["About", "/brand"],
    ["Journal", "/journal"],
  ];
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-sm">
        <div className="site-container relative flex h-[68px] items-center justify-between">
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span className="block h-px w-5 bg-black shadow-[0_6px_0_#0a0a0a,0_-6px_0_#0a0a0a]" />
          </button>
          <nav className="hidden items-center gap-7 md:flex">
            {links.map(([label, href]) => (
              <Link
                key={label}
                to={href}
                className="text-sm transition hover:text-[#EF4824]"
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link
            to="/"
            className="text-[#EF4824] absolute left-1/2 flex -translate-x-1/2 items-center gap-2 text-[22px]"
          >
            <img
              src="/img/logo.jpeg"
              alt=""
              className="h-12 w-12 rounded-full object-contain"
            />
            GRV
          </Link>
          <div className="ml-auto flex items-center gap-4 md:gap-6">
            <button
              aria-label="Search"
              onClick={() => setQuickDrawer("search")}
              className="hidden transition hover:text-[#EF4824] sm:block"
            >
              <HiOutlineMagnifyingGlass className="text-xl" />
            </button>
            <Link
              className="hidden text-sm transition hover:text-[#EF4824] md:block"
              to="/contact"
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="text-sm transition hover:text-[#EF4824]"
            >
              Bag ({itemCount})
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-black/35"
            />
            <motion.aside
              className="relative h-full w-[70vw] max-w-[390px] bg-white p-5 shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 330, damping: 34 }}
            >
              <div className="flex items-center justify-between border-b border-black/10 pb-5">
                <Link
                  onClick={() => setMenuOpen(false)}
                  to="/"
                  className="brand-wordmark flex items-center gap-2 text-2xl"
                >
                  <img
                    src="/img/logo.jpeg"
                    alt=""
                    className="h-12 w-12 rounded-full"
                  />
                  GRV
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="grid h-12 w-12 place-items-center rounded-full border border-black/15 text-4xl leading-none transition hover:border-[#EF4824] hover:text-[#EF4824]"
                >
                  ×
                </button>
              </div>
              <nav className="flex flex-col py-8">
                {links.map(([label, href]) => (
                  <Link
                    key={label}
                    to={href}
                    className="border-b border-black/10 py-5 text-3xl"
                  >
                    {label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    openCart();
                  }}
                  className="py-5 text-left text-3xl"
                >
                  Bag ({itemCount})
                </button>
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
      <nav
        aria-label="Mobile quick navigation"
        className={`fixed inset-x-8 bottom-[3px] z-40 flex items-center justify-around rounded-full border border-white/60 bg-white/55 px-1 py-1.5 shadow-[0_4px_14px_rgba(0,0,0,0.10)] backdrop-blur-sm transition-all duration-300 ease-out md:hidden ${navHidden ? "pointer-events-none translate-y-[calc(100%+0.5rem)] opacity-0" : "translate-y-0 opacity-100"}`}
      >
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="flex min-w-10 flex-col items-center gap-1 py-0.5 text-[9px] leading-none transition hover:text-[#EF4824]"
          aria-label="Open menu"
        >
          <HiOutlineBars3 className="text-base" />
          <span>Menu</span>
        </button>
        <button
          type="button"
          onClick={() => setQuickDrawer("wishlist")}
          className="flex min-w-10 flex-col items-center gap-1 py-0.5 text-[9px] leading-none transition hover:text-[#EF4824]"
          aria-label="View wishlist"
        >
          <HiOutlineHeart className="text-base" />
          <span>Wishlist</span>
        </button>
        <button
          type="button"
          onClick={() => setQuickDrawer("search")}
          className="flex min-w-10 flex-col items-center gap-1 py-0.5 text-[9px] leading-none transition hover:text-[#EF4824]"
          aria-label="Search products"
        >
          <HiOutlineMagnifyingGlass className="text-base" />
          <span>Search</span>
        </button>
        <button
          type="button"
          onClick={openCart}
          className="relative flex min-w-10 flex-col items-center gap-1 py-0.5 text-[9px] leading-none transition hover:text-[#EF4824]"
          aria-label={`Open cart, ${itemCount} items`}
        >
          <span className="relative">
            <HiOutlineShoppingBag className="text-base" />
            {itemCount > 0 && (
              <span className="absolute -right-2.5 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-[#EF4824] px-1 text-[9px] text-white">
                {itemCount}
              </span>
            )}
          </span>
          <span>Cart</span>
        </button>
        <Link
          to="/contact"
          className="flex min-w-10 flex-col items-center gap-1 py-0.5 text-[9px] leading-none transition hover:text-[#EF4824]"
          aria-label="Account"
        >
          <HiOutlineUser className="text-base" />
          <span>Account</span>
        </Link>
      </nav>
      <QuickDrawer type={quickDrawer} onClose={() => setQuickDrawer(null)} />
    </>
  );
}
