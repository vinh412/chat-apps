import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: [],
  currentChat: null,
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

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    fetchAll: (state, action) => {
      state.channels = action.payload;
    },

    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },

    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },

    receiveMessage: (state, action) => {
        let index;
        for (let i = 0; i < state.channels.length; i++) {
            if (state.channels[i].id === action.payload.key.channelId){
                index = i;
            }
        }
        state.channels[index].messages.push(action.payload);
    }
  },
});

export const { fetchAll, setCurrentChat, addChannel, receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;
