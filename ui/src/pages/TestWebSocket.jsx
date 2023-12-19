import { Button, Container, Input } from "@mui/joy";
import React from "react";
import { stompClient } from "../ws";

function TestWebSocket() {
  const [content, setContent] = React.useState("");
  const [userId, setUserId] = React.useState(0);
  const connectWS = () => {
    stompClient.activate();
  };

  const handleChangeContent = (event) => {
    setContent(event.target.value);
  };
  const handleChangeUserId = (event) => {
    setUserId(event.target.value);
  };

  const send = () => {
    stompClient.publish({
        destination: "/app/channel/1",
        body: JSON.stringify({key: {channelId: 1, messageId: 1},userId, content, timestamp: Date.now()}),
    })
  }
  return (
    <Container>
      <Button onClick={connectWS}>Connect</Button>
      <Input onChange={handleChangeUserId} type="number" />
      <Input onChange={handleChangeContent} />
      <Button onClick={send}>Send</Button>
    </Container>
  );
}

export default TestWebSocket;
