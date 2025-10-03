import { useState } from "react";
import {
  updateLocalCartItemQuantity,
  type LocalCartProduct,
} from "../../features/CartSlice";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useDispatch } from "react-redux";

const LocalCartProductCard = ({ data }: { data: LocalCartProduct }) => {
  const dispatch = useDispatch();
  const {
    product_name,
    category,
    thumbnail,
    current_price,
    id,
    quantity,
    size,
    old_price,
  } = data;
  const [isLoading] = useState(false);
  const [newQuantity, setNewQuantity] = useState(quantity);

  const getNewQuantity = (e: number, data: LocalCartProduct) => {
    setNewQuantity(e);
    dispatch(updateLocalCartItemQuantity({ ...data, quantity: e }));
  };

  return (
    <div className="cart_card">
      <div className="image__container">
        <img src={thumbnail} alt="" />
      </div>
      <div className="text__content_div">
        <div className="text__content ">
          <p className="font-bold">{product_name}</p>
          <p className="light_font">{category}</p>
          <p>Size : {size}</p>
          <div className="flex items-center gap-1 ">
            <label className="flex items-center gap-2" htmlFor="quantity">
              Qty:
              <input
                type="number"
                disabled={isLoading}
                className="bg-gray-300 p-1 w-[5rem] text-center"
                value={newQuantity}
                // placeholder={quantity.toString()}
                onChange={(e) =>
                  getNewQuantity(Number(e.currentTarget.value), data)
                }
                id="quantity"
                min={1}
              />
            </label>
          </div>
        </div>

        <div className="prices ">
          <p className="text-[1.4rem] text-[var(--accent-clr)]">
            ₵{current_price}
          </p>
          <p>
            <s>₵{old_price}</s>
          </p>
        </div>

        <ConfirmDeleteModal title={product_name} id={id} />
      </div>
    </div>
  );
};

export default LocalCartProductCard;
