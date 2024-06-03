import { combineReducers } from "@reduxjs/toolkit";
import { characterApi } from "../../services/character/character.api";
import { locationApi } from "../../services/location/location.api";
import { episodeApi } from "../../services/episode/episode.api";
import searchSlice from "../../features/Search/searchSlice";
import { themeSlice } from "../../features/Theme/slice";

const rootReducers = combineReducers({
  search: searchSlice,
  theme: themeSlice.reducer,
  [characterApi.reducerPath]: characterApi.reducer,
  [locationApi.reducerPath]: locationApi.reducer,
  [episodeApi.reducerPath]: episodeApi.reducer,
});

export default rootReducers;
