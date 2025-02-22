import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./AppSlice"
const AppStore = configureStore({
    reducer: {
        appSlice: appSlice
    }
})

export default AppStore