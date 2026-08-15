# MERN Stack Project Rules & Standards

## Project Architecture Overview

```
ProjectRoot/
├── package.json                      # Root workspace config (npm workspaces / pnpm / yarn)
├── shared/                           # Universal layer (Client + Server contracts, types, schemas)
│   ├── api/
│   │   ├── contracts/                # Standard response wrappers (IApiResponse<T>, IPaginatedResponse<T>)
│   │   ├── http-methods.ts           # GET, POST, PUT, PATCH, DELETE, SEARCH
│   │   └── query-builder.ts          # SearchCriteria, FilterOperator, PaginationQuery types
│   ├── constants/
│   │   ├── error-codes.ts            # Centralized business logic error codes
│   │   └── http-status.ts            # HTTP status code constants
│   ├── dto/                          # Common Data Transfer Objects
│   ├── schemas/                      # Shared Zod / validation schemas
│   └── types/                        # Universal TypeScript interfaces
├── shared.client/                    # Frontend core (UI primitives, API client, hooks, router)
│   ├── components/                   # Custom primitives (Toaster, Spinner, Modal, Table, Drawer)
│   ├── config/                       # Environment variables, app configuration constants
│   ├── context/                      # Global state providers (AuthContext, ThemeContext, ToastContext)
│   ├── hooks/                        # Custom React hooks (useForm, useDebounce, useFetch, useSocket)
│   ├── http/                         # Axios/Fetch instances with interceptors & SEARCH support
│   ├── router/                       # Route guards, layout wrappers, dynamic routing utilities
│   └── utils/                        # Formatting, DOM helpers, local storage managers
├── shared.server/                    # Backend core (DB adapters, storage strategy, middleware, utilities)
│   ├── config/                       # Service toggles (Redis enabled?, Storage provider selection)
│   ├── db/                           # DB connection pools, Mongoose abstract helpers
│   ├── query/                        # MongoDB criteria builder (translates dynamic filters)
│   ├── storage/                      # Strategy Pattern for file uploads
│   │   ├── storage.interface.ts      # upload(), delete(), getUrl()
│   │   ├── cloudinary.adapter.ts
│   │   └── local-disk.adapter.ts
│   ├── cache/                        # Redis wrapper with in-memory fallback
│   ├── mail/                         # SMTP / Mail adapter
│   ├── middleware/                   # Global Error Handler, Rate Limiter, Auth JWT Verifier, Logger
│   └── utils/                        # Crypto, OTP generation, Hash helpers
├── modules/
│   ├── auth/
│   │   ├── auth.client/              # Auth frontend (React/TSX) — reusable across UI projects
│   │   │   ├── components/           # Auth forms, providers
│   │   │   ├── hooks/                # Auth hooks (useAuth, useLogin, etc.)
│   │   │   ├── services/             # Auth API service + route constants
│   │   │   └── index.ts              # Module exports
│   │   └── auth.server/              # Auth backend (Node.js) — reusable across API projects
│   │       ├── controllers/          # Express routers
│   │       ├── services/             # Business logic (interfaces + implementations)
│   │       ├── repositories/         # Data access (interfaces + implementations)
│   │       ├── middleware/           # JWT auth middleware
│   │       ├── database/             # MongoDB connection helper
│   │       └── index.js              # Module exports
│   ├── role/
│   │   ├── role.client/
│   │   └── role.server/
│   ├── user/
│   │   ├── user.client/
│   │   └── user.server/
│   └── ecommerce/
│       ├── ecommerce.client/         # E-commerce frontend (React/TSX)
│       │   ├── pages/                # Page components (3-file structure)
│       │   ├── routes/               # React Router configuration
│       │   ├── context/              # HttpService context
│       │   ├── services/             # HttpService, ProductService
│       │   └── styles/               # Global CSS (Tailwind)
│       └── ecommerce.server/         # E-commerce API (Node.js/Express)
│           ├── config/               # App config
│           ├── middleware/           # Error handler, request logger, auth
│           ├── models/               # E-commerce Mongoose schemas
│           ├── repositories/         # Data access
│           ├── services/             # Business logic
│           ├── routes/               # API routes (auth + e-commerce)
│           └── database/             # MongoDB connection
└── docs/                             # Architecture flows and decisions
    ├── flow-authentication.md
    ├── flow-ecommerce.md
    └── flow-changes/
```

### Reusability

Auth is a shared layer with no project-specific dependencies:
- **auth.server** is consumed via `const { authRouter } = require('auth-server')` and mounted at `/api/auth`.
- **auth.client** is consumed via `<AuthProvider>` + `useAuth()` hook.
- **ecommerce.server** mounts auth.server's router and adds e-commerce routes.
- **ecommerce.client** wraps its app in AuthProvider and adds e-commerce pages.

