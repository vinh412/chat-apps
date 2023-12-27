import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const currentChatSlice = createSlice({
  name: "currentChat",
  initialState,
  reducers: {
    setCurrentChatId: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCurrentChatId } = currentChatSlice.actions;
export default currentChatSlice.reducer;
