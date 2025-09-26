import { memo } from "react";
import { useSelector } from "react-redux";
import { cartItemsSlice } from "../../features/CartSlice";
import { productStoreSlice } from "../../features/ProductStoreSlice";
import emailjs from "@emailjs/browser";
import { message } from "antd";

const CheckOutModal = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { cart } = useSelector(cartItemsSlice);
  const { user } = useSelector(productStoreSlice);

  const subtotal = cart.reduce((acc, x) => {
    return acc + x.current_price * x.quantity;
  }, 0);

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Checkout completed , thank you for buying from us.",
    });
  };

  const serviceID = "service_23ywtw9";
  const templateID = "template_wqh8llj";
  const public_key = "cthl5Z_PUh6s4qIx2";

  const cartItems = cart.map((item) => {
    return {
      name: item.product_name,
      units: item.quantity,
      price: item.current_price,
    };
  });

  const templateParams = {
    total: `${subtotal.toFixed(2)}`,
    email: user[0]?.email,
    logo: "/images/Beaumont Finch Slip-On Shoes.jpeg",
    order_id: "gstw5ga",
    tax: "200",
    shipping: "Free",
    orders: cartItems,
  };

  const checoutTotal = () => {
    emailjs.send(serviceID, templateID, templateParams, public_key);
    success();
  };

  return (
    <>
      {contextHolder}
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
        <button onClick={checoutTotal} className="mt-[1rem]">
          Checkout ₵{subtotal.toFixed(2)}
        </button>
      </div>
    </>
  );
};

export default memo(CheckOutModal);
