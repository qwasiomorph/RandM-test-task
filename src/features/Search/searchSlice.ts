import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICharacter, ICharacterList } from "../../types/character/characterDTO";
import { ILocation, ILocationList } from "../../types/location/locationDTO";
import { IEpisode, IEpisodeList } from "../../types/episode/episodeDTO";

const initialState = {
  nameFilter: "",
  charStatusFilter: "",
  charGenderFilter: "",
  locationNameFilter: "",
  locationDimensionFilter: "",
  locationTypeFilter: "",
  characterNextLink: null as string | null,
  locationNextLink: null as string | null,
  episodeNextLink: null as string | null,
  characterList: null as ICharacter[] | null,
  locationList: null as ILocation[] | null,
  episodeList: null as IEpisode[] | null,
};

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setCharacterList(state, action: PayloadAction<ICharacterList>) {
      state.characterList = state.characterList
        ? state.characterList.concat(action.payload?.results)
        : action.payload?.results;
      state.characterNextLink = action.payload?.info.next;
    },
    setLocationList(state, action: PayloadAction<ILocationList>) {
      state.locationList = state.locationList
        ? state.locationList?.concat(action.payload?.results)
        : action.payload?.results;
      state.locationNextLink = action.payload?.info.next;
    },
    setEpisodeList(state, action: PayloadAction<IEpisodeList>) {
      state.episodeList = state.episodeList
        ? state.episodeList?.concat(action.payload?.results)
        : action.payload?.results;
      state.episodeNextLink = action.payload?.info.next;
    },
    setNameFilter(state, action: PayloadAction<string>) {
      state.nameFilter = action.payload;
      state.characterList = null;
      state.locationList = null;
      state.episodeList = null;
      state.characterNextLink = null;
    },
    setCharStatusFilter(state, action: PayloadAction<string>) {
      state.charStatusFilter = action.payload;
      state.characterList = null;
      state.characterNextLink = null;
    },
    setCharGenderFilter(state, action: PayloadAction<string>) {
      state.charGenderFilter = action.payload;
      state.characterList = null;
      state.characterNextLink = null;
    },
    setLocationDimensionFilter(state, action: PayloadAction<string>) {
      state.locationDimensionFilter = action.payload;
      state.locationList = null;
    },
    setLocationTypeFilter(state, action: PayloadAction<string>) {
      state.locationTypeFilter = action.payload;
      state.locationList = null;
    },
    clearAll(state) {
      state.nameFilter = "";
      state.charStatusFilter = "";
      state.charGenderFilter = "";
      state.locationNameFilter = "";
      state.locationDimensionFilter = "";
      state.locationTypeFilter = "";
      state.characterNextLink = null;
      state.characterList = null;
      state.locationList = null;
      state.episodeList = null;
      state.episodeNextLink = null;
      state.locationNextLink = null;
    },
  },
});

export const {
  setCharacterList,
  setLocationList,
  setEpisodeList,
  setCharGenderFilter,
  setNameFilter,
  setCharStatusFilter,
  setLocationDimensionFilter,
  setLocationTypeFilter,
  clearAll,
} = searchSlice.actions;

export default searchSlice.reducer;
