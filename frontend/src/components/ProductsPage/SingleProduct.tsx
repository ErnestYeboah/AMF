import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productStoreSlice } from "../../features/ProductStoreSlice";
import ProductCard from "./ProductCard";

const SingleProduct = () => {
  const { id } = useParams();
  const { products } = useSelector(productStoreSlice);

  const productsToShow = products.find((product) => product.id === Number(id));

  return (
    <div className="solo_preview">
      {productsToShow && (
        <ProductCard type="Detailed" productData={productsToShow} />
      )}
    </div>
  );
};

export default SingleProduct;
