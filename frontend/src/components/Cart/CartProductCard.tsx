import { useDispatch, useSelector } from "react-redux";
import {
  cartItemsSlice,
  updateItemQuantity,
  type CartProduct,
} from "../../features/CartSlice";
import { productStoreSlice } from "../../features/ProductStoreSlice";
import { useEffect, useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useCookies } from "react-cookie";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const CartProductCard = ({ data }: { data: CartProduct }) => {
  const { id, product_id, product_name, category, quantity, size } =
    data as CartProduct;
  const { products } = useSelector(productStoreSlice);
  const dispatch = useDispatch();
  const { thumbnail, old_price, price } = products[product_id - 1];
  const [newQuantity, setNewQuantity] = useState<number>();
  const [cookie] = useCookies(["token"]);
  const {} = useSelector(cartItemsSlice);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (newQuantity) {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        dispatch(
          updateItemQuantity({
            quantity: newQuantity,
            id: id,
            token: cookie["token"],
          })
        );
        toast.success("changes applied successfully", {
          autoClose: 2000,
          hideProgressBar: true,
        });
      }, 1000);
    }
  }, [newQuantity]);

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
                placeholder={quantity.toString()}
                id="quantity"
                min={1}
                onChange={(e) => setNewQuantity(Number(e.target.value))}
              />
            </label>
            {isLoading && <Spinner />}
          </div>
        </div>

        <div className="prices ">
          <p className="text-[1.4rem] text-[var(--accent-clr)]">₵{price}</p>
          <p>
            <s>₵{old_price}</s>
          </p>
        </div>

        <ConfirmDeleteModal title={product_name} id={id} />
      </div>
    </div>
  );
};

export default CartProductCard;
