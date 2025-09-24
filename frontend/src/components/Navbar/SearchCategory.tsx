import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductsByCategory } from "../../features/ProductStoreSlice";

type Classname = {
  class_name?: "primary" | "accent";
};

const categorylist = [
  {
    category: "All",
  },
  {
    to: "clothing",
    category: "Clothing",
  },
  {
    to: "accessories",
    category: "Accessories",
  },
  {
    to: "shoes",
    category: "Shoes",
  },
  {
    to: "jewelry",
    category: "Jewelry",
  },
  {
    to: "watches",
    category: "Watches",
  },
];

const SearchCategory = ({ class_name = "primary" }: Classname) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchCategoryProducts = (category_name: string) => {
    dispatch(fetchProductsByCategory(category_name));
    navigate(`/products/${category_name}`);
  };
  return (
    <div className="search_category_btns_div">
      {categorylist &&
        categorylist.map((item, index) => (
          <button
            className={class_name == "primary" ? "primary" : ""}
            key={index}
            onClick={
              item.to
                ? () => fetchCategoryProducts(item.to)
                : () => navigate("/products")
            }
          >
            {item.category}
          </button>
        ))}
    </div>
  );
};

export default SearchCategory;
