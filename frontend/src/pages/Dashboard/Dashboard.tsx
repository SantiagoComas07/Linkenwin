import { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, CardActions, Chip, Box } from '@mui/material';
import { getVacancies, Vacancy, User, updateVacancyStatus, applyToVacancy } from '../../api/axios.api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        fetchVacancies();
    }, []);

    const fetchVacancies = async () => {
        try {
            const data = await getVacancies();
            setVacancies(data);
        } catch (error) {
            console.error('Failed to fetch vacancies:', error);
        }
    };

    const handleStatusToggle = async (id: string, currentStatus: boolean) => {
        try {
            await updateVacancyStatus(id, !currentStatus);
            fetchVacancies(); // Refresh list
        } catch (error) {
            console.error('Failed to update status:', error);
            alert('Failed to update status');
        }
    };

    const handleApply = async (id: string) => {
        try {
            await applyToVacancy(id);
            alert('Applied successfully!');
        } catch (error) {
            console.error('Failed to apply:', error);
            alert('Failed to apply');
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1">
                    Vacancies
                </Typography>
                {(user?.role === 'ADMIN' || user?.role === 'GESTOR') && (
                    <Button variant="contained" color="primary" onClick={() => navigate('/create-vacancy')}>
                        Create Vacancy
                    </Button>
                )}
            </Box>

            <Grid container spacing={3}>
                {vacancies.map((vacancy) => (
                    <Grid item xs={12} md={6} lg={4} key={vacancy.id}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h5" component="div" gutterBottom>
                                    {vacancy.title}
                                </Typography>
                                <Typography color="text.secondary" gutterBottom>
                                    {vacancy.company} - {vacancy.location} ({vacancy.modality})
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {vacancy.description.substring(0, 100)}...
                                </Typography>
                                <Box display="flex" gap={1} mb={2}>
                                    <Chip label={vacancy.seniority} size="small" />
                                    <Chip label={vacancy.salaryRange} size="small" variant="outlined" />
                                </Box>
                                <Typography variant="caption" display="block">
                                    Posted: {new Date(vacancy.createdAt).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {(user?.role === 'ADMIN' || user?.role === 'GESTOR') ? (
                                    <Button
                                        size="small"
                                        color={vacancy.isActive ? "warning" : "success"}
                                        onClick={() => handleStatusToggle(vacancy.id, vacancy.isActive)}
                                    >
                                        {vacancy.isActive ? 'Deactivate' : 'Activate'}
                                    </Button>
                                ) : (
                                    <Button
                                        size="small"
                                        variant="contained"
                                        onClick={() => handleApply(vacancy.id)}
                                        disabled={!vacancy.isActive}
                                    >
                                        Apply Now
                                    </Button>
                                )}
                                <Button size="small" onClick={() => navigate(`/vacancies/${vacancy.id}`)}>
                                    Details
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
