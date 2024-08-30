import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  createdBy: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () =>{
  try {
    const response = await axios.get('http://127.0.0.1:3004/product/get-products');
    console.log(response.data.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.loading = false;
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.products.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(p => p._id !== action.payload);
    }
  }
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  addProduct,
  updateProduct,
  deleteProduct
} = productSlice.actions;

export default productSlice.reducer;