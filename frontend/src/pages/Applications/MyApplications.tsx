import { useEffect, useState } from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';
import { getMyApplications, Application } from '../../api/axios.api';

export default function MyApplications() {
    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const data = await getMyApplications();
            setApplications(data);
        } catch (error) {
            console.error('Failed to fetch applications:', error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    My Applications
                </Typography>
                <List>
                    {applications.map((app, index) => (
                        <div key={app.id}>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={
                                        <Typography variant="h6">
                                            {app.vacancy?.title || 'Unknown Vacancy'}
                                        </Typography>
                                    }
                                    secondary={
                                        <>
                                            <Typography component="span" variant="body2" color="text.primary">
                                                {app.vacancy?.company}
                                            </Typography>
                                            <br />
                                            Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                                        </>
                                    }
                                />
                            </ListItem>
                            {index < applications.length - 1 && <Divider component="li" />}
                        </div>
                    ))}
                    {applications.length === 0 && (
                        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                            You haven't applied to any vacancies yet.
                        </Typography>
                    )}
                </List>
            </Paper>
        </Container>
    );
}
