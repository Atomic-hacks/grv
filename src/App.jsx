import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./component/Hero";
import Footer from "./component/layout/Footer";
import Shop from "./shop/Shop";
import Brand from "./brand/Brand";
import Journal from "./journal/Journal";
import Contact from "./contact/Contact";
import Navbar from "./component/layout/Navbar";
import ProductDetail from "./ProductDetail";
import CartDrawer from "./component/cart/CartDrawer";

const AppLayout = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:id" element={<ProductDetail />} />
      <Route path="/brand" element={<Brand />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    <Footer />
    <CartDrawer />
  </>
);

export default function App() {
  return <Router><AppLayout /></Router>;
}
