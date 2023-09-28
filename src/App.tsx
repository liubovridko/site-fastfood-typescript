import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import SinglePizza from "./pages/SinglePizza";
import NotFound from "./pages/NotFound";

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
