import { Box, Container, Input } from '@mui/joy'
import React from 'react'
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

function ChatTextField() {
    return (
        <Box>
            <Input size='lg' startDecorator={<SentimentSatisfiedRoundedIcon />} endDecorator={<SendRoundedIcon />} />
        </Box>
    )
}

export default ChatTextField