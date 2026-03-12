import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slices/movieSlice";
import tvReducer from "./slices/tvSlice";
import favoriteReducer from "./slices/favorites"
import historyReducer from "./slices/historySlice"
import authReducer from "./authSlice"

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    tv: tvReducer,

    favorites: favoriteReducer,
     history: historyReducer,
      auth: authReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;