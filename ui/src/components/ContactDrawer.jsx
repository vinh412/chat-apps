import { Box } from '@mui/joy'
import React from 'react'
import SearchBar from './SearchBar'
import ContactItem from './ContactItem'

function ContactDrawer() {
  return (
    <Box display='flex' flexDirection='column' sx={{p: '8px', height: '-webkit-fill-available'}} maxHeight='100vh'>
        <SearchBar />
        <Box sx={{
          overflow: 'auto'
          }}>
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
        </Box>
    </Box>
  )
}

export default ContactDrawer