// actions/purchaseActions.ts
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios from 'axios';
import { RootState } from '../store'; // Assume you have this type defined
import { Purchase } from '../components/adminPanel';

const baseUrl = 'https://receipt-maker.onrender.com/product/save-receipt'

export const savePurchase = (
  purchase: Purchase
): ThunkAction<Promise<Purchase>, RootState, unknown, AnyAction> => 
  async (dispatch) => {
    try {
      const response = await axios.post<Purchase>(`${baseUrl}`, purchase);
      dispatch({
        type: 'SAVE_PURCHASE_SUCCESS' as const,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: 'SAVE_PURCHASE_FAILURE' as const,
        payload: error instanceof Error ? error.message : 'An unknown error occurred',
      });
      throw error;
    }
  };

// Define action types
export type PurchaseActionTypes = 
  | ReturnType<typeof savePurchase>
  | { type: 'SAVE_PURCHASE_SUCCESS'; payload: Purchase }
  | { type: 'SAVE_PURCHASE_FAILURE'; payload: string };