import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
                        Employability Platform
                    </Typography>
                    {user && (
                        <>
                            <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                            {user.role === 'CODER' && (
                                <Button color="inherit" onClick={() => navigate('/my-applications')}>My Applications</Button>
                            )}
                            <Typography variant="subtitle1" sx={{ ml: 2, mr: 2 }}>
                                {user.name} ({user.role})
                            </Typography>
                            <Button color="inherit" onClick={handleLogout} sx={{ bgcolor: 'error.main', '&:hover': { bgcolor: 'error.dark' } }}>
                                Logout
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
