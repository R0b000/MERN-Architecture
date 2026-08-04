# Flow: Authentication (Shared)

Date: 2026-08-04
Description: Auth extracted into shared Auth.Server and Auth.Client modules.
Auth is now a reusable layer consumed by E.API and E.UI (and any future project).

## Architecture

```
Shared.API/models/Auth/          # DTO types (TypeScript) — shared by UI & API
Auth.Server/                     # Backend auth (Node.js) — Mongoose, JWT, bcrypt
Auth.Client/                     # Frontend auth (React/TSX) — hooks, forms, context
E.API/                           # E-commerce backend — mounts Auth.Server router + adds product routes
E.UI/                            # E-commerce frontend — wraps app in AuthProvider + adds product pages
```

## Data flow

1. User submits login form (`E.UI` → `LoginForm`).
2. `Login.logic.ts` calls `useAuth().login()` (context from `Auth.Client`).
3. `Auth.Client` `useAuth` → `AuthAPIService.login()` → HTTP POST to `/api/auth/login`.
4. `E.API` mounts `Auth.Server` router at `/api/auth`, forwarding to `AuthService.login()`.
5. `AuthService` validates credentials via `AuthRepository` (Mongoose `User` model).
6. JWT token issued; returned as `IResponse<LoginResponse>`.
7. Token stored in `localStorage`; `AuthProvider` context updates `isAuthenticated` / `user`.
8. Subsequent calls include `Authorization: Bearer <token>`.
9. `Auth.Server` `authMiddleware` (also re-exported by `E.API`) verifies JWT on protected routes.

## Environment variables

| Variable        | Used by                                  |
| --------------- | ---------------------------------------- |
| `JWT_SECRET`    | Auth.Server, E.API                       |
| `JWT_EXPIRES_IN`| Auth.Server, E.API                       |
| `MONGO_URI`     | Auth.Server / E.API (mongoose connect)   |
| `CLIENT_URL`    | E.API (CORS origin)                      |
| `VITE_API_URL`  | Auth.Client / E.UI (API base URL)        |

## Reuse across projects

Any new backend project installs `auth-server` via npm workspace and mounts
`authRouter`:

```js
const { authRouter } = require('auth-server');
app.use('/api/auth', authRouter);
```

Any new frontend project installs `auth-client`, wraps its app in
`AuthProvider`, and consumes `useAuth` / `LoginForm` / `RegisterForm`.
