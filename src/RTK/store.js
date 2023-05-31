import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./Slices/todoSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { todoApi } from "./api/todoApi";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

setupListeners(store.dispatch);
