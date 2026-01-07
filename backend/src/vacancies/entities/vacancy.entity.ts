import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum Modality {
    REMOTE = 'remote',
    HYBRID = 'hybrid',
    ONSITE = 'presencial',
}

@Entity('vacancies')
export class Vacancy {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column()
    technologies: string; // Comma separated or JSON? Requirement says string, but relationships recommended. Keeping string as per "minimal" then maybe relation. Requirement: "Nota: Se recomienda integrar una entidad para el manejo de las tecnologías utilizando relaciones entre tablas" -> I will stick to string for MVP simplicity unless strict. The prompt says "vacancies with... technologies (string)". I'll keep it string for now as requested in the detailed list.

    @Column()
    seniority: string;

    @Column({ nullable: true })
    softSkills: string;

    @Column()
    location: string;

    @Column({
        type: 'enum',
        enum: Modality,
    })
    modality: Modality;

    @Column()
    salaryRange: string;

    @Column()
    company: string;

    @Column('int')
    maxApplicants: number;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relation with User (Gestor)? Not explicitly asked but good for audit. "Permitir al equipo de empleabilidad con el rol de Gestor: Crear...". Maybe track who created it.
    // Not strictly required by entity list.
}
