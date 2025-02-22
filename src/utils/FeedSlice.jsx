import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        setfeed: (state, action) => {
            return action.payload
        },
        removeFeed: (state, action) => {
            return null
        }
    }
})

export const { setfeed, removeFeed } = feedSlice.actions
export default feedSlice.reducer