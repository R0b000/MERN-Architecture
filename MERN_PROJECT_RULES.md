# MERN Stack Project Rules & Standards

## Project Architecture Overview

```
ProjectRoot/
├── package.json            # Root workspace config (npm workspaces)
├── Shared.API/             # Global shared utilities, wrappers, and models (JS + TS types)
│   └── models/Auth/        # Auth DTOs (entities, requests, responses) — shared by UI & API
├── Shared.UI/              # Global reusable UI components (React/TSX)
├── Auth.Server/            # Shared Auth backend (Node.js) — reusable across API projects
│   ├── models/             # Mongoose schemas
│   ├── repositories/       # Data access (interfaces + implementations)
│   ├── services/           # Business logic (interfaces + implementations)
│   ├── controllers/        # Express routers
│   ├── middleware/         # JWT auth middleware
│   └── database/           # MongoDB connection helper
├── Auth.Client/            # Shared Auth frontend (React/TSX) — reusable across UI projects
│   ├── components/         # Auth forms, providers
│   ├── hooks/              # Auth hooks (useAuth, useLogin, etc.)
│   └── services/           # Auth API service + route constants
├── E.API/                  # E-commerce API (Node.js/Express) — consumes Auth.Server
│   ├── config/             # App config
│   ├── middleware/         # Error handler, request logger, auth (from Auth.Server)
│   ├── models/             # E-commerce Mongoose schemas (e.g. Product)
│   ├── repositories/       # Data access
│   ├── services/           # Business logic
│   ├── routes/             # API routes (auth + e-commerce)
│   └── database/           # MongoDB connection
└── E.UI/                   # E-commerce frontend (React/TSX) — consumes Auth.Client
    ├── pages/              # Page components (3-file structure)
    ├── routes/             # React Router configuration
    ├── context/            # HttpService context
    ├── services/           # HttpService, ProductService
    └── styles/             # Global CSS (Tailwind)
```

### Reusability

Auth is a shared layer with no project-specific dependencies:
- **Auth.Server** is consumed via `const { authRouter } = require('auth-server')` and mounted at `/api/auth`.
- **Auth.Client** is consumed via `<AuthProvider>` + `useAuth()` hook.
- **E.API** mounts Auth.Server's router and adds e-commerce routes.
- **E.UI** wraps its app in AuthProvider and adds e-commerce pages.

Additional projects (e.g. a blog, CRM) can `npm install auth-server auth-client` and reuse authentication without duplicating code.

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
- **Global Utilities**: Only add truly global utility classes in `Shared.UI/styles/utilities.css`.
- **No other CSS frameworks** - Only TailwindCSS and pure CSS allowed.

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

**TailwindCSS Configuration:**
- Extend Tailwind config in `tailwind.config.js` for custom theme values.
- Use `@apply` directive sparingly in CSS files for reusable patterns.

### 4. UI Manager Pattern (Custom Hooks)
Each UI feature should have a `hooks` or `logic` folder containing:
- `use{Name}.ts` (custom hook interface/implementation)
- `{Name}Service.ts` (API service calls)
- `{Name}Routes.ts` (route helper/constants)

**Example:**
```typescript
// hooks/useAuth.ts
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  
  const login = async (request: LoginRequest): Promise<IResponse<LoginResponse>> => {
    // Implementation
  };
  
  return { user, login, /* ... */ };
};

// services/AuthService.ts
export class AuthService {
  static async login(request: LoginRequest): Promise<IResponse<LoginResponse>> {
    return await HttpService.post('/auth/login', request);
  }
}

// routes/AuthRoutes.ts
export const AuthRoutes = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout'
};
```

### 5. Standard Response Wrapping
UI methods must return `IResponse<T>` wrapper pattern.

**Interface Definition:**
```typescript
interface IResponse<T> {
  data: T | null;
  success: boolean;
  messages: string[];
  statusCode?: number;
}
```