Additional projects (e.g. a blog, CRM) can install `auth-server` and `auth-client` and reuse authentication without duplicating code.

---

## 1. Universal Shared Layer (shared/)

### Zero Runtime Dependencies

Code in `shared/` must have zero runtime dependencies on DOM or Node.js built-ins. It runs everywhere (client, server, edge, tests).

### Unified API Response Standard

Standardized JSON envelopes for success/error payloads.

```typescript
// shared/api/contracts/IApiResponse.ts
export interface IApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  messages: string[];
  errors?: Record<string, string[]>;
  statusCode: number;
}

export interface IPaginatedResponse<T = unknown> extends IApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

### HTTP Method Contracts

Supports standard methods plus the SEARCH HTTP method (or a specialized POST /search payload design) to handle rich dynamic query body criteria without URL string limit bottlenecks.

```typescript
// shared/api/http-methods.ts
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  SEARCH = 'SEARCH',
}
```

### Dynamic Query Protocol

Standardized definitions for pagination, sorting, field projections, and dynamic operators.

```typescript
// shared/api/query-builder.ts
export type FilterOperator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'contains';

export interface FilterCriterion {
  field: string;
  operator: FilterOperator;
  value: any;
}

export interface SearchQueryPayload {
  filters?: FilterCriterion[];
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  searchQuery?: string; // Global search across multi-fields
}

export interface PaginationQuery {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
```

### Validation Schemas (Zod)

Universal schema validation used by both React forms on the client and controller middleware on the server.

```typescript
// shared/schemas/auth.schema.ts
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginRequest = z.infer<typeof LoginSchema>;
```

### Error Codes & Constants

Centralized business logic error codes.

```typescript
// shared/constants/error-codes.ts
export enum ErrorCode {
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  DUPLICATE_KEY = 'DUPLICATE_KEY',
  FORBIDDEN = 'FORBIDDEN',
}
```

---

## 2. Shared.Client (Frontend Foundation)

Houses client-side utilities, API callers, custom headless UI components, and state bridges.

### Headless / Custom UI Primitives

Fully customized, zero-third-party design components.

- `Toaster` — Toast notifications
- `Modal` — Accessible modal dialogs
- `Loader` — Loading spinners / skeletons
- `DataGrid` — Virtualized data tables
- `Tooltip` — Contextual tooltips

**Rule:** No external UI component libraries (no Ant Design, Material-UI, Chakra, etc.).

### Network & Gateway Clients

Axios/Fetch instance configured with:
- Token interceptors (attach JWT / refresh token)
- Refresh token loops (automatic retry on 401)
- Unified error parsing (map HTTP errors to ErrorCode enum)
- WebSocket client connections

```typescript
// shared.client/http/ApiClient.ts
export class ApiClient {
  private static instance: AxiosInstance;

  static getInstance(): AxiosInstance {
    if (!ApiClient.instance) {
      ApiClient.instance = axios.create({ baseURL: import.meta.env.VITE_API_URL });
      // interceptors for tokens and error parsing
    }
    return ApiClient.instance;
  }

  static async search<T>(endpoint: string, payload: SearchQueryPayload): Promise<IApiResponse<T[]>> {
    return this.post<T[]>(endpoint, payload, { method: HttpMethod.SEARCH });
  }
}
```

### Reusable Hooks

- Form handlers (`useForm`, `useFormField`)
- Debounce (`useDebounce`)
- Local storage state (`useLocalStorage`)
- Network status (`useOnlineStatus`)
- Modal controls (`useModal`)
- Socket (`useSocket`)

### Navigation & Guards

Higher-Order Components (HOCs) or hooks for:
- Protected Routes
- Role Checks
- Dynamic Breadcrumbs

```typescript
// shared.client/router/guards.ts
export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;
  return children;
};
```

---

## 3. Shared.Server (Backend Engine & Infrastructure)

### Feature Flag / Feature Toggle System

Configurable setup enabling or disabling heavy integrations.

```typescript
// shared.server/config/features.ts
export const Features = {
  redisEnabled: process.env.ENABLE_REDIS === 'true',
  smtpEnabled: process.env.ENABLE_SMTP === 'true',
  storageProvider: process.env.STORAGE_PROVIDER || 'local', // 'cloudinary' | 'local'
};
```

### Storage Adapter Strategy (Cloudinary / Local File System)

Abstract storage service implementing a single interface (`IStorageService`) so the app can swap between Cloudinary and Local Disk seamlessly based on settings.

```typescript
// shared.server/storage/storage.interface.ts
export interface IStorageService {
  uploadFile(file: Express.Multer.File, folder?: string): Promise<string>;
  deleteFile(publicId: string): Promise<void>;
  getFileUrl(publicId: string): string;
}
```

### Flexible MongoDB Query Builder

Adapter that takes the dynamic `SearchQueryPayload` from the Shared package and translates it into Mongoose/MongoDB query pipelines.

```typescript
// shared.server/query/mongo-query-builder.ts
import { SearchQueryPayload } from '../../shared/api/query-builder';

