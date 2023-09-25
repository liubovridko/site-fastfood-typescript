import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout.js";
import Home from "./pages/Home.js";
import Cart from "./pages/Cart.js";
import SinglePizza from "./pages/SinglePizza.js";
import NotFound from "./pages/NotFound.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<SinglePizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
