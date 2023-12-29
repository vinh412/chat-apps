import { Box, Container, IconButton, Input } from "@mui/joy";
import React from "react";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { stompClient } from "../../ws";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../features/chat/chatSlice";

function ChatTextField() {
  const [content, setContent] = React.useState("");
  const user = useSelector((state) => state.auth.user);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const currentChat = useSelector((state) => state.chat.channels.find(channel => channel.id === currentChatId));
  const dispatch = useDispatch();

  const handleSendMessage = () => {
    if (content.trim()) {
      const message = {
        key: { channelId: currentChatId, messageId: 1 },
        userId: user.id,
        content,
        type: "CHAT",
        timestamp: new Date().toISOString(),
      };
      // stompClient.publish({
      //   destination: `/app/channel/${currentChatId}`,
      //   body: JSON.stringify(message),
      // });
      dispatch(
        sendMessage(message)
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
          <IconButton onClick={handleSendMessage}>
            <SendRoundedIcon />
          </IconButton>
        }
        onChange={(event) => setContent(event.target.value)}
        value={content}
        onKeyDown={(event) => {
          event.key === "Enter" && handleSendMessage();
        }}
      />
    </Box>
  );
}

export default ChatTextField;
