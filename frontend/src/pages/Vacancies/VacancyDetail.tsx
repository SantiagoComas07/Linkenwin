import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Chip, Button, Divider, CircularProgress } from '@mui/material';
import { getVacancyById, applyToVacancy, updateVacancyStatus, Vacancy, User } from '../../api/axios.api';

export default function VacancyDetail() {
    const { id } = useParams<{ id: string }>();
    const [vacancy, setVacancy] = useState<Vacancy | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        if (id) {
            fetchVacancy(id);
        }
    }, [id]);

    const fetchVacancy = async (vacancyId: string) => {
        try {
            setLoading(true);
            const data = await getVacancyById(vacancyId);
            setVacancy(data);
        } catch (error) {
            console.error('Failed to fetch vacancy:', error);
            alert('Failed to load vacancy details');
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async () => {
        if (!vacancy) return;
        try {
            await applyToVacancy(vacancy.id);
            alert('Applied successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to apply:', error);
            alert('Failed to apply (You might have already applied)');
        }
    };

    const handleStatusToggle = async () => {
        if (!vacancy) return;
        try {
            const newStatus = !vacancy.isActive;
            await updateVacancyStatus(vacancy.id, newStatus);
            setVacancy({ ...vacancy, isActive: newStatus });
            alert(`Vacancy is now ${newStatus ? 'Active' : 'Inactive'}`);
        } catch (error) {
            console.error('Failed to update status:', error);
            alert('Failed to update status');
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (!vacancy) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h5">Vacancy not found</Typography>
                <Button onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>Back to Dashboard</Button>
            </Container>
        );
    }

    const isAdminOrGestor = user?.role === 'ADMIN' || user?.role === 'GESTOR';

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h4" component="h1">
                        {vacancy.title}
                    </Typography>
                    {isAdminOrGestor && (
                        <Chip
                            label={vacancy.isActive ? "Active" : "Inactive"}
                            color={vacancy.isActive ? "success" : "default"}
                        />
                    )}
                </Box>

                <Typography variant="h6" color="text.secondary" gutterBottom>
                    {vacancy.company}
                </Typography>

                <Box display="flex" gap={1} mb={3} flexWrap="wrap">
                    <Chip label={vacancy.location} variant="outlined" />
                    <Chip label={vacancy.modality} variant="outlined" />
                    <Chip label={vacancy.seniority} variant="outlined" />
                    <Chip label={vacancy.salaryRange} variant="outlined" />
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Typography variant="h6" gutterBottom>Description</Typography>
                <Typography paragraph sx={{ whiteSpace: 'pre-wrap' }}>
                    {vacancy.description}
                </Typography>

                <Typography variant="h6" gutterBottom>Technologies</Typography>
                <Typography paragraph>
                    {vacancy.technologies}
                </Typography>

                {vacancy.softSkills && (
                    <>
                        <Typography variant="h6" gutterBottom>Soft Skills</Typography>
                        <Typography paragraph>
                            {vacancy.softSkills}
                        </Typography>
                    </>
                )}

                <Box mt={4} display="flex" gap={2}>
                    <Button variant="outlined" onClick={() => navigate('/dashboard')}>
                        Back
                    </Button>

                    {isAdminOrGestor ? (
                        <Button
                            variant="contained"
                            color={vacancy.isActive ? "warning" : "success"}
                            onClick={handleStatusToggle}
                        >
                            {vacancy.isActive ? 'Deactivate Vacancy' : 'Activate Vacancy'}
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handleApply}
                            disabled={!vacancy.isActive}
                        >
                            {vacancy.isActive ? 'Apply Now' : 'Application Closed'}
                        </Button>
                    )}
                </Box>
            </Paper>
        </Container>
    );
}
