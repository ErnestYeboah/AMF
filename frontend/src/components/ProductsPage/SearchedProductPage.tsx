import { useDispatch, useSelector } from "react-redux";
import {
  productStoreSlice,
  searchProducts,
} from "../../features/ProductStoreSlice";
import ProductCard from "./ProductCard";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

const SearchedProductPage = () => {
  const { searchedProducts } = useSelector(productStoreSlice);
  const { searchparams } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchProducts(searchparams));
  }, [searchparams, dispatch]);

  return (
    <div className="search_page">
      {searchedProducts.length === 0 ? (
        <div className="search_error_message_div">
          <div className="bino_parent">
            <img src="/images/binoculars.389fc56a.svg" alt="bino" />
          </div>
          <p>
            There are no results for{" "}
            <span className="font-bold"> "{searchparams}"</span>{" "}
          </p>
          <p>Check your spelling for typing errors</p>
          <p>Try searching with short and simple keywords</p>
          <Link to={"/"}>
            <button>Go to Homepage</button>
          </Link>
        </div>
      ) : (
        <div className="searched_products_container">
          {searchedProducts &&
            searchedProducts.map((product, index) => (
              <ProductCard productData={product} type="Regular" key={index} />
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchedProductPage;
