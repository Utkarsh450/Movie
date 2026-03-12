import { createSlice } from "@reduxjs/toolkit";

interface MovieState {
  trending: any[];
  popular: any[];
  topRated: any[];
  upcoming: any[];
  action: any[];
  comedy: any[];
}

const initialState: MovieState = {
  trending: [],
  popular: [],
  topRated: [],
  upcoming: [],

  action: [],
  comedy: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setTrending: (state, action) => {
      state.trending = action.payload;
    },
    setPopular: (state, action) => {
      state.popular = action.payload;
    },
    setTopRated: (state, action) => {
      state.topRated = action.payload;
    },
    setUpcoming: (state, action) => {
      state.upcoming = action.payload;
    
    },
     setAction: (state, action) => {
      state.action = action.payload;
    
    },
    setComedy: (state, action) => {
      state.comedy = action.payload;
    
    },
  }
});

export const {
  setTrending,
  setPopular,
  setTopRated,
  setUpcoming,
  setAction,
  setComedy
} = movieSlice.actions;

export default movieSlice.reducer;
