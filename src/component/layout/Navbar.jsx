import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { HiOutlineBars3, HiOutlineHeart, HiOutlineMagnifyingGlass, HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi2";
import QuickDrawer from "./QuickDrawer";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quickDrawer, setQuickDrawer] = useState(null);
  const { itemCount, openCart } = useCart();
  const location = useLocation();
  useEffect(() => { setMenuOpen(false); setQuickDrawer(null); }, [location.pathname]);
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
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white p-5 md:hidden">
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
              className="text-2xl"
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
            <button onClick={openCart} className="py-5 text-left text-3xl">
              Bag ({itemCount})
            </button>
          </nav>
        </div>
      )}
      <nav
        aria-label="Mobile quick navigation"
        className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-around rounded-full border border-black/10 bg-white/95 px-1 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.14)] backdrop-blur-md md:hidden"
      >
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="flex min-w-12 flex-col items-center gap-1.5 py-1 text-xs leading-none transition hover:text-[#EF4824]"
          aria-label="Open menu"
        >
          <HiOutlineBars3 className="text-xl" />
          <span>Menu</span>
        </button>
        <button
          type="button"
          onClick={() => setQuickDrawer("wishlist")}
          className="flex min-w-12 flex-col items-center gap-1.5 py-1 text-xs leading-none transition hover:text-[#EF4824]"
          aria-label="View wishlist"
        >
          <HiOutlineHeart className="text-xl" />
          <span>Wishlist</span>
        </button>
        <button
          type="button"
          onClick={() => setQuickDrawer("search")}
          className="flex min-w-12 flex-col items-center gap-1.5 py-1 text-xs leading-none transition hover:text-[#EF4824]"
          aria-label="Search products"
        >
          <HiOutlineMagnifyingGlass className="text-xl" />
          <span>Search</span>
        </button>
        <button
          type="button"
          onClick={openCart}
          className="relative flex min-w-12 flex-col items-center gap-1.5 py-1 text-xs leading-none transition hover:text-[#EF4824]"
          aria-label={`Open cart, ${itemCount} items`}
        >
          <span className="relative">
            <HiOutlineShoppingBag className="text-xl" />
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
          className="flex min-w-12 flex-col items-center gap-1.5 py-1 text-xs leading-none transition hover:text-[#EF4824]"
          aria-label="Account"
        >
          <HiOutlineUser className="text-xl" />
          <span>Account</span>
        </Link>
      </nav>
      <QuickDrawer type={quickDrawer} onClose={() => setQuickDrawer(null)} />
    </>
  );
}
