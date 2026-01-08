# Linkenwin - Employment Platform

Web platform for managing job vacancies and applications, built with NestJS and React.

## Description

Linkenwin is a fullstack application that allows:

- **Managers/Admins**: Create and manage job vacancies
- **Coders**: Browse and apply to available vacancies
- JWT authentication system
- Role-based access control (Admin, Manager, Coder)

## Technologies

### Backend

- **NestJS** - Node.js framework
- **TypeORM** - ORM for PostgreSQL
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Swagger** - API documentation
- **Bcrypt** - Password encryption

### Frontend

- **React** - UI library
- **Vite** - Build tool
- **Material-UI** - UI components
- **React Router** - Navigation
- **Axios** - HTTP client
- **TailwindCSS** - Styling

## Installation and Setup

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Option 1: With Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd Linkenwin

# Start all services
docker-compose up
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- API Docs: http://localhost:3001/docs

### Option 2: Manual Installation

#### Backend

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env-example .env
# Edit .env with your PostgreSQL credentials

# Run migrations and seed (optional)
npm run seed

# Start in development mode
npm run start:dev
```

#### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start in development mode
npm run dev
```

## Project Structure

```
Linkenwin/
├── backend/              # NestJS API
│   ├── src/
│   │   ├── auth/        # Authentication and authorization
│   │   ├── users/       # User management
│   │   ├── vacancies/   # Vacancy management
│   │   └── applications/# Application management
│   └── test/            # Unit tests
├── frontend/            # React application
│   └── src/
│       ├── components/  # Reusable components
│       ├── pages/       # Application pages
│       ├── routes/      # Route configuration
│       └── api/         # API client
└── docker-compose.yml   # Docker configuration
```

## Environment Variables

### Backend (.env)

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=linkenwin
JWT_SECRET=your-secret-key
PORT=3001
```

## API Endpoints

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login

### Vacancies

- `GET /vacancies` - List active vacancies
- `GET /vacancies/:id` - Get vacancy by ID
- `POST /vacancies` - Create vacancy (Manager/Admin)
- `PATCH /vacancies/:id/status` - Update status (Manager/Admin)

### Applications

- `POST /applications` - Apply to vacancy (Coder)
- `GET /applications` - List all applications (Manager/Admin)
- `GET /applications/my-applications` - My applications (Coder)

**Complete documentation:** http://localhost:3001/docs

## Testing

```bash
cd backend

# Run tests
npm run test

# Run tests with coverage
npm run test:cov

# Run tests in watch mode
npm run test:watch
```

## 👥 User Roles

- **ADMIN**: Full system access.
- **GESTOR**: Create and manage vacancies, view applications.
- **CODER**: Browse vacancies and apply (maximum 3 active vacancies).

## 🔑 Test Credentials

The database can be populated with test data using `npm run seed`. Once seeded, you can use the following credentials:

| Role       | Email                | Password  |
| ---------- | -------------------- | --------- |
| **Admin**  | admin@linkenwin.com  | admin123  |
| **Gestor** | gestor@linkenwin.com | gestor123 |
| **Coder**  | coder@linkenwin.com  | coder123  |

## 📦 Sample Data (Seeded)

- **Users**: Admin, Gestor, and Coder accounts.
- **Vacancies**:
  - **Frontend Developer**: Remote, React/TypeScript.
  - **Backend Developer**: On-site (NY), NestJS/PostgreSQL.
  - **QA Engineer**: Hybrid (SF), Jest/Cypress/Automation.
