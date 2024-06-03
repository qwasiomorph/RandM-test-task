import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./RootReducers";
import { characterApi } from "../../services/character/character.api";
import { locationApi } from "../../services/location/location.api";
import { episodeApi } from "../../services/episode/episode.api";

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      characterApi.middleware,
      locationApi.middleware,
      episodeApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
