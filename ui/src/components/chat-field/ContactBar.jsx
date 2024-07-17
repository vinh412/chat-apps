import { Avatar, Box, IconButton, Typography } from '@mui/joy'
import React from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { autoChat } from '../../ws-demo';
import { useSelector } from 'react-redux';

function ContactBar({contactName, onClick}) {
    return (
        <Box display='flex' flexDirection='row' justifyContent='space-between' sx={{p: '8px', cursor: 'pointer'}} bgcolor="white" onClick={()=>onClick(true)}>
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