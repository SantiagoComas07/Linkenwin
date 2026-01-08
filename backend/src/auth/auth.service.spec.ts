import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    findOneByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate user with correct credentials', async () => {
    const mockUser = {
      id: '1',
      email: 'test@test.com',
      password: '$2b$10$abcdefghijklmnopqrstuvwxyz',
      name: 'Test User',
      role: 'CODER',
    };

    mockUsersService.findOneByEmail.mockResolvedValue(mockUser);
    
    const result = await service.validateUser('test@test.com', 'wrongpassword');
    expect(result).toBeNull();
  });

  it('should return null for invalid credentials', async () => {
    mockUsersService.findOneByEmail.mockResolvedValue(null);
    
    const result = await service.validateUser('test@test.com', 'password');
    expect(result).toBeNull();
  });
});
