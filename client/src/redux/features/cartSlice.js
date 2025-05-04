import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  cart: [],
  isLoading: false,
  totalPrice: 0,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId }, { dispatch }) => {
    try {
      const { data } = await axios.post("/cart/addToCart", {
        userId,
        productId,
      });
      dispatch(getCart(userId));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async ({ userId, productId }, { dispatch }) => {
    try {
      const { data } = await axios.post("cart/removeCartItem", {
        userId,
        productId,
      });
      dispatch(getCart(userId));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCart = createAsyncThunk("cart/getCart", async (userId) => {
  try {
    const { data } = await axios.get(`/cart/${userId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
    return {};
});


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        calculateTotals: (state) => {
            state.totalPrice = state.cart.reduce(
                (total, item) => total + item.product.price,
                0
            );
        },
    },
    extraReducers: (builder) => {
        builder
            // Add To Cart
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload.products;
                cartSlice.caseReducers.calculateTotals(state);
            })
            .addCase(addToCart.rejected, (state) => {
                state.isLoading = false;
            })

            // Remove Cart Item
            .addCase(removeCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload.products;
                cartSlice.caseReducers.calculateTotals(state);
            })
            .addCase(removeCartItem.rejected, (state) => {
                state.isLoading = false;
            })

            // Get Cart
            .addCase(getCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload.products;
                cartSlice.caseReducers.calculateTotals(state);
            })
            .addCase(getCart.rejected, (state) => {
                state.isLoading = false;
            })

            // Clear Cart
            .addCase(clearCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.isLoading = false;
                state.cart = [];
                cartSlice.caseReducers.calculateTotals(state);
            })
            .addCase(clearCart.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;