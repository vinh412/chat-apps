import { Box } from '@mui/joy'
import React from 'react'
import MessageText from './MessageText'
import MessageText2 from './MessageText2'

function Conversation() {
  return (
    <Box display='flex' flexDirection='column'>
        <MessageText />
        <MessageText2 />
        <MessageText />
        <MessageText2 />
        <MessageText />
        <MessageText2 />
        <MessageText2 />
        <MessageText />
        <MessageText2 />
        <MessageText />
        <MessageText />
        <MessageText />
        <MessageText2 />
        <MessageText />
        <MessageText2 />
    </Box>
  )
}

export default Conversation