import React, { useContext } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Nav from "./component/Nav";
import { userDataContext } from "./context/UserContext";
import About from "./pages/About";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import Collection from "./pages/Collection";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound";
import Ai from "./component/Ai";

const App = () => {
  // let navigate = useNavigate();
  let { userData } = useContext(userDataContext);
  let location = useLocation();
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {userData && <Nav />}
      <Routes>
        <Route
          path="/login"
          element={
            userData ? <Navigate to={location.state?.from || "/"} /> : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            userData ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <Registration />
            )
          }
        />
        <Route
          path="/"
          element={
            userData ? (
              <Home />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/about"
          element={
            userData ? (
              <About />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/collection"
          element={
            userData ? (
              <Collection />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/product"
          element={
            userData ? (
              <Product />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/contact"
          element={
            userData ? (
              <Contact />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/productdetails/:productId"
          element={
            userData ? (
              <ProductDetails />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/cart"
          element={
            userData ? (
              <Cart />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/placeorder"
          element={
            userData ? (
              <PlaceOrder />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/order"
          element={
            userData ? (
              <Order />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route
          path="*"
          element={
            userData ? (
              <NotFound />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
      </Routes>
      <Ai />
    </>
  );
};

export default App;
