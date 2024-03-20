import { Box } from '@mui/joy'
import React from 'react'
import MessageText from './MessageText'
import { useSelector } from 'react-redux'

function Conversation({messages, members}) {
  return (
    <Box display='flex' flexDirection='column'>
        {messages && messages.map(message => 
          <MessageText message={message} member={members.find(member => member.id === message.userId)} key={message.key.messageId}/>
        )}
    </Box>
  )
}

export default Conversation