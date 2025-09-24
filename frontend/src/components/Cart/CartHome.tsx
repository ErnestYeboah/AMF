import { useSelector } from "react-redux";
import { cartItemsSlice } from "../../features/CartSlice";
import { productStoreSlice } from "../../features/ProductStoreSlice";
import CartProductCard from "./CartProductCard";
import "./cart.css";
import { Link } from "react-router-dom";
import CheckOutModal from "./CheckOutModal";
import { useCookies } from "react-cookie";
import { message } from "antd";

const CartHome = () => {
  const { cart } = useSelector(cartItemsSlice);
  const { products } = useSelector(productStoreSlice);
  const [cookie] = useCookies(["token"]);
  const [, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      {cart.length > 0 ? (
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
        <div className="text-center">
          <p className=" opacity-[.6] text-[2rem] mt-[var(--margin)] ">
            No item/s in Cart{" "}
          </p>
          {!cookie["token"] && (
            <p>
              <Link className="text-[var(--accent-clr)]" to={"/signin"}>
                Sign In
              </Link>{" "}
              to view your items in cart
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default CartHome;
