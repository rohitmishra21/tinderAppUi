import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice"
import feedReducer from "./FeedSlice"
import connectionReducer from "./ConnectionSlice"
import requestReducer from "./RequestSlice";
const AppStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connection: connectionReducer,
        requests: requestReducer
    }
})

export default AppStore