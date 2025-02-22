import { createSlice } from "@reduxjs/toolkit";

const RequestSlice = createSlice({
    name: "Request",
    initialState: null,
    reducers: {
        setRequest: (state, action) => action.payload
    }
})

export const { setRequest } = RequestSlice.actions
export default RequestSlice.reducer