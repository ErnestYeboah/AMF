import "@ant-design/v5-patch-for-react-19";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import {
  fetchProducts,
  getUserProfile,
  productStoreSlice,
  setIsAuthenticated,
} from "./features/ProductStoreSlice";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Signin from "./components/Auth/Signin";
import ProductHome from "./components/ProductsPage/ProductHome";
import ProductHomeCategory from "./components/ProductsPage/ProductHomeCategory";
import { useCookies } from "react-cookie";
import SingleProduct from "./components/ProductsPage/SingleProduct";
import Profile from "./components/Auth/Profile";
import Signup from "./components/Auth/Signup";
import Favorites from "./components/ProductsPage/Favorites";
import { getFavoritesItems } from "./features/FavoriteStoreSlice";
import { getCartItems } from "./features/CartSlice";
import CartHome from "./components/Cart/CartHome";
// import emailjs from "@emailjs/browser";
import SearchedProductPage from "./components/ProductsPage/SearchedProductPage";

const MemoNavBar = React.memo(Navbar);
function App() {
  const dispatch = useDispatch();
  const [cookie] = useCookies(["token"]);
  const { sidebar_isActive } = useSelector(productStoreSlice);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // const serviceID = "service_23ywtw9";
  // const templateID = "template_lei0oix";
  // const public_key = "cthl5Z_PUh6s4qIx2";

  // const templateParams = {
  //   name: user[0]?.username,
  //   username: user[0]?.username,
  //   email: user[0]?.email,
  //   date: new Date().toLocaleDateString(),
  // };

  // Check if the user is authenticated and fetch user profile
  useEffect(() => {
    if (cookie["token"]) {
      dispatch(getUserProfile(cookie["token"]));
      dispatch(setIsAuthenticated(true));
      dispatch(getFavoritesItems(cookie["token"]));
      dispatch(getCartItems(cookie["token"]));
      // emailjs.send(serviceID, templateID, templateParams, public_key);
    }
  }, [cookie]);

  return (
    <>
      <MemoNavBar />
      <ToastContainer />
      <div
        className={
          sidebar_isActive ? "blur__container active" : "blur__container"
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<ProductHome />} />
          <Route path="/products/:category" element={<ProductHomeCategory />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<CartHome />} />
          <Route
            path="/search/:searchparams"
            element={<SearchedProductPage />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
