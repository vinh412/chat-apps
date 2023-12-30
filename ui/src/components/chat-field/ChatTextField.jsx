import { Box, IconButton, Input } from "@mui/joy";
import React from "react";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { stompClient } from "../../ws";
import { useSelector } from "react-redux";

function ChatTextField() {
  const [content, setContent] = React.useState("");
  const user = useSelector((state) => state.auth.user);
  const currentChatId = useSelector((state) => state.chat.currentChatId);

  const handleSendMessage = () => {
    if (content.trim()) {
      const message = {
        key: { channelId: currentChatId },
        userId: user.id,
        content,
        type: "CHAT",
        timestamp: Date.now(),
      };

      stompClient.publish({
        destination: `/app/channel/${currentChatId}`,
        body: JSON.stringify(message),
      });

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
