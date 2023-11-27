import { Box, IconButton, Input } from '@mui/joy'
import React from 'react'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function SearchBar() {
    return (
        <Box display='flex' flexDirection='row' sx={{p: '0px 8px 16px 0px'}}>
            <Box sx={{ p: '4px' }}>
                <IconButton size='lg'>
                    <MenuRoundedIcon />
                </IconButton>
            </Box>
            <Box sx={{p: '4px'}} width='-webkit-fill-available'>
                <Input endDecorator={<SearchRoundedIcon />} sx={{ p: '8px'}} size='lg'/>
            </Box>
        </Box>
    )
}

export default SearchBar