export class MongoQueryBuilder {
  static buildFilter(payload: SearchQueryPayload): Record<string, any> {
    const query: Record<string, any> = {};
    if (!payload.filters || payload.filters.length === 0) return query;

    payload.filters.forEach(({ field, operator, value }) => {
      switch (operator) {
        case 'eq': query[field] = value; break;
        case 'ne': query[field] = { $ne: value }; break;
        case 'gt': query[field] = { $gt: value }; break;
        case 'gte': query[field] = { $gte: value }; break;
        case 'lt': query[field] = { $lt: value }; break;
        case 'lte': query[field] = { $lte: value }; break;
        case 'in': query[field] = { $in: Array.isArray(value) ? value : [value] }; break;
        case 'contains': query[field] = { $regex: value, $options: 'i' }; break;
      }
    });
    return query;
  }

  static buildPagination(payload: PaginationQuery) {
    return {
      skip: (payload.page - 1) * payload.limit,
      limit: payload.limit,
      sort: payload.sortBy ? { [payload.sortBy]: payload.sortOrder === 'desc' ? -1 : 1 } : {},
    };
  }
}
```

### Crypto & Security Utilities

- Token generation (JWT, OTP, refresh tokens)
- Password hashing (bcrypt)
- Encryption/decryption utilities (AES for sensitive fields)

### Core Middlewares

- Global Error Handler
- Rate Limiter
- Auth JWT Verifier
- Request Logger
- Audit Logger (captures user ID, IP, timestamp, action)

---

## 4. Dynamic Query Protocol (Shared + MongoDB Builder)

### Query Interface Contract

```typescript
export type FilterOperator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'contains';

export interface FilterCriterion {
  field: string;
  operator: FilterOperator;
  value: any;
}

export interface SearchQueryPayload {
  filters?: FilterCriterion[];
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  searchQuery?: string;
}
```

### MongoDB Query Engine

```typescript
export class MongoQueryBuilder {
  static buildFilter(payload: SearchQueryPayload) {
    const query: Record<string, any> = {};
    if (!payload.filters || payload.filters.length === 0) return query;

    payload.filters.forEach(({ field, operator, value }) => {
      switch (operator) {
        case 'eq': query[field] = value; break;
        case 'ne': query[field] = { $ne: value }; break;
        case 'gt': query[field] = { $gt: value }; break;
        case 'gte': query[field] = { $gte: value }; break;
        case 'lt': query[field] = { $lt: value }; break;
        case 'lte': query[field] = { $lte: value }; break;
        case 'in': query[field] = { $in: Array.isArray(value) ? value : [value] }; break;
        case 'contains': query[field] = { $regex: value, $options: 'i' }; break;
      }
    });
    return query;
  }
}
```

---

## 5. Key Additions Recommended for Architecture

### Storage Adapter Pattern

Define an interface `IStorageService` with methods `uploadFile()`, `deleteFile()`, and `getFileUrl()`. Configure `shared.server` to initialize either `CloudinaryService` or `LocalDiskService` depending on `process.env.STORAGE_PROVIDER`.

### Global Event Bus / Socket Gateway

Create a pub/sub contract in `shared/` and a socket handling interface in `shared.server/` / `shared.client/` so feature modules (Auth, Role, Notification) can broadcast real-time events uniformly.

```typescript
// shared/api/contracts/ISocketEvent.ts
export interface ISocketEvent<T = unknown> {
  event: string;
  payload: T;
  room?: string;
  userId?: string;
}
```

### Audit Logging & Tracing

A shared utility in `shared.server/utils/` to automatically capture user ID, IP address, timestamp, and action performed across API calls.

```typescript
// shared.server/utils/audit.ts
export interface AuditLog {
  userId?: string;
  ip: string;
  action: string;
  resource?: string;
  timestamp: Date;
  userAgent?: string;
}
```

---

## UI Guidelines

### 1. Page File Structure

Each UI page must use three files:
- `PageName.tsx` (React component with markup)
- `PageName.logic.ts` or `PageName.hooks.ts` (component logic/hooks)
- `PageName.css` (component-scoped styles)

**Example:**
```
Login/
├── Login.tsx           # Component markup
├── Login.logic.ts      # Business logic, state management
├── Login.css           # Component-specific styles
└── index.ts            # Export file
```

### 2. Dynamic UI Data

- Avoid hardcoding UI values wherever possible.
- Use database-driven values via API calls to endpoints like `/api/dropdown` with parameters.
- Hardcoding is only allowed when it is necessary and the best approach; if so, ask for approval with a reason.
- Use environment variables for configuration values.

### 3. CSS Practices (TailwindCSS + Pure CSS)

- **Primary**: Use TailwindCSS utility classes for most styling directly in JSX/TSX.
- **Component Styles**: Put component-specific custom styles in the page's `.css` file.
- **Global Utilities**: Only add truly global utility classes in a global CSS file under `shared.client/utils/` or a shared styles entry.
- **No other CSS frameworks** — Only TailwindCSS and pure CSS allowed.

**Global utility classes should be responsive and reusable:**
```css
/* Buttons */
.-button-success { @apply bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600; }
.-button-error { @apply bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600; }
.-button-warning { @apply bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600; }

