import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the Product interface
interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  createdBy: string;
}

// Define the state structure
interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null
};

// Create the async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://127.0.0.1:3004/product/get-products');
      console.log('Fetched data:', response.data);
      return response.data.data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return rejectWithValue('Failed to fetch products');
    }
  }
);

// Create the product slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('Fetching products...');
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        console.log('Products fetched successfully:', state.products);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error('Failed to fetch products:', state.error);
      });
  },
});

// Export actions
export const { addProduct, updateProduct, deleteProduct } = productSlice.actions;

// Export reducer
export default productSlice.reducer;