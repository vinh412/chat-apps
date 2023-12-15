import { Box, Container, IconButton, Input } from '@mui/joy'
import React from 'react'
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { stompClient } from '../../ws';

function ChatTextField() {

    const sendMessage = (event) => {
        if (event.key === 'Enter'){
            let messageContent = event.target.value.trim();
            if(messageContent && stompClient){
                let chatMessage = {
                    sender: 'vinh',
                    content: event.target.value,
                    type: 'CHAT'
                };

                stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
                event.target.value = '';
            }
        }
    }

    return (
        <Box>
            <Input
                size='lg'
                startDecorator={<SentimentSatisfiedRoundedIcon />}
                endDecorator={
                    <IconButton>
                        <SendRoundedIcon />
                    </IconButton>
                }
                onKeyDown={sendMessage}
            />
        </Box>
    )
}

export default ChatTextField