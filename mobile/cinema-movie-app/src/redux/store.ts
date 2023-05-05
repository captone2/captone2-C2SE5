import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, compose, Reducer } from "redux";
import { AppActionType } from "./types";
import { userReducer } from "./auth/reducer";
// import { userReducer } from './user/reducer';
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const appReducers = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof appReducers>;

/**
 * It takes the current state and an action, and returns the next state
 * @param {RootState} state - RootState - The state of the application.
 * @param action - The action that was dispatched.
 * @returns The rootReducer is being returned.
 */

const rootReducer: Reducer = (state: RootState, action) => {
  // Reset state when logout
  if (action.type === AppActionType.RESET_STATE_ACTION_TYPE) {
    state = {} as RootState;
  }
  return appReducers(state, action);
};

export const resetStoreAction = () => ({
  type: AppActionType.RESET_STATE_ACTION_TYPE,
});

const store = configureStore({
  reducer: rootReducer,
  // devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;

export default store;
