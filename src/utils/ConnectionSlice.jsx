import { createSlice } from "@reduxjs/toolkit";

const ConnectionSlice = createSlice({
    name: "connections",
    initialState: null,
    reducers: {
        setConnection: (state, actions) => actions.payload
    }
})

export const { setConnection } = ConnectionSlice.actions
export default ConnectionSlice.reducer