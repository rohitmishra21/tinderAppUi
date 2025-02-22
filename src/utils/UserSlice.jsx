import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            return action.payload
        },
        removeUser: (state, action) => {
            return null
        }
    }

})


export const { setUser, removeUser } = UserSlice.actions
export default UserSlice.reducer

