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

export const addMembersToChannel = createAsyncThunk(
  "chat/addMembersToChannel",
  async (data) => {
    const response = await client.addMembersToChannel(
      data.jwt,
      data.channelId,
      data.userIds
    );
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
      const message = action.payload;
      if (message.type === "JOIN") {
        stompClient.deactivate();
        state.status = "idle";
      } else {
        const channel = state.channels.find(
          (channel) => channel.id === message.key.channelId
        );
        channel.messages.push(message);
      }
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
      })
      .addCase(addMembersToChannel.fulfilled, (state, action) => {
        const channel = state.channels.find(
          (channel) => channel.id === action.payload.data.channelId
        );
        channel.members.push(...action.payload.data.newMembers);
      });
  },
});

export const { sendMessage, receiveMessage, setCurrentChatId } =
  chatSlice.actions;
export default chatSlice.reducer;
