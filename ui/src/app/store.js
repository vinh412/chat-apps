import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import channelsSlice from "../features/chat/channelsSlice";
import currentChatSlice from "../features/chat/currentChatSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        channels: channelsSlice,
        currentChatId: currentChatSlice
    },
});