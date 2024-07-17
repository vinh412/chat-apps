import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
const chatServerUrl = process.env.REACT_APP_CHAT_SERVER_URL || "http://localhost:8080";
const stompClient = new Client(
{
  webSocketFactory: () =>
    new SockJS(`${chatServerUrl}/ws`),
});

stompClient.onStompError = (error) => {
  console.log(error);
};

export { stompClient };