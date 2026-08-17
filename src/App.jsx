import React from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Hero from "./component/Hero";
import Footer from "./component/layout/Footer";
import Shop from "./shop/Shop";
import Brand from "./brand/Brand";
import Journal from "./journal/Journal";
import Contact from "./contact/Contact";
import Navbar from "./component/layout/Navbar";
import ProductDetail from "./ProductDetail";
import CartDrawer from "./component/cart/CartDrawer";
import PageTransition from "./component/ui/PageTransition";
import ShopBy from "./shop/ShopBy";
import ShopHub from "./shop/ShopHub";
import Collections from "./collection/Collection";

const AppLayout = () => {
  const location = useLocation();
  return <>
    <Navbar />
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Hero />} />
          <Route path="/shop" element={<ShopHub />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/shop/:taxonomy/:slug" element={<Shop />} />
          <Route path="/shop-by" element={<ShopBy />} />
          <Route path="/category/brands" element={<ShopBy brands />} />
          <Route path="/category/:category" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
    <Footer />
    <CartDrawer />
  </>
};

export default function App() {
  return <Router><AppLayout /></Router>;
}
