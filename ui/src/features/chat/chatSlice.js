import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stompClient } from "../../ws";
import client from "../../fetchApi";

const initialState = {
  channels: [],
  status: "idle",
  error: null,
  currentChatId: null,
};

export const fetchChannels = createAsyncThunk(
  "chat/fetchChannels",
  async (jwt) => {
    const response = await client.getAllChannelsOfUser(jwt);
    return await response.json();
  }
);

export const fetchCreateChannel = createAsyncThunk(
  "chat/fetchCreateChannel",
  async (data) => {
    const response = await client.createChannel(data.channelName, data.jwt);
    return await response.json();
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      const channelId = action.payload.key.channelId;
      const channel = state.channels.find(
        (channel) => channel.id === channelId
      );
      if (channel) {
        channel.messages.push(action.payload);
      }
    },

    receiveMessage: (state, action) => {
      const channel = state.channels.find(
        (channel) => channel.id === action.payload.key.channelId
      );
      channel.messages.push(action.payload);
    },

    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchChannels.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.channels = action.payload;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCreateChannel.fulfilled, (state, action) => {
        state.channels.push(action.payload);
      });
  },
});

export const { sendMessage, receiveMessage, setCurrentChatId } =
  chatSlice.actions;
export default chatSlice.reducer;