/* Layout */
.-row { @apply flex flex-row; }
.-columns { @apply flex flex-col; }
.-container { @apply max-w-7xl mx-auto px-4; }

/* Colors */
.-background-color { @apply bg-gray-50; }
.-text-color { @apply text-gray-900; }
```

### 4. UI Manager Pattern (Custom Hooks)

Each UI feature should have a `hooks` or `logic` folder containing:
- `useName.ts` (custom hook interface/implementation)
- `NameService.ts` (API service calls)
- `NameRoutes.ts` (route helper/constants)

**Example:**
```typescript
// hooks/useAuth.ts
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const login = async (request: LoginRequest): Promise<IApiResponse<LoginResponse>> => { /* ... */ };
  return { user, login };
};

// services/AuthService.ts
export class AuthService {
  static async login(request: LoginRequest): Promise<IApiResponse<LoginResponse>> {
    return await ApiClient.post('/auth/login', request);
  }
}

// routes/AuthRoutes.ts
export const AuthRoutes = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
};
```

### 5. Standard Response Wrapping

UI methods must return `IApiResponse<T>` wrapper pattern.

```typescript
interface IApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  messages: string[];
  errors?: Record<string, string[]>;
  statusCode: number;
}
```

**Usage:**
```typescript
const response = await AuthService.login(loginData);
if (response.success && response.data) {
  // Handle success
} else {
  // Handle failure with response.messages
}
```

### 6. Dependency Injection (React Context + Custom Hooks)

Inject shared services via React Context and custom hooks.

```typescript
// shared.client/context/ApiClientContext.tsx
export const ApiClientContext = createContext<IApiClient | null>(null);

// In component
const apiClient = useContext(ApiClientContext);
const { user, login } = useAuth();
```

### 7. Shared UI and Project-Specific Shared

- Put project-specific reusable components in `modules/{domain}/{domain}.client/components/`.
- Put truly global reusable UI components in `shared.client/components/`.

**Shared UI Components Examples:**
- `Toaster/Toaster.tsx`
- `Spinner/Spinner.tsx`
- `Modal/Modal.tsx`
- `Table/Table.tsx`
- `Drawer/Drawer.tsx`
- `Tooltip/Tooltip.tsx`

### 8. Shared HTTP Service

All API calls from UI must use the shared HTTP service implementation in `shared.client/http/`.

```typescript
// shared.client/http/ApiClient.ts
export class ApiClient {
  static async get<T>(endpoint: string): Promise<IApiResponse<T>> { /* ... */ }
  static async post<T>(endpoint: string, data: any): Promise<IApiResponse<T>> { /* ... */ }
  static async put<T>(endpoint: string, data: any): Promise<IApiResponse<T>> { /* ... */ }
  static async delete<T>(endpoint: string): Promise<IApiResponse<T>> { /* ... */ }
  static async search<T>(endpoint: string, payload: SearchQueryPayload): Promise<IApiResponse<T[]>> { /* ... */ }
}
```

### 9. Shared Models

Shared models belong in `shared/types/` and `shared/dto/`.

```
shared/
├── types/
│   ├── User.ts
│   └── Role.ts
├── dto/
│   ├── LoginRequest.ts
│   └── LoginResponse.ts
└── schemas/
    ├── auth.schema.ts
    └── common.schema.ts
