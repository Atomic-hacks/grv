import { products as catalogSeed } from "../data/products";

/**
 * This module is the frontend boundary for product discovery.  Its return
 * shapes deliberately match a future HTTP/search API; only this mock adapter
 * knows about the local seed data.
 */

export const categories = [
  {
    id: "apparel",
    name: "Apparel",
    slug: "apparel",
    parentId: null,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "tops",
    name: "Tops",
    slug: "tops",
    parentId: "apparel",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "tees",
    name: "T-Shirts",
    slug: "t-shirts",
    parentId: "tops",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "hoodies",
    name: "Hoodies & Sweatshirts",
    slug: "hoodies",
    parentId: "tops",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "outerwear",
    name: "Outerwear",
    slug: "outerwear",
    parentId: "apparel",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "bottoms",
    name: "Bottoms",
    slug: "bottoms",
    parentId: "apparel",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "shorts",
    name: "Shorts",
    slug: "shorts",
    parentId: "bottoms",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "accessories",
    parentId: null,
    isActive: true,
    sortOrder: 2,
  },
];

export const brands = [
  {
    id: "grv",
    name: "GRV",
    slug: "grv",
    description:
      "Performance-ready essentials with a street-level point of view.",
    image: "/img/goth-1.jpg",
    isActive: true,
  },
  {
    id: "bolapsd",
    name: "Bolapsd",
    slug: "bolapsd",
    description: "Contemporary Nigerian fashion with a distinct point of view.",
    image: "/img/goth-girl4.jpg",
    isActive: true,
  },
  {
    id: "dxy",
    name: "DXY",
    slug: "dxy",
    description: "Modern utility and directional everyday pieces.",
    image: "/img/goth-boy.jpg",
    isActive: true,
  },
  {
    id: "maki-oh",
    name: "Maki Oh",
    slug: "maki-oh",
    description: "Craft-led fashion rooted in thoughtful expression.",
    image: "/img/goth-flowers.jpg",
    isActive: true,
  },
];

export const shopNavigation = [
  { label: "Featured", href: "/category/featured" },
  { label: "Brands", href: "/category/brands" },
  { label: "New Arrivals", href: "/category/new-arrivals" },
  { label: "Tops", href: "/category/tops" },
  { label: "Bottoms", href: "/category/bottoms" },
];

const categoryIdsFor = (product) => {
  if (product.category === "Bottoms") return ["apparel", "bottoms", "shorts"];
  if (product.category === "Outerwear") return ["apparel", "outerwear"];
  if (product.category === "Accessories") return ["accessories"];
  return [
    "apparel",
    "tops",
    /tee|jersey/i.test(product.name) ? "tees" : "hoodies",
  ];
};

const colors = ["black", "stone", "orange", "white"];
const sizes = ["s", "m", "l", "xl"];

// A normalized product has categoryIds, classification ids, attributes and
// variants. Future API responses should retain this contract.
const products = catalogSeed.map(
  (product, index) => {
    const color = colors[index % colors.length];
    const productSizes = sizes.slice(0, 2 + (index % 3));
    return {
      ...product,
      slug: product.id,
      brandId: brands[index % brands.length].id,
      categoryIds: categoryIdsFor(product),
      classificationIds: {
        style: [index % 2 ? "streetwear" : "performance"],
        mood: [index % 2 ? "relaxed" : "focused"],
        occasion: ["everyday"],
        weather: [index % 3 ? "warm" : "all-weather"],
        collection: product.category === "Summer 2025" ? ["summer-2025"] : [],
      },
      attributes: {
        material: index % 2 ? "Cotton" : "Technical blend",
        color,
      },
      variants: productSizes.map((size) => ({
        id: `${product.id}-${color}-${size}`,
        sku: `GRV-${index + 1}-${color}-${size}`.toUpperCase(),
        options: { color, size },
        price: product.price,
        inventory: 6 + index,
        images: product.images,
      })),
      status: {
        isNew: Boolean(product.isNew),
        isFeatured: index < 6,
        isSale: false,
      },
      createdAt: new Date(2026, 0, index + 1).toISOString(),
    };
  },
);

const list = (value) =>
  Array.isArray(value) ? value : value ? [value] : [];

const includesAny = (values, selected) =>
  !selected.length || selected.some((item) => values.includes(item));

// page/limit/sort are guaranteed here, so NormalizedQuery arithmetic is safe
export const defaultProductQuery = {
  page: 1,
  limit: 12,
  sort: "relevance",
};

export function parseProductQuery(searchParams) {
  const readList = (key) => searchParams.getAll(key).filter(Boolean);
  const number = (key) => {
    const value = Number(searchParams.get(key));
    return Number.isFinite(value) && value > 0 ? value : undefined;
  };
  return {
    ...defaultProductQuery,
    search: searchParams.get("q") || undefined,
    categoryIds: readList("category"),
    brandIds: readList("brand"),
    styleIds: readList("style"),
    moodIds: readList("mood"),
    colors: readList("color"),
    sizes: readList("size"),
    minPrice: number("minPrice"),
    maxPrice: number("maxPrice"),
    sort: searchParams.get("sort") || defaultProductQuery.sort,
    page: number("page") || 1,
    limit: number("limit") || defaultProductQuery.limit,
  };
}

