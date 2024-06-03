import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const getTheme = () => {
  const theme = `${window?.localStorage?.getItem("theme")}`;
  if (["light", "dark"].includes(theme)) return theme;

  const userMedia = window.matchMedia("(prefers-color-scheme: light)");
  if (userMedia.matches) return "light";

  return "dark";
};

const initialState = getTheme();

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<string>) => action.payload,
  },
});

export const { set } = themeSlice.actions;

export default themeSlice.reducer;
