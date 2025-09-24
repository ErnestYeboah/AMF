import { memo } from "react";
import { useSelector } from "react-redux";
import { cartItemsSlice } from "../../features/CartSlice";

const CheckOutModal = () => {
  const { cart } = useSelector(cartItemsSlice);

  const subtotal = cart.reduce((acc, x) => {
    return acc + x.current_price * x.quantity;
  }, 0);

  return (
    <div className="checkout__box p-[var(--padding-min)]">
      <p>CART SUMMARY</p>
      <div className="subtotal flex  gap-1">
        <div>
          <p>Subtotal</p>
          <p className="text-[.9rem]">Delivery fees not included yet</p>
        </div>
        <p className="text-[1.4rem] text-[var(--accent-clr)]">
          ₵{subtotal.toFixed(2)}
        </p>
      </div>
      <div>
        <p className="font-bold">Amaeton Fashion House</p>
        <p>The best and quality goods you can get , free delivery</p>
      </div>
      <button className="mt-[1rem]">Checkout ₵{subtotal.toFixed(2)}</button>
    </div>
  );
};

export default memo(CheckOutModal);
