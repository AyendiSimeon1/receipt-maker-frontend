
import authReducer from './authSlice';
import productReducer from './productSlice';
import purchaseReducer from './purchaseSlice';
import {  combineReducers } from 'redux';


const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  purchase: purchaseReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;