```

**Rules:**
- Avoid defining the same models in both UI and API.
- Feature model organization should be clean and grouped by area.
- UI and Server import models from `shared/`.

### 10. Shared Data Access Patterns

- Prefer `Map<string, string>` or `Record<string, string>` for frequent key lookups instead of repeated `find()`.
- This keeps lookup complexity O(1) and improves performance.

```typescript
// Good — O(1) lookup
const dropdownMap: Record<string, string> = { '1': 'Option 1', '2': 'Option 2' };
const value = dropdownMap[key];

// Avoid — O(n) lookup
const value = dropdownList.find(item => item.id === key)?.value;
```

---

## API Guidelines (Server)

### 1. Controller Responsibilities

Controllers are the API entry point and must stay minimal.

```typescript
// modules/auth/auth.server/controllers/AuthController.ts
export class AuthController {
  private authService: IAuthService;
  constructor(authService: IAuthService) { this.authService = authService; }

  async login(req: Request, res: Response): Promise<void> {
    const response = await this.authService.login(req.body);
    res.status(response.statusCode || 200).json(response);
  }
}
```

**Rules:**
- Do not place business logic in controllers.
- Controller method should call the service and return the service response.
- Always return proper HTTP status codes with `IApiResponse<T>`.

### 2. Service Layer Structure

API services reside under `services/interfaces/` and `services/implementations/`.

```typescript
// services/interfaces/IAuthService.ts
export interface IAuthService {
  login(request: LoginRequest): Promise<IApiResponse<LoginResponse>>;
  register(request: RegisterRequest): Promise<IApiResponse<RegisterResponse>>;
}

// services/implementations/AuthService.ts
export class AuthService implements IAuthService {
  async login(request: LoginRequest): Promise<IApiResponse<LoginResponse>> {
    try {
      const response = await this.authRepository.login(request);
      if (response?.success) {
        return Response.Success(response.data, 'Login successful');
      } else {
        return Response.Fail('Invalid credentials');
      }
    } catch (error) {
      Logger.error('Login failed', error);
      return Response.Fail('An error occurred during login');
    }
  }
}
```

**Response Helper:**
```typescript
// shared/api/contracts/Response.ts
export class Response<T> {
  static Success<T>(data: T, message?: string): IApiResponse<T> {
    return { data, success: true, messages: message ? [message] : [], statusCode: 200 };
  }
  static Fail<T>(message: string, statusCode: number = 400): IApiResponse<T> {
    return { data: null, success: false, messages: [message], statusCode };
  }
}
```

### 3. Error Handling and Logging

- Use `try-catch` around service logic.
- Log exceptions and return standardized failure responses.
- Handle specific conditions inside the success branch when needed.

```typescript
// shared.server/utils/Logger.ts
export class Logger {
  static info(message: string, data?: any): void { /* ... */ }
  static error(message: string, error?: Error): void { /* ... */ }
  static warn(message: string, data?: any): void { /* ... */ }
}
```

### 4. Reusability and Dynamic Logic

- Extract repeated or project-common logic into reusable helpers.
- Make API logic dynamic and avoid duplicate code.
- Only create new code when it cannot be reused safely.

**Utility Helpers:**
```
shared.server/utils/
├── crypto.ts           # Token generation, password hashing, encryption
├── otp.ts              # OTP generation
├── validation.ts       # Input validation helpers
└── date.ts             # Date formatting, manipulation
```

### 5. Shared Models Across API and UI

- Use shared model folders under `shared/types/` and `shared/dto/` so UI and API share the same request/response DTOs.
- Do not duplicate model definitions in API or UI.
- Import: `import { LoginRequest } from 'shared/dto/LoginRequest';`

### 6. Middleware for Cross-Cutting Concerns

Use middleware for concerns like:
- IP logging
- Route/access tracking
- Login activity auditing
- Error logging
- CORS handling
- Rate limiting
- Authentication/Authorization
- Audit logging (user ID, IP, timestamp, action)

```typescript
// shared.server/middleware/auth.middleware.ts
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => { /* JWT validation */ };

// shared.server/middleware/audit.middleware.ts
export const auditMiddleware = (action: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Capture user ID, IP, timestamp, action
    next();
  };
};
```

### 7. Configuration via Environment Variables

- Store configuration values in `.env` or `.env.development`.
- Use `dotenv` package for environment variable management.
- Create config classes/interfaces for type safety.
- Use feature flags in `shared.server/config/` to toggle integrations.

```typescript
// shared.server/config/index.ts
export const AppConfig = {
  port: parseInt(process.env.PORT || '3000'),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  storageProvider: process.env.STORAGE_PROVIDER || 'local',
  redisEnabled: process.env.ENABLE_REDIS === 'true',
};
```

### 8. Utility / Helper Folder

Place reusable helpers in `shared.server/utils/`.

**Typical utilities:**
- Crypto (token generation, password hashing)
- OTP generation
- Date formatting
- Excel generation helpers
- File upload helpers

---

## 6. Global Event Bus / Socket Gateway

Create a pub/sub contract in `shared/` and a socket handling interface in `shared.server/` / `shared.client/` so feature modules (Auth, Role, Notification) can broadcast real-time events uniformly.

```typescript
// shared/api/contracts/ISocketEvent.ts
export interface ISocketEvent<T = unknown> {
  event: string;
  payload: T;
  room?: string;
  userId?: string;
}

