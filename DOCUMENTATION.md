# Nest Auth Starter - NestJS Authentication API

A simple NestJS application with JWT-based authentication using Passport.js.

---

## Tech Stack

- **NestJS** v11 - Backend framework
- **Passport.js** - Authentication middleware
- **JWT** - Token-based authentication

---

## Project Structure

```
src/
├── main.ts                 # Application entry point (Port 3000)
├── app.module.ts           # Root module
├── app.controller.ts       # Root controller (GET /)
├── app.service.ts          # Root service
├── auth/                   # Authentication module
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── dto/
│   │   └── auth.dto.ts     # Login DTO
│   ├── guard/
│   │   ├── local.guard.ts  # Username/password guard
│   │   └── jwt.guard.ts    # JWT token guard
│   └── strategy/
│       ├── local.strategy.ts
│       └── jwt.strategy.ts
└── user/                   # User module (empty scaffold)
    ├── user.module.ts
    ├── user.controller.ts
    └── user.service.ts
```

---

## API Endpoints

| Method | Endpoint       | Auth Required | Description              |
|--------|----------------|---------------|--------------------------|
| GET    | `/`            | No            | Returns "Hello World!"   |
| POST   | `/auth/login`  | No            | Login with credentials   |
| GET    | `/auth/status` | Yes (JWT)     | Get current user info    |

---

## Authentication Flow

### 1. Login (`POST /auth/login`)

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin"
}
```

**Response:** JWT token string

**Available Test Users:**
| Username | Password |
|----------|----------|
| admin    | admin    |
| user     | user     |
| test     | test     |

### 2. Access Protected Routes (`GET /auth/status`)

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:** Decoded user payload (username, id)

---

## How It Works

1. **Local Strategy** - Validates username/password against fake users array
2. **JWT Generation** - On successful login, returns a signed JWT (expires in 1 hour)
3. **JWT Strategy** - Extracts token from `Authorization: Bearer` header and validates it
4. **Guards** - Protect routes using `@UseGuards()` decorator

---

## Running the Project

```bash
# Install dependencies
npm install

# Development mode (with hot reload)
npm run start:dev

# Production build
npm run build
npm run start:prod
```

**Server runs on:** `http://localhost:3000`

---

## Configuration

| Setting      | Value    | Location                    |
|--------------|----------|-----------------------------|
| JWT Secret   | `secret` | `auth.module.ts`, `jwt.strategy.ts` |
| Token Expiry | 1 hour   | `auth.module.ts`            |
| Port         | 3000     | `main.ts`                   |

---

## Notes

- User module is scaffolded but empty (ready for expansion)
- TypeORM is installed but not configured with entities yet
- Uses fake in-memory users (no database connection for auth)
- JWT secret is hardcoded (should use environment variables in production)