export function serializeProductQuery(query) {
  const params = new URLSearchParams();
  if (query.search) params.set("q", query.search);
  (
    [
      ["category", query.categoryIds],
      ["brand", query.brandIds],
      ["style", query.styleIds],
      ["mood", query.moodIds],
      ["color", query.colors],
      ["size", query.sizes],
    ]
  ).forEach(([key, values]) =>
    list(values).forEach((value) => params.append(key, value)),
  );
  if (query.minPrice) params.set("minPrice", String(query.minPrice));
  if (query.maxPrice) params.set("maxPrice", String(query.maxPrice));
  if (query.sort && query.sort !== "relevance") params.set("sort", query.sort);
  if (query.page && query.page > 1) params.set("page", String(query.page));
  return params.toString();
}

function matches(product, query) {
  const term = query.search?.trim().toLowerCase();
  const haystack = [
    product.name,
    product.brandId,
    ...product.categoryIds,
    ...Object.values(product.attributes),
    ...Object.values(product.classificationIds).flat(),
  ]
    .join(" ")
    .toLowerCase();
  const variantValues = product.variants.flatMap((variant) =>
    Object.values(variant.options),
  );
  return (
    (!term || term.split(/\s+/).every((word) => haystack.includes(word))) &&
    includesAny(product.categoryIds, list(query.categoryIds)) &&
    includesAny([product.brandId], list(query.brandIds)) &&
    includesAny(product.classificationIds.style, list(query.styleIds)) &&
    includesAny(product.classificationIds.mood, list(query.moodIds)) &&
    includesAny(product.classificationIds.occasion, list(query.occasionIds)) &&
    includesAny(product.classificationIds.weather, list(query.weatherIds)) &&
    includesAny(variantValues, list(query.colors)) &&
    includesAny(variantValues, list(query.sizes)) &&
    (!query.featured || product.status.isFeatured) &&
    (!query.isNew || product.status.isNew) &&
    (!query.minPrice || product.price >= query.minPrice) &&
    (!query.maxPrice || product.price <= query.maxPrice)
  );
}

function sortProducts(items, sort) {
  const sorted = [...items];
  if (sort === "newest")
    return sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  if (sort === "price-asc") return sorted.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return sorted.sort((a, b) => b.price - a.price);
  return sorted;
}

function facet(key, label, options) {
  return { key, label, options: options.filter((option) => option.count > 0) };
}

function getFacets(items) {
  const count = (predicate) =>
    items.filter(predicate).length;
  return [
    facet(
      "category",
      "Category",
      categories.map((item) => ({
        value: item.id,
        label: item.name,
        count: count((product) => product.categoryIds.includes(item.id)),
      })),
    ),
    facet(
      "style",
      "Style",
      ["streetwear", "performance"].map((value) => ({
        value,
        label: value,
        count: count((product) =>
          product.classificationIds.style.includes(value),
        ),
      })),
    ),
    facet(
      "mood",
      "Mood",
      ["relaxed", "focused"].map((value) => ({
        value,
        label: value,
        count: count((product) =>
          product.classificationIds.mood.includes(value),
        ),
      })),
    ),
    facet(
      "color",
      "Color",
      colors.map((value) => ({
        value,
        label: value,
        count: count((product) =>
          product.variants.some((variant) => variant.options.color === value),
        ),
      })),
    ),
    facet(
      "size",
      "Size",
      sizes.map((value) => ({
        value,
        label: value.toUpperCase(),
        count: count((product) =>
          product.variants.some((variant) => variant.options.size === value),
        ),
      })),
    ),
  ];
}

export const productService = {
  async search(query = defaultProductQuery) {
    const normalized = { ...defaultProductQuery, ...query };
    const matching = sortProducts(
      products.filter((product) => matches(product, normalized)),
      normalized.sort,
    );
    const start = (normalized.page - 1) * normalized.limit;
    return {
      items: matching.slice(start, start + normalized.limit),
      total: matching.length,
      page: normalized.page,
      limit: normalized.limit,
      hasMore: start + normalized.limit < matching.length,
      facets: getFacets(matching),
    };
  },
  async getById(id) {
    return (
      products.find((product) => product.id === id || product.slug === id) ||
      null
    );
  },
  async getCategories() {
    return categories;
  },
  async getBrands() {
    return brands;
  },
  async getFeatured(limit = 3) {
    return products
      .filter((product) => product.status.isFeatured)
      .slice(0, limit);
  },
  async getNew(limit = 3) {
    return sortProducts(
      products.filter((product) => product.status.isNew),
      "newest",
    ).slice(0, limit);
  },
};

export const formatPrice = (value) => `$${value.toFixed(2)}`;
export const getBrandById = (id) =>
  brands.find((brand) => brand.id === id);
