import { useState } from 'react';
import { Container, Paper, Typography, Box, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { createVacancy, Modality } from '../../api/axios.api';
import { useNavigate } from 'react-router-dom';

export default function CreateVacancy() {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            // Ensure maxApplicants is a number
            const payload = { ...data, maxApplicants: parseInt(data.maxApplicants, 10) };
            await createVacancy(payload);
            alert('Vacancy created successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to create vacancy:', error);
            alert('Failed to create vacancy');
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Create New Vacancy
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                    <TextField
                        fullWidth label="Title" margin="normal"
                        {...register('title', { required: 'Title is required' })}
                        error={!!errors.title}
                    />
                    <TextField
                        fullWidth label="Company" margin="normal"
                        {...register('company', { required: 'Company is required' })}
                        error={!!errors.company}
                    />
                    <TextField
                        fullWidth label="Description" margin="normal" multiline rows={4}
                        {...register('description', { required: 'Description is required' })}
                        error={!!errors.description}
                    />
                    <TextField
                        fullWidth label="Technologies" margin="normal"
                        {...register('technologies', { required: 'Technologies are required' })}
                        error={!!errors.technologies}
                    />
                    <TextField
                        fullWidth label="Seniority" margin="normal"
                        {...register('seniority', { required: 'Seniority is required' })}
                        error={!!errors.seniority}
                    />
                    <TextField
                        fullWidth label="Location" margin="normal"
                        {...register('location', { required: 'Location is required' })}
                        error={!!errors.location}
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Modality</InputLabel>
                        <Controller
                            name="modality"
                            control={control}
                            defaultValue={Modality.REMOTE}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select {...field} label="Modality">
                                    <MenuItem value={Modality.REMOTE}>Remote</MenuItem>
                                    <MenuItem value={Modality.HYBRID}>Hybrid</MenuItem>
                                    <MenuItem value={Modality.ONSITE}>Onsite</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>

                    <TextField
                        fullWidth label="Salary Range" margin="normal"
                        {...register('salaryRange', { required: 'Salary Range is required' })}
                        error={!!errors.salaryRange}
                    />
                    <TextField
                        fullWidth label="Max Applicants" margin="normal" type="number"
                        {...register('maxApplicants', { required: 'Max Applicants is required' })}
                        error={!!errors.maxApplicants}
                    />

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                        Create Vacancy
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
