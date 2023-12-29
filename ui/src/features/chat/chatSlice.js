import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../fetchApi";

const initialState = {
  channels: [],
  status: "idle",
  error: null,
  currentChatId: null,
};

const example = {
  channels: [
    {
      id: 1,
      name: "Hội anh em thiện lành",
      members: [
        {
          id: 1,
          email: "vinh@dev.com",
          firstname: "Vinh",
          lastname: "Dương",
          joiningDate: "2017-01-01",
        },
        {
          id: 2,
          email: "hung@dev.com",
          firstname: "Hùng",
          lastname: "Nguyễn",
          joiningDate: "2017-01-01",
        },
      ],
      messages: [
        // fetch from API and update from websocket
        {
          id: 1,
          userId: 1,
          content: "Hello",
          timestamp: "July",
        },
        {
          id: 2,
          userId: 2,
          content: "Hi",
          timestamp: "July",
        },
        {
          id: 3,
          userId: 2,
          content: "How are you?",
          timestamp: "July",
        },
        {
          id: 4,
          userId: 1,
          content: "Fine, thanks",
          timestamp: "July",
        },
      ],
    },
    {
      id: 2,
      name: "A1 K55 YP1",
      members: [
        {
          id: 1,
          email: "vinh@dev.com",
          firstname: "Vinh",
          lastname: "Dương",
          joiningDate: "2017-01-01",
        },
        {
          id: 2,
          email: "hung@dev.com",
          firstname: "Hùng",
          lastname: "Nguyễn",
          joiningDate: "2017-01-01",
        },
      ],
      messages: [
        // fetch from API and update from websocket
        {
          id: 1,
          userId: 1,
          content: "Xin chào",
          timestamp: "July",
        },
        {
          id: 2,
          userId: 2,
          content: "Chào",
          timestamp: "July",
        },
        {
          id: 3,
          userId: 2,
          content: "Hehe",
          timestamp: "July",
        },
        {
          id: 4,
          userId: 1,
          content: "Hô hô",
          timestamp: "July",
        },
      ],
    },
  ],
  currentChat: null,
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
      const channel = state.channels.find((channel) => channel.id === channelId);
      if (channel) {
        channel.messages.push(action.payload);
      }
    },

    receiveMessage: (state, action) => {
      const channel = state.channels.find(channel => channel.id === action.payload.key.channelId);
      channel.messages.push(action.payload);
    },

    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    }
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

export const { sendMessage, receiveMessage, setCurrentChatId } = chatSlice.actions;
export default chatSlice.reducer;