import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const stompClient = new Client(
//   {
//   webSocketFactory: () =>
//     new SockJS(`${process.env.REACT_APP_CHAT_SERVER_URL}/ws`),
// }
);

stompClient.brokerURL = `${process.env.REACT_APP_CHAT_SERVER_URL}/ws`;

stompClient.onStompError = (error) => {
  console.log(error);
};

export { stompClient };
