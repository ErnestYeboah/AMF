import { useSelector } from "react-redux";
import { cartItemsSlice } from "../../features/CartSlice";
import { productStoreSlice } from "../../features/ProductStoreSlice";
import CartProductCard from "./CartProductCard";
import "./cart.css";
import CheckOutModal from "./CheckOutModal";
import { useCookies } from "react-cookie";
import { message } from "antd";
import NoItemPage from "./NoItemPage";
import LocalCartProductCard from "./LocalCartProductCard";

const CartHome = () => {
  const { cart, localCart } = useSelector(cartItemsSlice);
  const { products } = useSelector(productStoreSlice);
  // for authenticated users
  const [cookie] = useCookies(["token"]);

  const [, contextHolder] = message.useMessage();

  return (
    <div className="cart_container_wrapper">
      {contextHolder}

      {cart.length == 0 && localCart.length == 0 ? (
        <NoItemPage message="No item/s in Cart" />
      ) : cookie["token"] ? (
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
      ) : (
        <div className=" px-[var(--padding-inline)] cart__container">
          <div className="card__wrapper">
            {localCart &&
              localCart.map((item, index) => (
                <LocalCartProductCard data={item} key={index} />
              ))}
          </div>
          <CheckOutModal />
        </div>
      )}
    </div>
  );
};

export default CartHome;