**Examples:**
```typescript
async function login(request: LoginRequest): Promise<IResponse<LoginResponse>>;
async function getUsers(): Promise<IResponse<LoginResponse[]>>;
async function getUserById(id: string): Promise<IResponse<string>>;
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

**Example:**
```typescript
// contexts/HttpServiceContext.tsx
export const HttpServiceContext = createContext<IHttpService | null>(null);

// In component
const httpService = useContext(HttpServiceContext);
const { user, login } = useAuth(); // Custom hook with injected services
```

### 7. Shared UI and Project-Specific Shared
- Put project-specific reusable components in `Client/[Domain]/components/`.
- Put truly global reusable UI components in `Shared.UI/components/`.

**Shared UI Components Examples:**
- `AutoCompleteSelect/AutoCompleteSelect.tsx`
- `Cards/Card.tsx`
- `Tables/DataTable.tsx`
- `Graph/Chart.tsx`
- `Button/Button.tsx`
- `Modal/Modal.tsx`
- `FormInput/FormInput.tsx`

### 8. Shared HTTP Service
All API calls from UI must use the shared HTTP service implementation.

```typescript
// Shared.API/services/HttpService.ts
export class HttpService {
  private static baseURL: string = process.env.REACT_APP_API_URL || '';
  
  static async get<T>(endpoint: string): Promise<IResponse<T>> { /* ... */ }
  static async post<T>(endpoint: string, data: any): Promise<IResponse<T>> { /* ... */ }
  static async put<T>(endpoint: string, data: any): Promise<IResponse<T>> { /* ... */ }
  static async delete<T>(endpoint: string): Promise<IResponse<T>> { /* ... */ }
}
```

### 9. Shared Models
Shared models belong in domain-specific model folders under `Shared.API/models/`.

**Structure:**
```
Shared.API/models/
├── Auth/
│   ├── entities/
│   │   ├── User.ts
│   │   └── Role.ts
│   ├── requests/
│   │   └── LoginRequest.ts
│   └── responses/
│       └── LoginResponse.ts
└── HRM/
    ├── entities/
    ├── requests/
    └── responses/
```

**Rules:**
- Avoid defining the same models in both UI and API.
- Feature model organization should be clean and grouped by area.
- UI and Server import models from `Shared.API/models/`.

### 10. Shared Data Access Patterns
- Prefer `Map<string, string>` or `Record<string, string>` for frequent key lookups instead of repeated `find()`.
- This keeps lookup complexity O(1) and improves performance.

**Example:**
```typescript
// Good - O(1) lookup
const dropdownMap: Record<string, string> = {
  '1': 'Option 1',
  '2': 'Option 2'
};
const value = dropdownMap[key];

// Avoid - O(n) lookup
const value = dropdownList.find(item => item.id === key)?.value;
```

---

## API Guidelines (Server)

### 1. Controller Responsibilities
Controllers are the API entry point and must stay minimal.

**Pattern:**
```typescript
// controllers/AuthController.ts
export class AuthController {
  private authService: IAuthService;
  
  constructor(authService: IAuthService) {
    this.authService = authService;
  }
  
  async login(req: Request, res: Response): Promise<void> {
    const response = await this.authService.login(req.body);
    res.status(response.statusCode || 200).json(response);
  }
}
```

**Rules:**
- Do not place business logic in controllers.
- Controller method should call the service and return the service response.
- Always return proper HTTP status codes with `IResponse<T>`.

### 2. Service Layer Structure
API services reside under `services/interface` and `services/implementation`.

**Pattern:**
```typescript
// services/interfaces/IAuthService.ts
export interface IAuthService {
  login(request: LoginRequest): Promise<IResponse<LoginResponse>>;
  register(request: RegisterRequest): Promise<IResponse<RegisterResponse>>;
}

