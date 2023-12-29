import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import chatSlice from "../features/chat/chatSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        chat: chatSlice,
    },
});