import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk'; // Named import for thunk
import loginReducer from './loginReducer'; // Adjust path as needed

// Combine reducers if you have multiple reducers
const rootReducer = combineReducers({
  login: loginReducer,
  // Add other reducers here if needed
});

// Create the Redux store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

// Optional: Log state changes (useful for debugging)
store.subscribe(() => {
  console.log(store.getState());
});
