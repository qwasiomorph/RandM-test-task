import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./RootReducers";

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
