import React, { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import BookDetailsPage from "./pages/Bookdetailspage/BookDetailsPage";

// Lazy load components
const Navbar = lazy(() => import("./components/navbar/navbar"));

function App() {
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route future={{
        v7_relativeSplatPath: true,}} path="/" element={<Navbar />}>

        <Route path="/" element={<Home />} />

        <Route future={{
        v7_relativeSplatPath: true,}} path="/books" element={<Outlet />}>
          <Route index element={<Home />} />

          {/* Book Details */}
          <Route path=":id" element={<BookDetailsPage />} />
        </Route>
      </Route>
    )
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
