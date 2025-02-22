import { createSlice } from "@reduxjs/toolkit";

const AppSlice = createSlice({
    name: "appSlice",
    initialState: {
        user: {}
    },
    reducers: {
        setUser: (state, action) => {
            return action.payload
        }
    }
})


export const { setUser } = AppSlice.actions
export default AppSlice.reducer

