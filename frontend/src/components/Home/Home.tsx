import { Link } from "react-router-dom";
import CarouselContainer from "./Carousel";
import React, { Fragment } from "react";
import "./home.css";

type JustIn = {
  name: string;
  category: "Clothing" | "Shoes & Sneakers";
};

const justInItems: JustIn[] = [
  {
    name: "Men 1pc Pop Art Print Zip Up Drawstring Rave….jpeg",
    category: "Clothing",
  },
  {
    name: "Denver_chicago Jordan 1 - Etsy.jpeg",
    category: "Shoes & Sneakers",
  },
  {
    name: "This is a comfort and style type of jacket! Thick….jpeg",
    category: "Clothing",
  },
  {
    name: "🏁 McLaren Satin Racing Jacket - Product….jpeg",
    category: "Clothing",
  },
  { name: "Beaumont Finch Slip-On Shoes.jpeg", category: "Shoes & Sneakers" },
];

const MemoCarousel = React.memo(CarouselContainer);
const Home = () => {
  return (
    <Fragment>
      <MemoCarousel />
      <div className="intro">
        <h1 className="">More Choice More running</h1>
        <Link to={"/products"}>
          <button className="shop_now_btn">SHOP NOW</button>
        </Link>
      </div>

      <section id="category_brief_log" className="section">
        <h2 className="mb-[var(--padding-1)]">Shop By Style</h2>
        <div className="parent_grid category_div">
          <div className="first_child">
            <button>Clothing</button>
          </div>
          <div className="second_child">
            <button>Shoes & Sneakers</button>
          </div>
          <div className="last_child">
            <button>Accessories</button>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="mb-[var(--padding-1)]">Just In</h2>
        <div className="parent_grid just_in_sec">
          {justInItems &&
            justInItems.map((item, index) => (
              <div key={index} className="card">
                <img src={`images/${item.name}`} key={index} alt="" />
                <button className="mt-[var(--padding-1)]">
                  {item.category}
                </button>
              </div>
            ))}
        </div>
      </section>

      <section className="section   mt-[var(--margin)]">
        <h1 className="logo_name">AMAETON FASHION HOUSE</h1>
        <Link to={"/signin"}>
          <button className="mx-auto block">Sign In</button>
        </Link>
      </section>

      <footer>
        <p className="text-center">
          {" "}
          &copy; 2025 AMAETON FASHION HOUSE. All rights reserved
        </p>
      </footer>
    </Fragment>
  );
};

export default Home;
