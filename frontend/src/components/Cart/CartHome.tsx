import { useSelector } from "react-redux";
import { cartItemsSlice } from "../../features/CartSlice";
import { productStoreSlice } from "../../features/ProductStoreSlice";
import CartProductCard from "./CartProductCard";
import "./cart.css";
import CheckOutModal from "./CheckOutModal";
import { useCookies } from "react-cookie";
import { message } from "antd";
import NoItemPage from "./NoItemPage";

const CartHome = () => {
  const { cart } = useSelector(cartItemsSlice);
  const { products } = useSelector(productStoreSlice);
  const [cookie] = useCookies(["token"]);
  const [, contextHolder] = message.useMessage();

  return (
    <div className="cart_container_wrapper">
      {contextHolder}
      {cart.length > 0 && cookie["token"] ? (
        cookie["token"] && (
          <div className="px-[var(--padding-inline)] cart__container">
            <div className="card__wrapper">
              {cart &&
                cart.map((cartItem, index) => {
                  const product = products.find(
                    (product) => product.id == cartItem.product_id
                  );
                  return (
                    product && <CartProductCard key={index} data={cartItem} />
                  );
                })}
            </div>

            <CheckOutModal />
          </div>
        )
      ) : (
        <NoItemPage message="No item/s in Cart" />
      )}
    </div>
  );
};

export default CartHome;
