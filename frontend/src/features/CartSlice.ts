import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "./ProductStoreSlice";

let loadingId: any;
export type CartProduct = {
  product_name: string;
  added_on: string;
  category: string;
  id: number;
  product_id: number;
  quantity: number;
  old_price: number;
  size: string;
  current_price: number;
};

export type LocalCartProduct = {
  thumbnail: string;
  product_name: string;
  added_on: string;
  category: string;
  id: number;
  product_id: number;
  quantity: number;
  old_price: number;
  size: string;
  current_price: number;
};

interface State {
  cart: CartProduct[];
  localCart: any[];
  fetching_cart_items_status: "idle" | "pending" | "succeeded" | "failed";
  adding_item_to_cart_status: "idle" | "pending" | "succeeded" | "failed";
  removing_item_from_cart_status: "idle" | "pending" | "succeeded" | "failed";
  updating_item_quantity_status: "idle" | "pending" | "succeeded" | "failed";
}

const loadCart = () => {
  try {
    const savedCart = localStorage.getItem("localCart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

const saveCart = (cart: any) => {
  localStorage.setItem("localCart", JSON.stringify(cart));
};

const initialState: State = {
  cart: [],
  localCart: loadCart(),
  fetching_cart_items_status: "idle",
  adding_item_to_cart_status: "idle",
  removing_item_from_cart_status: "idle",
  updating_item_quantity_status: "idle",
};

type Payload = {
  token: string;
  product: CartProduct;
};

export const addItemsToCart: any = createAsyncThunk(
  "add/cart",
  async (payload: Payload) => {
    const { token, product } = payload;
    if (token) {
      const response = await axios.post(`${BASE_URL}/cart/`, product, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    }
  }
);

export const getCartItems: any = createAsyncThunk(
  "get/cartItems",
  async (token) => {
    const response = await axios.get(`${BASE_URL}/cart`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return response.data;
  }
);

type DeleteCartItemPayload = {
  id: number;
  token: string;
};
export const deleteFromCart: any = createAsyncThunk(
  "delete/cart",
  async (payload: DeleteCartItemPayload) => {
    const { id, token } = payload;
    if (id) {
      const response = await axios.delete(`${BASE_URL}/cart/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      return response.data;
    }
  }
);

type UpdatePayload = {
  id: number;
  token: string;
  quantity: number;
};
export const updateItemQuantity: any = createAsyncThunk(
  "render_quantity/cart",
  async (payload: UpdatePayload) => {
    const { id, token, quantity } = payload;

    if (id) {
      const response = await axios.patch(
        `${BASE_URL}/cart/${id}/`,
        {
          quantity: quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response.data);

      return response.data;
    }
  }
);

export const CartStoreSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addToLocalCart(state, action) {
      state.localCart.push(action.payload);
      saveCart(state.localCart);
    },
    updateLocalCartItemQuantity(state, action) {
      const index = state.localCart.findIndex(
        (item) => item.product_name == action.payload.product_name
      );
      state.localCart.splice(index, 1, action.payload);
      saveCart(state.localCart);
      toast.success("changes applied successfully", {
        hideProgressBar: true,
        autoClose: 400,
      });
    },
    deleteItemFromLocalCart(state, action) {
      const index = state.localCart.findIndex(
        (item) => item.id == action.payload
      );
      state.localCart.splice(index, 1);
      saveCart(state.localCart);
      toast.success("item removed from cart successfully", {
        hideProgressBar: true,
        autoClose: 400,
      });
    },
  },
  extraReducers(builder) {
    builder
      // adding items to cart
      .addCase(addItemsToCart.pending, (state) => {
        state.adding_item_to_cart_status = "pending";
      })
      .addCase(addItemsToCart.fulfilled, (state, action) => {
        state.adding_item_to_cart_status = "succeeded";
        state.cart.push(action.payload);
        toast.success("Product added to cart successfully", {
          hideProgressBar: true,
          autoClose: 400,
        });
      })
      .addCase(addItemsToCart.rejected, (state) => {
        state.adding_item_to_cart_status = "failed";
        toast.error(
          "Could not add to cart , item already exists or check your internet connection",
          {
            hideProgressBar: true,
            autoClose: 400,
          }
        );
      })

      // fetching cart items
      .addCase(getCartItems.pending, (state) => {
        state.fetching_cart_items_status = "pending";
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.fetching_cart_items_status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(getCartItems.rejected, (state) => {
        state.fetching_cart_items_status = "failed";
        toast.error("Could not fetch items from cart , check your connection", {
          hideProgressBar: true,
          autoClose: 400,
        });
      })

      // removing  items from cart
      .addCase(deleteFromCart.pending, (state) => {
        state.removing_item_from_cart_status = "pending";
      })
      .addCase(deleteFromCart.fulfilled, (state) => {
        state.removing_item_from_cart_status = "succeeded";
        toast.success("Item successfully removed from cart", {
          hideProgressBar: true,
          autoClose: 400,
        });
      })
      .addCase(deleteFromCart.rejected, (state) => {
        state.removing_item_from_cart_status = "failed";
        toast.error("Something happened , could not remove item from cart", {
          hideProgressBar: true,
          autoClose: 400,
        });
      })

      // updating item quantity
      .addCase(updateItemQuantity.pending, (state) => {
        state.updating_item_quantity_status = "pending";
        loadingId = toast.loading("Applying your changes...");
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.updating_item_quantity_status = "succeeded";
        const indexOfPayload = state.cart.findIndex(
          (item) => item.product_id === action.payload.product_id
        );

        state.cart.splice(indexOfPayload, 1, action.payload);
        toast.success("changes applied succesfully", {
          autoClose: 400,
          hideProgressBar: true,
        });
        toast.dismiss(loadingId);
      })
      .addCase(updateItemQuantity.rejected, (state) => {
        state.updating_item_quantity_status = "failed";
        toast.error("Something happened , could not update product quantity", {
          hideProgressBar: true,
          autoClose: 400,
        });
      });
  },
});

export default CartStoreSlice.reducer;
export const {
  addToLocalCart,
  updateLocalCartItemQuantity,
  deleteItemFromLocalCart,
} = CartStoreSlice.actions;
export const cartItemsSlice = (state: { cart: State }) => state.cart;
