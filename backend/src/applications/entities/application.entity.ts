import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Vacancy } from '../../vacancies/entities/vacancy.entity';

@Entity('applications')
export class Application {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ nullable: true })
    userId: string; // explicitly defined for simpler checks

    @ManyToOne(() => Vacancy)
    @JoinColumn({ name: 'vacancyId' })
    vacancy: Vacancy;

    @Column({ nullable: true })
    vacancyId: string; // explicitly defined for simpler checks

    @CreateDateColumn()
    appliedAt: Date;
}
