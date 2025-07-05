import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload; // ✅ only update user field
        },
        removeUser: (state) => {
            state.user = null;
        },
    },
});


export const { setUser, removeUser } = UserSlice.actions
export default UserSlice.reducer