// shared.server/middleware/socket.gateway.ts
export interface ISocketGateway {
  connect(server: Server): void;
  emit(event: ISocketEvent): void;
  on(event: string, handler: Function): void;
}

// shared.client/hooks/useSocket.ts
export const useSocket = () => { /* WebSocket client with auto-reconnect */ };
```

---

## 7. Audit Logging & Tracing

A shared utility in `shared.server/utils/` to automatically capture user ID, IP address, timestamp, and action performed across API calls.

```typescript
// shared.server/utils/audit.ts
export interface AuditLog {
  userId?: string;
  ip: string;
  action: string;
  resource?: string;
  timestamp: Date;
  userAgent?: string;
}

export class AuditLogger {
  static log(data: Omit<AuditLog, 'timestamp'>): void { /* Write to database / file */ }
}
```

---

## Database Guidelines (MongoDB)

### Shared Database Project

Each module's database logic lives in `modules/{domain}/{domain}.server/database/`.

**Structure:**
```
modules/auth/auth.server/database/
├── models/               # Mongoose schemas
│   ├── User.model.ts
│   └── Role.model.ts
├── repositories/         # Data access layer
│   ├── interfaces/
│   │   └── IUserRepository.ts
│   └── implementations/
│       └── UserRepository.ts
├── migrations/           # Schema migrations/scripts
└── seeds/                # Initial data seeding
```

### Schema Standards

- Use Mongoose for MongoDB schema definition and validation.
- Create schemas that map to features/pages.
- Use indexes for frequently queried fields.

**Example:**
```typescript
// models/User.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
}, { timestamps: true });

UserSchema.index({ email: 1 });

export default mongoose.model<IUser>('User', UserSchema);
```

### Repository Pattern

- Implement repository pattern for data access.
- All CRUD operations go through repositories.
- Services call repositories, not direct model access.

```typescript
// repositories/interfaces/IUserRepository.ts
export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  create(userData: Partial<IUser>): Promise<IUser>;
  update(id: string, userData: Partial<IUser>): Promise<IUser | null>;
  delete(id: string): Promise<boolean>;
}

// repositories/implementations/CrudRepository.ts  (generic base)
export class CrudRepository<TModel> {
  protected model: Model<TModel>;
  constructor(model: Model<TModel>) { this.model = model; }
  async create(data: Partial<TModel>): Promise<TModel> { return await this.model.create(data); }
  async findById(id: string): Promise<TModel | null> { return await this.model.findById(id); }
  // ... generic CRUD
}

// repositories/implementations/UserRepository.ts
export class UserRepository extends CrudRepository<IUser> implements IUserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return await this.model.findOne({ email }).exec();
  }
}
```

### Stored Procedures Alternative (Aggregation Pipelines)

Since MongoDB doesn't have stored procedures, use:
- Aggregation pipelines for complex queries
- Pre-defined query builders in repositories
- Service methods that encapsulate complex data operations

**Common Queries:**
- `getDropdownValues(type: string)` — For dropdown data
- `getStaticValues(category: string)` — For static configuration values

---

## Naming Rules

### File Naming

Match names consistently across layers whenever possible.

**Patterns:**
- `NamePage.tsx` / `NamePage.logic.ts` / `NamePage.css`
- `useName.ts` (custom hook)
- `NameService.ts` (API service)
- `NameRoutes.ts` (route constants)
- `NameController.ts`
- `INameService.ts` / `NameService.ts` (service interface/implementation)
- `NameRequest.ts` / `NameResponse.ts`
- `Name.model.ts` (Mongoose schema)
- `NameRepository.ts`

### Function Naming

- Use short, meaningful names that align across UI, hook, controller, and service layers.
- The same function name should be used in the UI logic, service, and controller when it represents the same action.

**Example Flow:**
```typescript
// UI: Login.logic.ts
const login = async (request: LoginRequest) => {
  return await AuthService.login(request);
};

// Service: AuthService.ts
async login(request: LoginRequest): Promise<IApiResponse<LoginResponse>> { }

