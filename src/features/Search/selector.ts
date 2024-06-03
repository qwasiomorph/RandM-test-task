import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store/store";
import { prepareQuery, sliceOffQuery } from "../../utils/utils";

export const selectCharacterList = (state: RootState) =>
  state.search.characterList;

export const selectCharacterNextPage = (state: RootState) =>
  state.search.characterNextLink;

export const selectEpisodeList = (state: RootState) => state.search.episodeList;

export const selectLocationList = (state: RootState) =>
  state.search.locationList;

export const selectGenderFilter = (state: RootState) =>
  state.search.charGenderFilter;

export const selectStatusFilter = (state: RootState) =>
  state.search.charStatusFilter;

export const selectDimensionFilter = (state: RootState) =>
  state.search.locationDimensionFilter;

export const selectTypeFilter = (state: RootState) =>
  state.search.locationTypeFilter;

export const selectNameFilter = (state: RootState) => state.search.nameFilter;

export const selectCharQueryFilter = createSelector(
  [selectNameFilter, selectStatusFilter, selectGenderFilter],
  (name, status, gender) => prepareQuery("character", name, status, "", gender),
);

export const selectNextPageQuery = createSelector(
  [selectCharacterNextPage],
  (next) => {
    if (next) return sliceOffQuery(next);
    return next;
  },
);

export const selectPlaceQueryFilter = createSelector(
  [selectNameFilter, selectDimensionFilter],
  (name, dimension) => prepareQuery("location", name, "", dimension),
);

export const selectPlaceNext = (state: RootState) =>
  state.search.locationNextLink;

export const selectNextPlacePageQuery = createSelector(
  [selectPlaceNext],
  (next) => {
    if (next) return sliceOffQuery(next);
    return next;
  },
);

export const selectEpisodeQueryFilter = createSelector(
  [selectNameFilter],
  (name) => prepareQuery("episode", name),
);

export const selectEpisodeNext = (state: RootState) =>
  state.search.episodeNextLink;

export const selectNextEpisodePageQuery = createSelector(
  [selectEpisodeNext],
  (next) => {
    if (next) return sliceOffQuery(next);
    return next;
  },
);