// services/implementations/AuthService.ts
export class AuthService implements IAuthService {
  async login(request: LoginRequest): Promise<IResponse<LoginResponse>> {
    try {
      const response = await this.authRepository.login(request);
      
      if (response && response.success) {
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
// Shared.API/wrappers/Response.ts
export class Response<T> {
  static Success<T>(data: T, message?: string): IResponse<T> {
    return {
      data,
      success: true,
      messages: message ? [message] : [],
      statusCode: 200
    };
  }
  
  static Fail<T>(message: string, statusCode: number = 400): IResponse<T> {
    return {
      data: null,
      success: false,
      messages: [message],
      statusCode
    };
  }
}
```

### 3. Error Handling and Logging
- Use `try-catch` around service logic.
- Log exceptions and return standardized failure responses.
- Handle specific conditions inside the success branch when needed.

**Logging:**
```typescript
// Shared.API/utils/Logger.ts
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
```typescript
// Shared.API/utils/
├── RandomUtils.ts        # OTP generation, random strings
├── ExcelUtils.ts         # Excel export/import
├── CryptoUtils.ts        # Password hashing, token verification
├── ValidationUtils.ts    # Input validation helpers
└── DateUtils.ts          # Date formatting, manipulation
```

### 5. Shared Models Across API and UI
- Use shared model folders under `Shared.API/models/` so UI and API share the same request/response DTOs.
- Do not duplicate model definitions in API or UI.
- Import: `import { LoginRequest } from 'shared-api/models/Auth/requests/LoginRequest';`

### 6. Middleware for Cross-Cutting Concerns
Use middleware for concerns like:
- IP logging
- Route/access tracking
- Login activity auditing
- Error logging
- CORS handling
- Rate limiting
- Authentication/Authorization

**Example:**
```typescript
// middleware/AuthMiddleware.ts
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // JWT validation, user context setup
};

// middleware/LoggingMiddleware.ts
export const loggingMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Log IP, route, timing
};

// server.ts app.use()
app.use(loggingMiddleware);
app.use('/api', authMiddleware);
```

### 7. Configuration via Environment Variables
- Store configuration values in `.env` or `.env.development`.
- Use `dotenv` package for environment variable management.
- Create config classes/interfaces for type safety.

**Example:**
```typescript
// config/SmtpConfig.ts
export interface SmtpConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}

// config/index.ts
export const smtpConfig: SmtpConfig = {
  host: process.env.SMTP_HOST || '',
  port: parseInt(process.env.SMTP_PORT || '587'),
  username: process.env.SMTP_USERNAME || '',
  password: process.env.SMTP_PASSWORD || ''
};
```

### 8. Utility / Helper Folder
Place reusable helpers in `Shared.API/utils/`.

**Typical utilities:**
- Random number generation (OTP code)
- Excel generation helpers
- Token hashing and verification
- Password hashing utilities (bcrypt)
- Email sending helpers
- File upload helpers

---

## Shared.API (Shared Model Projects)

### Purpose
`Shared.API` is the shared model and utility project for the solution.

**Structure:**
```
Shared.API/
├── models/
│   ├── Auth/
│   │   ├── entities/
│   │   ├── requests/
│   │   └── responses/
│   └── HRM/
│       ├── entities/
│       ├── requests/
│       └── responses/
├── wrappers/
│   ├── IResponse.ts
│   └── Response.ts
├── services/
│   └── HttpService.ts
├── utils/
│   ├── Logger.ts
│   ├── CryptoUtils.ts
│   └── ValidationUtils.ts
└── index.ts              # Main export file
```

### Rules
- Should not contain build artifacts (`node_modules`, `dist`) in source control.
- Each domain gets its own folder inside `models/`.
- Global wrapper types live in `wrappers/` (cross-domain reusable types).
- `Shared.API` contains truly global wrappers, utilities, and data access helpers.

### Model Reuse
- Do not duplicate shared models in UI or Server projects.
- Keep DTOs and shared request/response models only in domain model folders inside `Shared.API/models/`.
- Domain model folder names should match the owning business area.

---

## Database Guidelines (MongoDB)

### Shared Database Project
`Server/[Domain]/database/` contains all database-related code for each domain.

**Structure:**
```
Server/Auth.Database/
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
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
}, { timestamps: true });

UserSchema.index({ email: 1 });

export default mongoose.model<IUser>('User', UserSchema);
```

### Repository Pattern
- Implement repository pattern for data access.
- All CRUD operations go through repositories.
- Services call repositories, not direct model access.

**Example:**
```typescript
// repositories/interfaces/IUserRepository.ts
export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  create(userData: Partial<IUser>): Promise<IUser>;
  update(id: string, userData: Partial<IUser>): Promise<IUser | null>;
  delete(id: string): Promise<boolean>;
}

// repositories/implementations/UserRepository.ts
export class UserRepository implements IUserRepository {
  private userModel: Model<IUser>;
  
  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }
  
  async findByEmail(email: string): Promise<IUser | null> {
    return await this.userModel.findOne({ email }).exec();
  }
  
  async create(userData: Partial<IUser>): Promise<IUser> {
    return await this.userModel.create(userData);
  }
  
  // ... other methods
}
```

### Stored Procedures Alternative (Aggregation Pipelines)
Since MongoDB doesn't have stored procedures, use:
- Aggregation pipelines for complex queries
- Pre-defined query builders in repositories
- Service methods that encapsulate complex data operations

**Common Queries:**
- `getDropdownValues(type: string)` - For dropdown data
- `getStaticValues(category: string)` - For static configuration values

---

## Shared.Data (Data Access Layer)

### Purpose
Contains global, project-independent data utilities and wrappers.

**Contents:**
- `wrappers/` (global response wrapper types)
- `dataAccess/`
  - `http/` (HTTP client implementation)
  - `mongodb/` (MongoDB connection, helpers)
- `utils/` (truly global utilities)

### Usage
Use this folder for shared access patterns, utilities, and truly global wrapper types that can be reused across projects.

---

## Shared.UI

### Purpose
Contains global UI components reusable across applications.

### Component Structure
Each shared component should include:
- `ComponentName.tsx` (React component)
- `ComponentName.types.ts` (TypeScript interfaces/types)
- `ComponentName.css` (component styles)
- `index.ts` (export file)

### Example Components
```
Shared.UI/components/
├── Button/
│   ├── Button.tsx
│   ├── Button.types.ts
│   ├── Button.css
│   └── index.ts
├── AutoCompleteSelect/
├── Cards/
├── Tables/
├── Graph/
├── Modal/
├── FormInput/
└── index.ts              # Export all components
```

### Component Example
```typescript
// Button/Button.tsx
import React from 'react';
import { ButtonProps } from './Button.types';
import './Button.css';

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  onClick,
  disabled 
}) => {
  return (
    <button 
      className={`-button-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Button/Button.types.ts
export interface ButtonProps {
  variant?: 'primary' | 'success' | 'error' | 'warning';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
```

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
async login(request: LoginRequest): Promise<IResponse<LoginResponse>> { }

// Controller: AuthController.ts
async login(req: Request, res: Response): Promise<void> { }
```

---

## New File Flow

### UI Files
```
[Feature]/
├── FeaturePage.tsx
├── FeaturePage.logic.ts
├── FeaturePage.css
├── hooks/useFeature.ts
├── services/FeatureService.ts
└── routes/FeatureRoutes.ts
```

### API Files (Server)
```
[Domain]/
├── controllers/FeatureController.ts
├── services/interfaces/IFeatureService.ts
└── services/implementations/FeatureService.ts
```

### Shared Model Files
```
Shared.API/models/[Domain]/
├── requests/FeatureRequest.ts
└── responses/FeatureResponse.ts
```

### Database Files
```
[Domain].Database/
├── models/Feature.model.ts
└── repositories/implementations/FeatureRepository.ts
```

### Typical Flow
```
UI (Client) ↔ Shared.API/models ↔ Server (API) ↔ Database (MongoDB)
```

- When exceptions occur, add middleware or reusable components instead of duplicating logic.

---

## Build Process

### Documentation
Document each build or flow in a `docs/flow-[name].md` file.
Include the date and a clear description of what changed.

**Example:**
```markdown
# Flow: Authentication

Date: 2024-01-15
Description: Initial authentication flow implementation

Steps:
1. User submits login form (Client/Auth.Client)
2. AuthService.login() called (Shared.API)
3. Request sent to /api/auth/login (Server/Auth.Server)
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

### Backend (Server)
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **dotenv** for environment variables

### Shared
- **TypeScript** for all shared code
- **ESLint** + **Prettier** for code quality
- **Jest** for testing

---

## General Rules

1. **Follow these rules in most cases.** If an exception is required, ask before deviating.

2. **Prefer dynamic, reusable, maintainable architecture** over hardcoded or duplicated solutions.

3. **When a rule conflicts with a real requirement,** raise the issue and confirm the alternative.

4. **No external UI component libraries** - Build custom components only (no Ant Design, Material-UI, etc.).

5. **Only TailwindCSS and Pure CSS** - No other CSS frameworks or preprocessors (SASS, LESS, etc.).

6. **TypeScript for UI, JavaScript for Backend** - TSX for React components, JS/TS for Node.js backend.

7. **Keep API endpoints simple and stable** - Design APIs so they are mobile-friendly and easy to reuse.

8. **Single Responsibility Principle** - Each file/class/function should have one clear purpose.

9. **DRY (Don't Repeat Yourself)** - Extract common logic into shared utilities.

10. **Consistent naming** - Use the same names across layers for the same concepts.

---

## Quick Start Checklist

### Setup Steps:
1. Initialize monorepo structure with workspaces (npm/yarn/pnpm)
2. Set up Shared.API with models, wrappers, and utilities
3. Set up Shared.UI with base components
4. Configure Server with Express, MongoDB connection, middleware
5. Configure Client with React, TailwindCSS, routing
6. Set up environment variables (.env files)
7. Configure ESLint, Prettier, TypeScript
8. Create first domain (e.g., Auth) following the pattern
9. Test the complete flow: UI → API → Database
10. Document the flow in `docs/`

### Required Packages:

**Shared.API & Server:**
```json
{
  "dependencies": {
    "express": "^4.x",
    "mongoose": "^8.x",
    "bcrypt": "^5.x",
    "jsonwebtoken": "^9.x",
    "dotenv": "^16.x",
    "cors": "^2.x",
    "helmet": "^7.x",
    "express-rate-limit": "^7.x"
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

**Client:**
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "tailwindcss": "^3.x"
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

---

## Project Structure Summary

```
/workspace/
├── Shared.API/                 # Shared models, wrappers, utilities
│   ├── models/                 # Domain-specific models
│   ├── wrappers/               # IResponse, Response helpers
│   ├── services/               # HttpService
│   ├── utils/                  # Logger, CryptoUtils, etc.
│   └── package.json
│
├── Shared.UI/                  # Shared React components
│   ├── components/             # Reusable UI components
│   ├── styles/                 # Global styles, utilities
│   ├── hooks/                  # Shared custom hooks
│   └── package.json
│
├── Server/                     # Backend (Node.js/Express)
│   ├── Auth.Server/            # Auth domain
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── database/
│   │   └── index.ts
│   ├── HRM.Server/             # HRM domain
│   ├── middleware/
│   ├── config/
│   ├── server.ts
│   └── package.json
│
├── Client/                     # Frontend (React/TSX)
│   ├── Auth.Client/            # Auth domain
│   │   ├── pages/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── routes/
│   ├── HRM.Client/             # HRM domain
│   ├── contexts/
│   ├── App.tsx
│   ├── main.tsx
│   ├── tailwind.config.js
│   └── package.json
│
├── docs/                       # Documentation
│   ├── flow-authentication.md
│   └── flow-changes/
│
├── package.json                # Root workspace config
├── tsconfig.json               # Base TypeScript config
└── README.md
```

This architecture provides a clean, scalable, and maintainable MERN stack structure following principles similar to your .NET guidelines.
