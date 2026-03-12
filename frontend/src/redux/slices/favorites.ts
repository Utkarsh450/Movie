import { createSlice,type PayloadAction } from "@reduxjs/toolkit"

interface FavoriteItem {
  id: number
  poster_path: string
  title?: string
  name?: string
  media_type: "movie" | "tv"
}

interface FavoritesState {
  items: FavoriteItem[]
}

const initialState: FavoritesState = {
  items: []
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {

    toggleFavorite: (state, action: PayloadAction<FavoriteItem>) => {

      const exists = state.items.find(
        item => item.id === action.payload.id
      )

      if (exists) {
        state.items = state.items.filter(
          item => item.id !== action.payload.id
        )
      } else {
        state.items.push(action.payload)
      }

    }

  }
})

export const { toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer