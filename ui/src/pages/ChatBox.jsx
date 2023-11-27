import { Box, Container, Input } from '@mui/joy'
import React from 'react'
import ContactDrawer from '../components/drawer/ContactDrawer'
import ContactBar from '../components/chat-field/ContactBar'

import Conversation from '../components/chat-field/Conversation';
import ChatTextField from '../components/chat-field/ChatTextField';

function ChatBox() {
    return (
        <Box display='flex' flexDirection='row' height='100vh'>
            <Box width='25%' minWidth='384px' sx={{ borderRight: '1px solid gainsboro' }}>
                <ContactDrawer />
            </Box>
            <Box display='flex' flexDirection='column' width='75%' maxHeight='100vh'>
                <ContactBar />
                <Box sx={{ overflow: 'auto', bgcolor: 'blanchedalmond', height: '100%' }}>
                    <Container maxWidth='md' sx={{p: '8px'}}>
                        <Conversation />
                    </Container>
                </Box>
                <Box sx={{bgcolor: 'blanchedalmond'}}>
                    <Container maxWidth='md' sx={{p:'8px'}}>
                        <ChatTextField />
                    </Container>
                </Box>
            </Box>
        </Box>
    )
}

export default ChatBox