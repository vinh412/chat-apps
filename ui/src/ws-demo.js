import client from "./fetchApi";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const jwt =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aW5oQGdtYWlsLmNvbSIsImlhdCI6MTcwNDQ1Nzk1MiwiZXhwIjoxNzA0NTQ0MzUyfQ.ZDrgjZrreSfpTt2TKoo38o4FJTr9vs4lMuA78hDr6SY";
const channelId = "1e7eb9cf-a6af-4720-9d32-271321a6a0f9";

const users = [];

export const autoChat = (users) => {
  for (let i = 0; i < users.length; i++) {
    const stompClient = new Client({
      webSocketFactory: () =>
        new SockJS(`${process.env.REACT_APP_CHAT_SERVER_URL}/ws`),
      onConnect: () => {
        stompClient.subscribe(`channel/${channelId}`);
        setInterval(
          () =>
            stompClient.publish({
              destination: `/app/channel/${channelId}`,
              body: JSON.stringify({
                key: { channelId: channelId },
                userId: users[i].id,
                content: `hello from user ${users[i].firstname}`,
                type: "CHAT",
                timestamp: Date.now(),
              }),
            }),
          1000
        );
      },
    });
    stompClient.activate();
  }
};

export const registerAccounts = (numberAccounts) => {
  for (let i = 0; i < numberAccounts; i++) {
    client
      .signup({
        firstname: `user ${i}`,
        lastname: "",
        email: `user${i}@gmail.com`,
        password: "123456",
      })
      .then((response) => response.json())
      .then((response) => {
        users.push(response);
        return response;
      })
      .then((response) => {
        client.addMembersToChannel(jwt, channelId, [response.id]);
      });
  }

  localStorage.setItem("users", JSON.stringify(users));
};
