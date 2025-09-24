import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchProductsByCategory,
  productStoreSlice,
} from "../../features/ProductStoreSlice";
import ProductCard from "./ProductCard";
import { useEffect } from "react";

const ProductHomeCategory = () => {
  const { category } = useParams();
  const { productscategory: products } = useSelector(productStoreSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (category) {
      dispatch(fetchProductsByCategory(category));
    }
  }, [category]);

  return (
    <div className="products__container">
      {products &&
        products.map((product, index) => (
          <ProductCard type="Regular" productData={product} key={index} />
        ))}
    </div>
  );
};

export default ProductHomeCategory;
