import { type Product } from "../../features/ProductStoreSlice";
import { type Favorite } from "../../features/FavoriteStoreSlice";
import { Link } from "react-router-dom";

const FavoriteProductCard = ({
  data,
  onclick,
}: {
  data: Product | Favorite;
  onclick: () => void;
}) => {
  const { added_on } = data as Favorite;
  const { product_name, thumbnail, price, category, id } = data as Product;

  return (
    <Link to={`/product/${id}`}>
      <div className="favorite__item_wrapper">
        <div className=" favorite_item">
          <button onClick={onclick} className="remove_btn">
            Remove
          </button>
          <div className="image_container">
            <img src={thumbnail} alt="" />
          </div>
          <div className="text__content">
            <p>
              <b>{product_name}</b>
            </p>
            <p>{category}</p>
            <p>${price}</p>
          </div>
          <p className="opacity-[0.7] text-xs">
            Added on {new Date(added_on).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default FavoriteProductCard;
