import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { register as registerApi } from '../../api/axios.api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            const result = await registerApi(data);
            console.log('Register successful:', result);
            alert('Register successful! Please login.');
            navigate('/login');
        } catch (error) {
            console.error('Register failed:', error);
            alert('Register failed');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Full Name"
                        margin="normal"
                        {...register('name', { required: 'Name is required' })}
                        error={!!errors.name}
                        helperText={errors.name?.message as string}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        {...register('email', { required: 'Email is required' })}
                        error={!!errors.email}
                        helperText={errors.email?.message as string}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        {...register('password', { required: 'Password is required' })}
                        error={!!errors.password}
                        helperText={errors.password?.message as string}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
