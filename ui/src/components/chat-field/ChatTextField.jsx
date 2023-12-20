import { Box, Container, IconButton, Input } from "@mui/joy";
import React from "react";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { stompClient } from "../../ws";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from "../../features/chat/chatSlice";

function ChatTextField() {
  const [content, setContent] = React.useState("");
  const user = useSelector((state) => state.auth.user);
  const currentChat = useSelector((state) => state.chat.currentChat);
  const dispatch = useDispatch();

  const sendMessage = () => {
    if (content.trim()) {
      const message = {
        key: { channelId: currentChat.id, messageId: 1 },
        userId: user.id,
        content,
        type: "CHAT",
        timestamp: Date.now(),
      };
      stompClient.publish({
        destination: `/app/channel/${currentChat.id}`,
        body: JSON.stringify(message),
      });
      dispatch(
        setCurrentChat({ ...currentChat, messages: [...currentChat.messages, message] })
      );
      setContent("");
    }
  };

  return (
    <Box>
      <Input
        size="lg"
        startDecorator={<SentimentSatisfiedRoundedIcon />}
        endDecorator={
          <IconButton onClick={sendMessage}>
            <SendRoundedIcon />
          </IconButton>
        }
        onChange={(event) => setContent(event.target.value)}
        value={content}
        onKeyDown={(event) => {
          event.key === "Enter" && sendMessage();
        }}
      />
    </Box>
  );
}

export default ChatTextField;
