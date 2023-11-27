import { Typography, Box } from '@mui/joy'
import React from 'react'

function MessageText() {
  return (
    <Box display='inline-block' sx={{marginBottom: '4px', p: '4px 12px', bgcolor: 'Highlight', borderRadius: '16px', alignSelf: 'end'}} maxWidth='60%'>
        <Typography sx={{color: '#fff'}}>hello hellohello hello hello hello hello hello hello hello hello hello hello</Typography>
    </Box>
  )
}

export default MessageText