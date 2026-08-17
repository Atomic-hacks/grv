export const discoveryContexts = {
  mood: {
    relaxed: { title: "Relaxed", kicker: "Mood / Relaxed", headline: "Ease into the day.", description: "Soft structure, considered layers and quieter pieces for moving at your own pace.", image: "/img/goth-girl3.jpg", query: { moodIds: ["relaxed"] }, relatedTitle: "Keep the calm going." },
    focused: { title: "Focused", kicker: "Mood / Focused", headline: "Dress with intent.", description: "Technical comfort and sharp essentials for days that ask for more from you.", image: "/img/goth-boy.jpg", query: { moodIds: ["focused"] }, relatedTitle: "Made to stay locked in." },
  },
  style: {
    streetwear: { title: "Streetwear", kicker: "Style / Streetwear", headline: "The everyday, elevated.", description: "Relaxed silhouettes, graphic energy and utility-led essentials for the city.", image: "/img/hero9.jpg", query: { styleIds: ["streetwear"] }, relatedTitle: "More from the street-level edit." },
    performance: { title: "Performance", kicker: "Style / Performance", headline: "Built to keep up.", description: "Pieces that balance technical movement with a refined off-duty point of view.", image: "/img/goth-4.jpg", query: { styleIds: ["performance"] }, relatedTitle: "Keep your momentum." },
  },
  occasion: {
    everyday: { title: "Everyday", kicker: "Occasion / Everyday", headline: "For every version of the day.", description: "Dependable pieces with enough edge to make routine feel intentional.", image: "/img/hero5.jpg", query: { occasionIds: ["everyday"] }, relatedTitle: "The daily rotation." },
  },
  weather: {
    warm: { title: "Warm weather", kicker: "Weather / Warm", headline: "Keep it light.", description: "Breathable layers and easy silhouettes for heat, movement and open-air plans.", image: "/img/hero4.jpg", query: { weatherIds: ["warm"] }, relatedTitle: "More for sunlit days." },
    "all-weather": { title: "All weather", kicker: "Weather / All weather", headline: "Ready for whatever shifts.", description: "Versatile outer layers and dependable staples for changing conditions.", image: "/img/goth-7.jpg", query: { weatherIds: ["all-weather"] }, relatedTitle: "The layers that hold up." },
  },
  category: {
    tops: { title: "Tops", kicker: "Category / Tops", headline: "Layers that lead.", description: "T-shirts, jerseys and outer layers shaped for motion and repeat wear.", image: "/img/hero9.jpg", query: { categoryIds: ["tops"] }, relatedTitle: "Build the top half." },
    bottoms: { title: "Bottoms", kicker: "Category / Bottoms", headline: "Find your pace.", description: "Clean silhouettes, technical comfort and room to move through the day.", image: "/img/hero5.jpg", query: { categoryIds: ["bottoms"] }, relatedTitle: "The foundation of the fit." },
  },
  brand: {
    grv: { title: "GRV", kicker: "Brand / GRV", headline: "The GRV point of view.", description: "Performance-ready essentials with a street-level point of view, built for people in motion.", image: "/img/goth-1.jpg", query: { brandIds: ["grv"] }, relatedTitle: "From the GRV edit." },
    bolapsd: { title: "Bolapsd", kicker: "Brand / Bolapsd", headline: "The next name to know.", description: "Contemporary Nigerian fashion with a distinct point of view and an instinct for the unexpected.", image: "/img/goth-girl4.jpg", query: { brandIds: ["bolapsd"] }, relatedTitle: "The Bolapsd selection." },
    dxy: { title: "DXY", kicker: "Brand / DXY", headline: "Utility, with a pulse.", description: "Directional essentials and modern layers designed to move with the city.", image: "/img/goth-boy.jpg", query: { brandIds: ["dxy"] }, relatedTitle: "From the DXY storefront." },
    "maki-oh": { title: "Maki Oh", kicker: "Brand / Maki Oh", headline: "Craft with character.", description: "Expressive pieces shaped by a thoughtful, independent point of view.", image: "/img/goth-flowers.jpg", query: { brandIds: ["maki-oh"] }, relatedTitle: "The Maki Oh edit." },
  },
};

export function getDiscoveryContext(taxonomy, slug) {
  if (!taxonomy || !slug) return null;
  return discoveryContexts[taxonomy]?.[slug] || null;
}
