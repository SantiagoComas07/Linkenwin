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

    // Create Admin user
    const adminEmail = 'admin@linkenwin.com';
    const admin = await usersService.findOneByEmail(adminEmail);
    if (!admin) {
        const password = await bcrypt.hash('admin123', 10);
        await usersService.create({
            name: 'System Admin',
            email: adminEmail,
            password: password,
            role: UserRole.ADMIN,
        });
        console.log('✅ Admin user created - Email: admin@linkenwin.com | Password: admin123');
    } else {
        console.log('ℹ️  Admin user already exists');
    }

    // Create Gestor user
    const gestorEmail = 'gestor@linkenwin.com';
    const gestor = await usersService.findOneByEmail(gestorEmail);
    if (!gestor) {
        const password = await bcrypt.hash('gestor123', 10);
        await usersService.create({
            name: 'Employability Manager',
            email: gestorEmail,
            password: password,
            role: UserRole.GESTOR,
        });
        console.log('✅ Gestor user created - Email: gestor@linkenwin.com | Password: gestor123');
    } else {
        console.log('ℹ️  Gestor user already exists');
    }

    // Create Coder user
    const coderEmail = 'coder@linkenwin.com';
    const coder = await usersService.findOneByEmail(coderEmail);
    if (!coder) {
        const password = await bcrypt.hash('coder123', 10);
        await usersService.create({
            name: 'John Developer',
            email: coderEmail,
            password: password,
            role: UserRole.CODER,
        });
        console.log('✅ Coder user created - Email: coder@linkenwin.com | Password: coder123');
    } else {
        console.log('ℹ️  Coder user already exists');
    }

    // Create sample vacancies
    const vacanciesService = app.get(VacanciesService);
    const vacancies = await vacanciesService.findAllAdmin();
    if (vacancies.length === 0) {
        // Frontend vacancy
        await vacanciesService.create({
            title: 'Frontend Developer',
            description: 'We are looking for a talented Frontend Developer to join our team. You will work on building modern, responsive web applications using React and TypeScript.',
            technologies: 'React, TypeScript, TailwindCSS, Vite',
            seniority: 'Mid',
            softSkills: 'Team collaboration, Communication, Problem-solving',
            location: 'Remote',
            modality: Modality.REMOTE,
            salaryRange: '$3000 - $4500',
            company: 'Tech Innovations Corp',
            maxApplicants: 5,
        });
        console.log('✅ Frontend Developer vacancy created');

        // Backend vacancy
        await vacanciesService.create({
            title: 'Backend Developer',
            description: 'Join our backend team to build scalable APIs and microservices. Experience with NestJS and PostgreSQL is required.',
            technologies: 'NestJS, PostgreSQL, Docker, TypeORM, Redis',
            seniority: 'Senior',
            softSkills: 'Leadership, Mentoring, Critical thinking',
            location: 'New York, USA',
            modality: Modality.ONSITE,
            salaryRange: '$5000 - $7000',
            company: 'Innovation Labs',
            maxApplicants: 10,
        });
        console.log('✅ Backend Developer vacancy created');

        // QA vacancy
        await vacanciesService.create({
            title: 'QA Engineer',
            description: 'We need a QA Engineer to ensure the quality of our software products. You will design and execute test plans, automate tests, and work closely with development teams.',
            technologies: 'Jest, Cypress, Selenium, Postman, CI/CD',
            seniority: 'Mid',
            softSkills: 'Attention to detail, Analytical thinking, Communication',
            location: 'Hybrid - San Francisco',
            modality: Modality.HYBRID,
            salaryRange: '$3500 - $5000',
            company: 'Quality First Solutions',
            maxApplicants: 8,
        });
        console.log('✅ QA Engineer vacancy created');

        console.log('\n🎉 All sample data created successfully!');
    } else {
        console.log('ℹ️  Vacancies already exist');
    }

    console.log('\n📋 Test Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin:  admin@linkenwin.com  | admin123');
    console.log('Gestor: gestor@linkenwin.com | gestor123');
    console.log('Coder:  coder@linkenwin.com  | coder123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    await app.close();
}
bootstrap();
