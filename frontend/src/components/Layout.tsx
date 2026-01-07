import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Box } from '@mui/material';

export default function Layout() {
    return (
        <Box>
            <Navbar />
            <Box sx={{ p: 2 }}>
                <Outlet />
            </Box>
        </Box>
    );
}