// Controller: AuthController.ts
async login(req: Request, res: Response): Promise<void> { }
```

---

## New File Flow

### UI Files
```
modules/{domain}/{domain}.client/
├── pages/
│   └── FeaturePage/
│       ├── FeaturePage.tsx
│       ├── FeaturePage.logic.ts
│       ├── FeaturePage.css
│       └── index.ts
├── hooks/useFeature.ts
├── services/FeatureService.ts
└── routes/FeatureRoutes.ts
```

### API Files (Server)
```
modules/{domain}/{domain}.server/
├── controllers/FeatureController.ts
├── services/interfaces/IFeatureService.ts
└── services/implementations/FeatureService.ts
```

### Shared Model Files
```
shared/
├── dto/FeatureRequest.ts
└── types/Feature.ts
```

### Database Files
```
modules/{domain}/{domain}.server/database/
├── models/Feature.model.ts
└── repositories/implementations/FeatureRepository.ts
```

### Typical Flow
```
Client (modules/{domain}/{domain}.client)
  → shared/ (types, dto, schemas)
  → Server (modules/{domain}/{domain}.server)
  → Database (MongoDB)
```

- When exceptions occur, add middleware or reusable components instead of duplicating logic.

---

## Build Process & Documentation

### Documentation

Document each build or flow in a `docs/flow-[name].md` file.
Include the date and a clear description of what changed.

**Example:**
```markdown
# Flow: Authentication

Date: 2024-01-15
Description: Initial authentication flow implementation

Steps:
1. User submits login form (modules/auth/auth.client)
2. AuthService.login() called (shared.client/http/ApiClient)
3. Request sent to /api/auth/login (modules/auth/auth.server)
4. AuthController.login() -> AuthService.login() -> UserRepository.findByEmail()
5. JWT token generated and returned
6. Token stored in localStorage/cookies
7. User redirected to dashboard
```

### Flow Changes

When the flow changes, create/update a file named:
- `docs/flow-change-[name]-[reason].md`
- Record the reason for the change and the updated behavior.

---

## Technology Stack

### Frontend (Client)
- **React** with TypeScript (TSX)
- **TailwindCSS** for styling
- **Pure CSS** for custom component styles
- **React Router** for navigation
- **React Context** for state management
- **Custom Hooks** for business logic
- **Axios** for HTTP calls
- **Zod** for schema validation

### Backend (Server)
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **dotenv** for environment variables
- **Zod** for schema validation
- **Socket.io** for real-time events (WebSocket)

### Shared
- **TypeScript** for all shared code
- **ESLint** + **Prettier** for code quality
- **Jest** for testing
- **Zod** for validation schemas

---

## General Rules

1. **Follow these rules in most cases.** If an exception is required, ask before deviating.

2. **Prefer dynamic, reusable, maintainable architecture** over hardcoded or duplicated solutions.

3. **When a rule conflicts with a real requirement,** raise the issue and confirm the alternative.

4. **No external UI component libraries** — Build custom components only (no Ant Design, Material-UI, etc.).

5. **Only TailwindCSS and Pure CSS** — No other CSS frameworks or preprocessors (SASS, LESS, etc.).

6. **TypeScript everywhere** — TSX for React components, TS for Node.js backend, TS for shared layers.

7. **Keep API endpoints simple and stable** — Design APIs so they are mobile-friendly and easy to reuse.

8. **Single Responsibility Principle** — Each file/class/function should have one clear purpose.

9. **DRY (Don't Repeat Yourself)** — Extract common logic into shared utilities.

10. **Consistent naming** — Use the same names across layers for the same concepts.

11. **Shared layer purity** — `shared/` must not import from `shared.client/` or `shared.server/`. `shared.client/` must not import from `shared.server/`.

12. **Feature flags for heavy integrations** — Use `shared.server/config/features.ts` to toggle Redis, SMTP, Cloudinary, etc.

13. **Storage adapter pattern** — Always use `IStorageService` from `shared.server/storage/` for file operations.

14. **Dynamic search protocol** — All list endpoints must support the `SearchQueryPayload` protocol from `shared/api/query-builder.ts`.

15. **Zod schemas for all inputs** — Validate all API inputs with Zod schemas defined in `shared/schemas/`.

16. **Response envelope** — All API responses must conform to `IApiResponse<T>` or `IPaginatedResponse<T>` from `shared/api/contracts/`.

---

## Quick Start Checklist

### Setup Steps:
1. Initialize monorepo structure with workspaces (npm/yarn/pnpm)
2. Set up `shared/` with contracts, constants, DTOs, schemas, types
3. Set up `shared.client/` with base components, hooks, HTTP client, router
4. Set up `shared.server/` with config, DB helpers, query builder, storage, middleware
5. Configure modules with Express, MongoDB connection, middleware
6. Configure Client modules with React, TailwindCSS, routing
7. Set up environment variables (.env files)
8. Configure ESLint, Prettier, TypeScript, Husky + lint-staged
9. Create first domain (e.g., Auth) following the pattern
10. Test the complete flow: UI → shared → API → Database
11. Document the flow in `docs/`

### Required Packages:

**shared (universal layer):**
```json
{
  "dependencies": {
    "zod": "^3.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "jest": "^29.x",
    "@types/jest": "^29.x"
  }
}
```

**shared.server:**
```json
{
  "dependencies": {
    "express": "^4.x",
    "mongoose": "^8.x",
    "zod": "^3.x",
    "bcrypt": "^5.x",
    "jsonwebtoken": "^9.x",
    "dotenv": "^16.x",
    "cors": "^2.x",
    "helmet": "^7.x",
    "express-rate-limit": "^7.x",
    "socket.io": "^4.x"
  },
  "devDependencies": {
    "@types/express": "^4.x",
    "@types/node": "^20.x",
    "typescript": "^5.x",
    "jest": "^29.x",
    "@types/jest": "^29.x"
  }
}
```

**shared.client:**
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "axios": "^1.x",
    "tailwindcss": "^3.x",
    "zod": "^3.x",
    "socket.io-client": "^4.x"
  },
  "devDependencies": {
    "@types/react": "^18.x",
    "@types/react-dom": "^18.x",
    "typescript": "^5.x",
    "vite": "^5.x",
    "@vitejs/plugin-react": "^4.x"
  }
}
```

