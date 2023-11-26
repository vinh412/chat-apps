import { Avatar, Box, Container, Grid, Typography } from '@mui/joy'
import React from 'react'

function ContactItem() {
    return (
        <Box display='flex' flexDirection='row' sx={{ bgcolor: 'white', p: '8px', borderRadius: '8px', ":hover": {bgcolor: 'whitesmoke'} }}>
            <Box sx={{paddingRight: '8px'}}>
                <Avatar size='lg'/>
            </Box>
            <Box display='flex' flexDirection='column' width='-webkit-fill-available'>
                <Box display='flex' flexDirection='row' justifyContent='space-between'>
                    <Typography fontWeight='bold'>Tạ Xuân Kiên</Typography>
                    <Typography level='body-sm' color='neutral'>Jul 11</Typography>
                </Box>
                <Typography color='neutral'>alo</Typography>
            </Box>
        </Box>
    )
}

export default ContactItem