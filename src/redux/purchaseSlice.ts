import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  _id: string;
  quantity: number;
  price: number;
}

interface Purchase {
  _id: string;
  customer: string;
  products: Product[];
  totalAmount: number;
  receiptNumber: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

interface PurchaseState {
  purchases: Purchase[];
  loading: boolean;
  error: string | null;
}

const initialState: PurchaseState = {
  purchases: [],
  loading: false,
  error: null
};

export const createPurchase = createAsyncThunk('purchase/createPurchase', async (purchase: Purchase) => {
    try {
        const response = await axios.post('https://receipt-maker.onrender.com/purchase', purchase);
        return response.data;
    } catch (error) {
        console.error(error);
    }
})

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    fetchPurchasesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPurchasesSuccess(state, action: PayloadAction<Purchase[]>) {
      state.purchases = action.payload;
      state.loading = false;
    },
    fetchPurchasesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addPurchase(state, action: PayloadAction<Purchase>) {
      state.purchases.push(action.payload);
    },
    updatePurchase(state, action: PayloadAction<Purchase>) {
      const index = state.purchases.findIndex(p => p._id === action.payload._id);
      if (index !== -1) {
        state.purchases[index] = action.payload;
      }
    },
    deletePurchase(state, action: PayloadAction<string>) {
      state.purchases = state.purchases.filter(p => p._id !== action.payload);
    }
  }
});

export const {
  fetchPurchasesStart,
  fetchPurchasesSuccess,
  fetchPurchasesFailure,
  addPurchase,
  updatePurchase,
  deletePurchase
} = purchaseSlice.actions;

export default purchaseSlice.reducer;