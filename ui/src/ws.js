// import { Stomp } from "@stomp/stompjs";
// import SockJS from "sockjs-client";

// const socket = new SockJS('http://localhost:8080/ws');
// const stompClient = Stomp.over(socket);

// const connect = () => {
//     stompClient.connect({}, onConnected, onError);
// }

// const onConnected = () => {
//     stompClient.subscribe('/topic/public', (message) => console.log(message.body));

//     stompClient.send('/app/chat.addUser', {}, JSON.stringify({ sender: 'vinh', type: 'JOIN'}));
// }

// const onError = (error) => {
//     console.log(error);
// }

// export {connect, stompClient}