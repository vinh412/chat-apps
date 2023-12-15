import { Box } from '@mui/joy'
import React from 'react'
import SearchBar from './SearchBar'
import ContactItem from './ContactItem'

function ContactDrawer() {
  return (
    <Box display='flex' flexDirection='column' sx={{ p: '8px 0px', height: '100%' }}>
      <SearchBar />

      <Box sx={{
        overflow: 'auto'
      }}>
        <ContactItem />
      </Box>
    </Box>
  )
}

export default ContactDrawer