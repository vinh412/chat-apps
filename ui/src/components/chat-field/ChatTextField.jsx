import { Box, Container, IconButton, Input } from '@mui/joy'
import React from 'react'
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { stompClient } from '../../ws';
import { useSelector } from 'react-redux';

function ChatTextField() {
    const [content, setContent] = React.useState("");
    const user = useSelector(state => state.auth.user);

    const sendMessage = () => {
        if(content.trim()){
            stompClient.publish({
                destination: "/app/channel/1",
                body: JSON.stringify({
                    key: {channelId: 1, messageId: 1},
                    userId: user.id,
                    content,
                    timestamp: Date.now()
                })
            })
        }
    }

    return (
        <Box>
            <Input
                size='lg'
                startDecorator={<SentimentSatisfiedRoundedIcon />}
                endDecorator={
                    <IconButton onClick={sendMessage}>
                        <SendRoundedIcon />
                    </IconButton>
                }
                onChange={(event) => setContent(event.target.value)}
                onKeyDown={(event) => { event.key === 'enter' && sendMessage()}}
            />
        </Box>
    )
}

export default ChatTextField