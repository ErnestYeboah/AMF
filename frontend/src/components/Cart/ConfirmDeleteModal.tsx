import { Popconfirm } from "antd";
import { memo, useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import {
  cartItemsSlice,
  deleteFromCart,
  getCartItems,
} from "../../features/CartSlice";

const ConfirmDeleteModal = ({ title, id }: { title: string; id: number }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();
  const [cookie] = useCookies(["token"]);
  const { removing_item_from_cart_status } = useSelector(cartItemsSlice);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    if (id) {
      setConfirmLoading(true);
      dispatch(deleteFromCart({ id: id, token: cookie["token"] }));
    }
  };
  useEffect(() => {
    if (removing_item_from_cart_status !== "idle") {
      setOpen(false);
      setConfirmLoading(false);
    }
    if (removing_item_from_cart_status == "succeeded") {
      dispatch(getCartItems(cookie["token"]));
    }
  }, [removing_item_from_cart_status, dispatch, cookie]);

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Popconfirm
      title={title}
      description="Are you sure you want to delete this item?"
      open={open}
      onConfirm={handleOk}
      okText="Yes"
      icon={<DeleteOutlined />}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      <button className="remove_btn" onClick={showPopconfirm}>
        Remove
      </button>
    </Popconfirm>
  );
};

export default memo(ConfirmDeleteModal);
