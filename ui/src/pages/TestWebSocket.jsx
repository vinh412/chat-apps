import { Box, Button, Container, Input } from "@mui/joy";
import React from "react";
import { registerAccounts } from "../ws-demo";
import { useSelector } from "react-redux";

function TestWebSocket() {
  const [wasStart, setWasStart] = React.useState(false);
  const onRegister = () => {
    registerAccounts(20);
  }

  const onStart = () => {

  }
  const onStop = () => {
    setWasStart(false);
  }
  return (
    <Box display="flex" columnGap={4} marginTop={40} height='100%' width="100%" justifyContent="center" alignSelf='center'>
      <Button onClick={onRegister}>Register</Button>
      <Button disabled={wasStart} onClick={onStart}>Start</Button>
      <Button color="danger" disabled={!wasStart} onClick={onStop}>Stop</Button>
    </Box>
  );
}

export default TestWebSocket;
