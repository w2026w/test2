import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  products: [],
  isLoading: false,
};

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    try {
      const { data } = await axios.get("/products");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get All Products
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default productSlice.reducer;
