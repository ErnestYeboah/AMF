import { useSelector } from "react-redux";
import { productStoreSlice } from "../../features/ProductStoreSlice";
import ProductCard from "./ProductCard";

const ProductHome = () => {
  const { products } = useSelector(productStoreSlice);

  return (
    <div className="products__container">
      {products &&
        products.map((product, index) => (
          <ProductCard type="Regular" productData={product} key={index} />
        ))}
    </div>
  );
};

export default ProductHome;
