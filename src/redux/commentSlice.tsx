import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'

const  initialState:{comments:string[]} = {
    comments: []
}
export const commentSlice = createSlice({
  name: 'counter',
  initialState:initialState,
  reducers: {
    addComments: (state,action:PayloadAction<string>)=> {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.comments = [...state.comments,action.payload]
    },
  }
})

export const { addComments } = commentSlice.actions

