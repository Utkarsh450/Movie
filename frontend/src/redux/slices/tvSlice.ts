import { createSlice } from "@reduxjs/toolkit";

const tvSlice = createSlice({
  name: "tv",
  initialState: {
    trending: [],
    popular: [],
    topRated: [],
    airingToday: []
  },
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