import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';

export interface CreateUserDto {
    name: string;
    email: string;
    password: string; // Hashing should be done here or in Auth Service. Doing it in Auth Service is cleaner separation, or using BeforeInsert hook.
    role?: UserRole; // Default to CODER if not provided
}

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ email });
    }

    async findOneById(id: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }
}