**Module Servers (modules/{domain}/{domain}.server):**
```json
{
  "dependencies": {
    "shared": "file:../../shared",
    "shared.server": "file:../../shared.server"
  }
}
```

**Module Clients (modules/{domain}/{domain}.client):**
```json
{
  "dependencies": {
    "shared": "file:../../shared",
    "shared.client": "file:../../shared.client",
    "{domain}-server": "file:../{domain}.server"
  }
}
```

---

## Project Structure Summary

```
/workspace/
├── package.json                  # Root workspace config
├── shared/                       # Universal layer (types, schemas, contracts, constants, DTOs)
│   ├── api/contracts/            # IApiResponse, IPaginatedResponse
│   ├── api/http-methods.ts       # HttpMethod enum
│   ├── api/query-builder.ts      # SearchQueryPayload, FilterOperator
│   ├── constants/error-codes.ts  # ErrorCode enum
│   ├── constants/http-status.ts  # HttpStatus enum
│   ├── dto/                      # Request/Response DTOs
│   ├── schemas/                  # Zod validation schemas
│   └── types/                    # TypeScript interfaces
├── shared.client/                # Frontend core (primitives, hooks, HTTP, router, context)
│   ├── components/               # Custom primitives (Toaster, Modal, Spinner, Table, Drawer)
│   ├── config/                   # Environment variables
│   ├── context/                  # Global state providers
│   ├── hooks/                    # Custom React hooks
│   ├── http/                     # Axios instances with interceptors
│   ├── router/                   # Route guards, layout wrappers
│   └── utils/                    # Formatting, DOM helpers
├── shared.server/                # Backend engine (DB, storage, middleware, crypto)
│   ├── config/                   # Feature flags
│   ├── db/                       # DB connection, Mongoose helpers
│   ├── query/                    # MongoDB criteria builder
│   ├── storage/                  # Storage adapter (Cloudinary / Local)
│   ├── cache/                    # Redis wrapper with in-memory fallback
│   ├── mail/                     # SMTP / Mail adapter
│   ├── middleware/               # Error handler, auth, rate limiter, audit
│   └── utils/                    # Crypto, OTP, hash helpers
├── modules/
│   ├── auth/
│   │   ├── auth.client/          # Auth frontend
│   │   └── auth.server/          # Auth backend
│   ├── role/
│   │   ├── role.client/
│   │   └── role.server/
│   ├── user/
│   │   ├── user.client/
│   │   └── user.server/
│   └── ecommerce/
│       ├── ecommerce.client/     # E-commerce frontend
│       └── ecommerce.server/     # E-commerce API
└── docs/                         # Documentation
    ├── flow-authentication.md
    ├── flow-ecommerce.md
    └── flow-changes/
```

This architecture provides a clean, scalable, and maintainable MERN stack structure with strict layer separation, universal shared contracts, feature flag-driven infrastructure, dynamic query protocol, storage adapter pattern, and audit logging.