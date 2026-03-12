import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface HistoryItem {
  id: number
  poster_path: string
  title?: string
  name?: string
  media_type: "movie" | "tv"
}

interface HistoryState {
  items: HistoryItem[]
}

const loadHistory = (): HistoryItem[] => {
  const data = localStorage.getItem("history")
  return data ? JSON.parse(data) : []
}

const initialState: HistoryState = {
  items: loadHistory()
}

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {

    addHistory: (state, action: PayloadAction<HistoryItem>) => {

      const exists = state.items.find(
        item => item.id === action.payload.id
      )

      if(!exists){
        state.items.unshift(action.payload)
      }

      state.items = state.items.slice(0,30)

      localStorage.setItem(
        "history",
        JSON.stringify(state.items)
      )

    },

    clearHistory: (state)=>{
      state.items = []
      localStorage.removeItem("history")
    }

  }
})

export const { addHistory, clearHistory } = historySlice.actions
export default historySlice.reducer