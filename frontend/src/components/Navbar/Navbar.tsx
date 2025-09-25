import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import {
  UserOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { useCookies } from "react-cookie";
import SearchCategory from "./SearchCategory";
import { useDispatch, useSelector } from "react-redux";
import { GiClothes, GiJeweledChalice, GiSonicShoes } from "react-icons/gi";
import { DiHtml5DeviceAccess } from "react-icons/di";
import { MdOutlineAllInclusive } from "react-icons/md";
import { TbShoppingCart } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdWatch } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import { IoMdSearch } from "react-icons/io";

import {
  getSearchParams,
  logout,
  productStoreSlice,
  searchProducts,
  setProfileModalState,
  showSuggestionDiv,
  toggleSidebarView,
} from "../../features/ProductStoreSlice";
import React, { useCallback, useState } from "react";
import { favoritesProuctsStore } from "../../features/FavoriteStoreSlice";
import { cartItemsSlice } from "../../features/CartSlice";

// Optimization for children components when their props change
const SearchCategoryMemo = React.memo(SearchCategory);
const ShoppingCartOutlinedMemo = React.memo(ShoppingCartOutlined);
const HeartOutlinedMemo = React.memo(HeartOutlined);
const UserOutlinedMemo = React.memo(UserOutlined);
const LogoutOutlinedMemo = React.memo(LogoutOutlined);

const Navbar = () => {
  const navigate = useNavigate();
  const [cookie, , removeCookie] = useCookies(["token"]);
  const dispatch = useDispatch();
  const {
    user,
    search_params,
    sidebar_isActive,
    products,
    profileModalState,
    suggestionsDiv,
  } = useSelector(productStoreSlice);
  const { favorites } = useSelector(favoritesProuctsStore);
  const { cart } = useSelector(cartItemsSlice);
  const [searchSuggestions, setSearchSuggestions] = useState<
    { product_name: string }[]
  >([]);

  const signout = useCallback(() => {
    removeCookie("token");
    dispatch(logout());
    navigate("/signin");
    dispatch(setProfileModalState(false));
  }, []);

  const goToProfilePage = useCallback(() => {
    navigate("/profile");
    dispatch(setProfileModalState(false));
  }, []);
  const path = location.pathname;

  const getSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(getSearchParams(e.target.value));
    if (search_params.length >= 2) {
      dispatch(showSuggestionDiv(true));
      const cpyFilter = products.filter(
        (product: { product_name: string }) =>
          product.product_name.toLowerCase().indexOf(search_params) != -1
      );
      if (cpyFilter) {
        setSearchSuggestions(cpyFilter);
      }
    }
    if (e.target.value === "") {
      setSearchSuggestions([]);
    }
  };

  const startSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search_params !== "") {
      dispatch(searchProducts(search_params));
      navigate(`/search/${search_params}`);
      setSearchSuggestions([]);
    }
  };

  const getUserInputSearch = (product_name: string) => {
    dispatch(getSearchParams(product_name));
    dispatch(showSuggestionDiv(false));
  };

  return (
    <>
      {/* for mobile devices */}
      <div className="sticky_nav glass">
        <div className="logo">
          <Link to={"/"}>
            <h2 className="cursor-pointer">
              Amaeton Fashion <span className="h_sup">H</span>
            </h2>
          </Link>
        </div>

        <button
          onClick={() =>
            sidebar_isActive
              ? dispatch(toggleSidebarView(false))
              : dispatch(toggleSidebarView(true))
          }
          className={
            sidebar_isActive ? "hamburger_btn active" : "hamburger_btn"
          }
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <div
          onClick={() => dispatch(toggleSidebarView(false))}
          className="side__bar glass"
        >
          <p className="px-4">Category</p>

          <div className="links link__two">
            <Link to={"/products"}>
              <MdOutlineAllInclusive />
              All
            </Link>
          </div>
          <div className="links link__three">
            <Link to={`/products/clothing`}>
              <GiClothes />
              Clothing
            </Link>
          </div>
          <div className="links link__four">
            <Link to={`products/shoes`}>
              <GiSonicShoes />
              Shoes
            </Link>
          </div>
          <div className="links link__five">
            <Link to={`/products/accessories`}>
              <DiHtml5DeviceAccess />
              Accessories
            </Link>
          </div>

          <div className="links link__six">
            <Link to={`/products/jewelry`}>
              <GiJeweledChalice />
              Jewelry
            </Link>
          </div>
          <div className="links link__seven">
            <Link to={`/products/watches`}>
              <MdWatch />
              Watches
            </Link>
          </div>
          <div className="links link__eight">
            <Link to={`/favorites`}>
              <FaRegHeart />
              Favorites
            </Link>
          </div>
          <div className="links link__nine">
            <Link to={`/cart`}>
              <TbShoppingCart />
              Cart
            </Link>
          </div>
          <div className="links last_link">
            {cookie["token"] ? (
              <button className="ml-[1rem]" onClick={signout}>
                Log Out
              </button>
            ) : (
              <Link to={`/signin`}>
                <ImProfile />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* for all devices */}

      <nav>
        <div className="logo">
          <Link to={"/"}>
            <h2 className="cursor-pointer">
              Amaeton Fashion <span className="h_sup">H</span>
            </h2>
          </Link>
        </div>

        <form
          onSubmit={startSearch}
          className="search_sec"
          action=""
          method="get"
        >
          <input
            className="search"
            type="search"
            name="search"
            autoComplete="off"
            id="search"
            value={search_params}
            onChange={getSearchValue}
            placeholder="Search products , brands and categories"
            required
          />
          {/* <button>Search</button> */}
          <button>
            <IoMdSearch />
          </button>
          <ul
            className={
              suggestionsDiv ? "suggestions_div active" : "suggestions_div"
            }
          >
            {searchSuggestions &&
              searchSuggestions.map((suggestion, index) => (
                <li
                  onClick={() => getUserInputSearch(suggestion.product_name)}
                  key={index}
                >
                  {suggestion.product_name}
                </li>
              ))}
          </ul>
        </form>

        <div className="navlinks">
          <div className="wishlist_icon icon_div" data-tooltip="wishlist">
            {favorites.length !== 0 && cookie["token"] && (
              <p className="favorites_count pointer-events-none">
                {favorites.length}
              </p>
            )}
            <HeartOutlinedMemo
              className="icon"
              onClick={() => navigate("/favorites")}
            />
          </div>

          {cookie["token"] ? (
            <Avatar
              style={{
                backgroundColor: "var(--accent-clr)",
                verticalAlign: "middle",
                cursor: "pointer",
              }}
              size="default"
              onClick={() =>
                profileModalState
                  ? dispatch(setProfileModalState(false))
                  : dispatch(setProfileModalState(true))
              }
              className="avatar"
            >
              {user &&
                user.length >= 0 &&
                user[0]?.username.charAt(0).toUpperCase()}
            </Avatar>
          ) : (
            <div className="user_icon icon_div" data-tooltip="Sign In">
              <Link to={"/signin"}>
                <UserOutlinedMemo className="icon" />
              </Link>
            </div>
          )}

          <div className="cart_icon icon_div" data-tooltip="Cart">
            {cart.length != 0 && cookie["token"] && (
              <p className="favorites_count pointer-events-none">
                {cart.length}
              </p>
            )}
            <Link to={"/cart"}>
              <ShoppingCartOutlinedMemo className="icon" />
            </Link>
          </div>
        </div>
      </nav>

      <div
        className={
          profileModalState
            ? "profile_modal_outside_wrapper active"
            : "profile_modal_outside_wrapper "
        }
        onClick={() =>
          profileModalState && dispatch(setProfileModalState(false))
        }
      >
        <div
          className={
            profileModalState ? "profile_modal active" : "profile_modal"
          }
        >
          <div className="user_details">
            <Avatar
              className="avatar"
              style={{
                backgroundColor: "var(--accent-clr)",
                verticalAlign: "middle",
                cursor: "pointer",
              }}
              size="large"
            >
              {user &&
                user.length >= 0 &&
                user[0]?.username.charAt(0).toUpperCase()}
            </Avatar>
            <p>{user[0]?.username}</p>
            <p>{user[0]?.email}</p>
          </div>

          <Link
            to={"/profile"}
            onClick={goToProfilePage}
            className="cursor-pointer"
          >
            <LuPencil /> Customize user profile
          </Link>
          <Link
            to="/signin"
            onClick={signout}
            className="content-end cursor-pointer"
          >
            <LogoutOutlinedMemo /> Log out
          </Link>
        </div>
      </div>

      {path == "/profile" ? "" : <SearchCategoryMemo />}
    </>
  );
};

export default Navbar;
