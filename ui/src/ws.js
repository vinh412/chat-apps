import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const stompClient = new Client({
  webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
});

stompClient.onConnect = () => {
  console.log("đã kết nối");
  stompClient.subscribe("/channel/1", (message) =>
    console.log(message.body)
  );
};

stompClient.onStompError = (error) => {
  console.log(error);
};

export { stompClient };
