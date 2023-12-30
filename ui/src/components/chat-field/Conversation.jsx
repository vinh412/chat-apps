import { Box } from '@mui/joy'
import React from 'react'
import MessageText from './MessageText'

function Conversation({messages}) {
  return (
    <Box display='flex' flexDirection='column'>
        {messages && messages.map(message => 
          <MessageText message={message} key={message.key.messageId}/>
        )}
    </Box>
  )
}

export default Conversation