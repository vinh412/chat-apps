import { Avatar, Box, IconButton, Typography } from '@mui/joy'
import React from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

function ContactBar({contactName}) {
    return (
        <Box display='flex' flexDirection='row' justifyContent='space-between' sx={{p: '8px'}} bgcolor="white">
            <Box display='flex' flexDirection='row'>
                <Box sx={{padding: '0px 16px'}}>
                    <Avatar size='lg'/>
                </Box>
                <Box display='flex' flexDirection='column'>
                    <Typography fontWeight='bold' >{contactName}</Typography>
                    <Typography color='neutral' level='body-sm'>last seen recently</Typography>
                </Box>
            </Box>
            <Box display='flex' flexDirection='row'>
                <Box>
                    <IconButton size='lg'>
                        <SearchRoundedIcon />
                    </IconButton>
                </Box>
                <Box>
                    <IconButton size='lg'>
                        <PhoneEnabledRoundedIcon />
                    </IconButton>
                </Box>
                <Box>
                    <IconButton size='lg'>
                        <MoreVertRoundedIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default ContactBar