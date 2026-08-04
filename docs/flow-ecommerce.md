# Flow: E-Commerce

Date: 2026-08-04
Description: E-commerce API and UI built on top of the shared Auth modules.

## Backend (E.API)

```
E.API/src/
├── config/                  # App config (port, mongoURI, jwt, env)
├── database/connect.js     # MongoDB connection
├── middleware/             # errorHandler, requestLogger, authMiddleware (re-exported from auth-server)
├── models/Product.js       # Mongoose Product schema
├── repositories/ProductRepository.js  # Data access layer
├── services/ProductService.js        # Business logic
├── routes/
│   ├── index.js            # Mounts authRouter (from auth-server) + productRoutes
│   └── ProductRoutes.js    # Product CRUD endpoints
└── index.js                # Express app entry point
```

### Auth integration

E.API reuses Auth.Server for all authentication:
- `const { authRouter } = require('auth-server')` → mounted at `/api/auth`
- Auth middleware re-exported for protected e-commerce routes: `const { authMiddleware } = require('auth-server')`
- Auth.Server's `User` Mongoose model shares the same mongoose connection.

## Frontend (E.UI)

```
E.UI/src/
├── App.tsx
├── routes/AppRoutes.tsx     # React Router routes
├── context/HttpContext.tsx  # HttpService context
├── services/
│   ├── HttpService.ts        # Shared axios instance (token interceptor)
│   └── ProductService.ts     # Product API calls
├── pages/
│   ├── Home/                 # Home page (uses useAuth from auth-client)
│   ├── Products/             # Product catalog
│   └── auth/
│       ├── Login/            # Login page (uses LoginForm from auth-client)
│       └── Register/         # Register page (uses RegisterForm from auth-client)
└── styles/global.css
```

### Auth integration

E.UI wraps its tree in `AuthProvider` from `auth-client` so all pages
can call `useAuth()` for login/register/logout state. Protected routes
that need the token are handled by `HttpService` request interceptor.
