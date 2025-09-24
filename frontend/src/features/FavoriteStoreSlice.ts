import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const BASE_URL = `http://127.0.0.1:8000/api`;

export type Favorite = {
  id: number;
  product_name: string;
  product_id: number;
  added_on: string;
};

interface State {
  favorites: Favorite[];
  fetching_favaorite_products_status:
    | "idle"
    | "pending"
    | "succeeded"
    | "failed";
  adding_product_to_favorite_status:
    | "idle"
    | "pending"
    | "succeeded"
    | "failed";
  removing_product_from_favorite_status:
    | "idle"
    | "pending"
    | "succeeded"
    | "failed";
}

const initialState: State = {
  favorites: [],
  fetching_favaorite_products_status: "idle",
  adding_product_to_favorite_status: "idle",
  removing_product_from_favorite_status: "idle",
};

// get favorite products
export const getFavoritesItems: any = createAsyncThunk(
  "get/favorites",
  async (token: string) => {
    if (token) {
      const response = await axios.get(`${BASE_URL}/favorites`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      return response.data;
    }
  }
);

// add products to favorite
type Payload = {
  product: { product_name: string; id: number };
  token: string;
};

export const addToFavorites: any = createAsyncThunk(
  "add/favorites",
  async (payload: Payload) => {
    const { token, product } = payload;
    if (token) {
      const response = await axios.post(
        `${BASE_URL}/favorites/`,
        {
          product_name: product.product_name,
          product_id: product.id,
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

// delete from favorites

export const deleteFromFavorites: any = createAsyncThunk(
  "delete/favorites",
  async (payload: { token: string; id: number }) => {
    const { id, token } = payload;

    if (id) {
      const response = await axios.delete(`${BASE_URL}/favorites/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      return response.data;
    }
    return id;
  }
);

export const favoriteStoreSlice = createSlice({
  initialState,
  name: "favoriteProducts",
  reducers: {
    removeItemFromFavorites(state, action) {
      state.favorites.splice(action.payload, 1);
    },
  },
  extraReducers(builder) {
    builder
      // fetching favorite products
      .addCase(getFavoritesItems.pending, (state) => {
        state.fetching_favaorite_products_status = "pending";
      })
      .addCase(getFavoritesItems.fulfilled, (state, action) => {
        state.fetching_favaorite_products_status = "succeeded";
        state.favorites = action.payload;
      })
      .addCase(getFavoritesItems.rejected, (state) => {
        state.fetching_favaorite_products_status = "failed";
        toast.error("Could not fetch favorite items", {
          autoClose: 3000,
          hideProgressBar: true,
        });
      })
      // add to favorites
      .addCase(addToFavorites.pending, (state) => {
        state.adding_product_to_favorite_status = "pending";
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.adding_product_to_favorite_status = "succeeded";

        state.favorites.push(action.payload);
        toast.success("Product added to favorites", {
          autoClose: 3000,
          hideProgressBar: true,
        });
      })
      .addCase(addToFavorites.rejected, (state) => {
        state.adding_product_to_favorite_status = "failed";
        toast.error(
          "Could not add product to favorites or Product alrady in favorites ",
          {
            autoClose: 3000,
            hideProgressBar: true,
          }
        );
      })

      // remove product from favorites
      .addCase(deleteFromFavorites.pending, (state) => {
        state.removing_product_from_favorite_status = "pending";
      })
      .addCase(deleteFromFavorites.fulfilled, (state) => {
        state.removing_product_from_favorite_status = "succeeded";

        toast.success("Removed from favorites  ", {
          autoClose: 3000,
          hideProgressBar: true,
        });
      })
      .addCase(deleteFromFavorites.rejected, (state) => {
        state.removing_product_from_favorite_status = "failed";

        toast.error("Could not remove product to favorites ", {
          autoClose: 3000,
          hideProgressBar: true,
        });
      });
  },
});

export default favoriteStoreSlice.reducer;
export const favoritesProuctsStore = (state: { favoriteProducts: State }) =>
  state.favoriteProducts;
export const { removeItemFromFavorites } = favoriteStoreSlice.actions;
