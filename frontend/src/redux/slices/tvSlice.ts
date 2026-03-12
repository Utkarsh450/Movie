import { createSlice } from "@reduxjs/toolkit";
import type { MediaSummary } from "../../types/media";

interface TvState {
  trending: MediaSummary[];
  popular: MediaSummary[];
  topRated: MediaSummary[];
  airingToday: MediaSummary[];
}

const tvSlice = createSlice({
  name: "tv",
  initialState: {
    trending: [],
    popular: [],
    topRated: [],
    airingToday: []
  } as TvState,
  reducers: {

    addTrendingTV: (state, action) => {
      state.trending = action.payload;
    },

    addPopularTV: (state, action) => {
      state.popular = action.payload;
    },

    addTopRatedTV: (state, action) => {
      state.topRated = action.payload;
    },

  }
});

export const {
  addTrendingTV,
  addPopularTV,
  addTopRatedTV,
} = tvSlice.actions;

export default tvSlice.reducer;
