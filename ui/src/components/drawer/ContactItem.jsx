import { Avatar, Box, Container, Grid, Typography } from '@mui/joy'
import React from 'react'

function ContactItem() {
    const [clicked, setClicked] = React.useState(false);
    const handleClick = () => {
        setClicked(prev => !prev);
    }

    return (
        <Box sx={{p: '0px 8px'}}>
            <Box onClick={handleClick} display='flex' flexDirection='row' sx={{ bgcolor: clicked ? 'Highlight' : 'white', p: '8px', marginRight: '8xp', borderRadius: '8px', ":hover": { bgcolor: 'whitesmoke', cursor: 'pointer' } }}>
                <Box sx={{ paddingRight: '8px' }}>
                    <Avatar size='lg' />
                </Box>
                <Box display='flex' flexDirection='column' width='100%'>
                    <Box display='flex' flexDirection='row' justifyContent='space-between'>
                        <Typography fontWeight='bold' sx={{ color: clicked ? 'white' : 'black' }}>Tạ Xuân Kiên</Typography>
                        <Typography level='body-sm' sx={{ color: clicked ? 'white' : 'black' }}>Jul 11</Typography>
                    </Box>
                    <Typography sx={{ color: clicked ? 'white' : 'black' }}>alo</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default ContactItem