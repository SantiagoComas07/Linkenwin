import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService, CreateUserDto } from './users/users.service';
import { UserRole } from './users/entities/user.entity';
import { VacanciesService } from './vacancies/vacancies.service';
import { Modality } from './vacancies/entities/vacancy.entity';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const usersService = app.get(UsersService);

    const adminEmail = 'admin@linkenwin.com';
    const gestorEmail = 'gestor@linkenwin.com';

    const admin = await usersService.findOneByEmail(adminEmail);
    if (!admin) {
        const password = await bcrypt.hash('admin123', 10);
        await usersService.create({
            name: 'System Admin',
            email: adminEmail,
            password: password,
            role: UserRole.ADMIN,
        });
        console.log('Admin user created');
    } else {
        console.log('Admin user already exists');
    }

    const gestor = await usersService.findOneByEmail(gestorEmail);
    if (!gestor) {
        const password = await bcrypt.hash('gestor123', 10);
        await usersService.create({
            name: 'Employability Manager',
            email: gestorEmail,
            password: password,
            role: UserRole.GESTOR,
        });
        console.log('Gestor user created');
    } else {
        console.log('Gestor user already exists');
    }

    const vacanciesService = app.get(VacanciesService);
    const vacancies = await vacanciesService.findAllAdmin();
    if (vacancies.length === 0) {
        await vacanciesService.create({
            title: 'Frontend Developer',
            description: 'React developer needed.',
            technologies: 'React, TypeScript, CSS',
            seniority: 'Mid',
            location: 'Remote',
            modality: Modality.REMOTE,
            salaryRange: '$3000 - $4000',
            company: 'Tech Corp',
            maxApplicants: 5,
        });
        await vacanciesService.create({
            title: 'Backend Developer',
            description: 'NestJS developer needed.',
            technologies: 'NestJS, PostgreSQL, Docker',
            seniority: 'Senior',
            location: 'New York',
            modality: Modality.ONSITE,
            salaryRange: '$5000 - $7000',
            company: 'Innovation Labs',
            maxApplicants: 10,
        });
        console.log('Sample vacancies created');
    } else {
        console.log('Vacancies already exist');
    }

    await app.close();
}
bootstrap();
