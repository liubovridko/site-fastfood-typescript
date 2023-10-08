import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";

const Cart = React.lazy(
  () => import(/*webpackChunkName:"Cart" */ "./pages/Cart"),
); //dynamic import
const SinglePizza = React.lazy(
  () => import(/*webpackChunkName:"SinglePizza" */ "./pages/SinglePizza"),
);
const NotFound = React.lazy(() =>
  import(/*webpackChunkName:"NotFound" */ "./pages/NotFound").then((m) => ({
    default: m.NotFound,
  })),
); //if not default export

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SinglePizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
