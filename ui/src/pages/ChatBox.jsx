import { Box } from '@mui/joy'
import React from 'react'
import ContactDrawer from '../components/ContactDrawer'
import ContactBar from '../components/ContactBar'

function ChatBox() {
    return (
        <Box display='flex' flexDirection='row' height='100vh'>
            <Box width='25%' minWidth='384px' sx={{borderRight: '1px solid gainsboro'}}>
                <ContactDrawer />
            </Box>
            <Box display='flex' flexDirection='column' width='75%'>
                <ContactBar />
                <Box sx={{height: '100%', width: '100%', bgcolor: 'blanchedalmond'}}>

                </Box>
            </Box>
        </Box>
    )
}

export default ChatBox