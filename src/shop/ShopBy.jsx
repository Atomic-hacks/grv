import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FocusCards } from "../component/ui/focus-cards";
import { productService } from "../catalog/productService";

export const shopByOptions = [
  {
    title: "MOOD",
    src: "/img/goth-girl3.jpg",
    description: "Find pieces that match the energy you want to carry.",
    href: "/shop/mood/relaxed",
  },
  {
    title: "STYLE",
    src: "/img/hero9.jpg",
    description: "Explore pieces organized by the way you want to dress.",
    href: "/shop/style/streetwear",
  },
  {
    title: "BRAND",
    src: "/img/goth-boy.jpg",
    description: "Discover the labels and point of view behind every piece.",
    href: "/category/brands",
  },
  {
    title: "OCCASION",
    src: "/img/hero5.jpg",
    description: "Build an edit for wherever the day takes you.",
    href: "/shop/occasion/everyday",
  },
  {
    title: "WEATHER",
    src: "/img/goth-4.jpg",
    description:
      "Dress with the conditions in mind, without compromising style.",
    href: "/shop/weather/warm",
  },
];

export default function ShopBy({ brands: brandsMode = false }) {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    if (!brandsMode) return undefined;
    let active = true;
    productService.getBrands().then((nextBrands) => {
      if (active) setBrands(nextBrands);
    });
    return () => {
      active = false;
    };
  }, [brandsMode]);

  const cards = (
    brandsMode
      ? brands.map((brand) => ({
          title: brand.name.toUpperCase(),
          src: brand.image,
          description: brand.description,
          href: `/shop/brand/${brand.slug}`,
        }))
      : shopByOptions
  ).map((card) => ({ ...card, onClick: () => navigate(card.href) }));
  return (
    <main className="site-container py-16 md:py-24">
      <p className="eyebrow">Product discovery</p>
      <h1 className="display mt-4 text-5xl md:text-7xl">
        {brandsMode ? "Brands" : "Shop by"}
      </h1>
      <p className="mt-5 max-w-xl leading-7 text-muted">
        {brandsMode
          ? "The labels shaping what comes next — established points of view and independent names worth knowing."
          : "Choose a lens, then explore the same shared product catalogue."}
      </p>
      <div className="mt-12">
        <FocusCards cards={cards} />
      </div>
    </main>
  );
}
