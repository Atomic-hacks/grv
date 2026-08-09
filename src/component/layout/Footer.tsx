import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-[#EF4824] pb-28 pt-14 text-white md:py-20">
    <div className="site-container">
      <div className="grid gap-12 md:grid-cols-[1.45fr_1fr_1fr_1fr]">
        <div>
          <p className="brand-wordmark flex items-center gap-2 text-3xl">
            <img
              src="/img/logo.jpeg"
              alt="GRV"
              className="h-12 w-12 object-contain"
            />
            GRV
          </p>
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/80">
            Considered clothing for the rhythm of real life.
          </p>
          <form className="mt-7 flex max-w-sm border-b border-white/80 pb-2">
            <input
              aria-label="Email address"
              type="email"
              placeholder="Your email address"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/40"
            />
            <button className="text-sm hover:text-[#e85d04]">Join ↗</button>
          </form>
        </div>
        <div>
          <h3 className="mb-5 text-sm">Shop</h3>
          <div className="space-y-3 text-sm text-white/85">
            <Link to="/shop" className="block hover:text-white">
              All products
            </Link>
            <Link to="/shop" className="block hover:text-white">
              New arrivals
            </Link>
            <Link to="/shop" className="block hover:text-white">
              Collections
            </Link>
          </div>
        </div>
        <div>
          <h3 className="mb-5 text-sm">Information</h3>
          <div className="space-y-3 text-sm text-white/85">
            <a href="#shipping" className="block hover:text-white">
              Shipping & returns
            </a>
            <a href="#care" className="block hover:text-white">
              Garment care
            </a>
            <a href="#privacy" className="block hover:text-white">
              Privacy
            </a>
          </div>
        </div>
        <div>
          <h3 className="mb-5 text-sm">Contact</h3>
          <div className="space-y-3 text-sm leading-6 text-white/65">
            <p>Lagos, Nigeria</p>
            <a href="mailto:hello@grv.co" className="block hover:text-white">
              hello@grv.co
            </a>
            <Link to="/contact" className="block hover:text-white">
              Get in touch ↗
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/15 pt-5 text-xs text-white/50 sm:flex-row">
        <p>© 2026 GRV. All rights reserved.</p>
        <p>Made for every day.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
