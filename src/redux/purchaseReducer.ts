interface Purchase {
    // Define the Purchase interface properties here
    // For example:
    id: string;
    amount: number;
    date: string;
    // Add other relevant properties
  }
  
  interface PurchaseState {
    purchases: Purchase[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: PurchaseState = {
    purchases: [],
    loading: false,
    error: null,
  };
  
  export const receiptReducer = (
    state = initialState,
    action: { type: string; payload: any }
  ): PurchaseState => {
    switch (action.type) {
      case 'SAVE_PURCHASE_SUCCESS':
        return {
          ...state,
          purchases: [...state.purchases, action.payload as Purchase],
          loading: false,
        };
      case 'SAVE_PURCHASE_FAILURE':
        return {
          ...state,
          error: action.payload as string,
          loading: false,
        };
      default:
        return state;
    }
  };