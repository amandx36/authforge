# NextAuth: Full-Stack Authentication System

A production-ready, full-stack authentication system built with Next.js App Router, TypeScript, and MongoDB. Implements JWT-based authentication with email verification, password management, profile handling, and role-based access control.

---

## Overview

NextAuth is an enterprise-grade authentication and user management platform designed to provide secure, scalable user authentication for modern web applications. The system combines client-side React components with server-side API routes to deliver a complete authentication workflow including user registration, email verification, password recovery, profile management, and administrative dashboard access.

The application solves the critical need for secure user authentication and authorization by implementing industry-standard practices: bcrypt password hashing, JWT tokens, HTTP-only cookies, email verification, and middleware-based route protection. It's designed to be immediately deployable to production environments while maintaining flexibility for customization.

---

## Key Features

### Authentication

- **User Registration** – Create new accounts with email and password
- **Email Verification** – Time-limited verification tokens sent via email
- **User Login** – Secure login with JWT token generation and HTTP-only cookie storage
- **User Logout** – Clear authentication tokens and session data
- **JWT Authentication** – Token-based authentication with 1-hour expiration
- **Protected Routes** – Middleware-based route protection with automatic redirection
- **Role-Based Access Control** – Support for USER and ADMIN roles with separate dashboards

### Password Management

- **Forgot Password** – Request password reset via email
- **Reset Password** – Update password using time-limited reset tokens
- **Change Password** – Change password while authenticated
- **Password Hashing** – bcryptjs with salt rounds for secure storage

### User Profile Management

- **User Profile** – View authenticated user details
- **Profile Picture Upload** – Upload and store profile images on Cloudinary
- **Update Username** – Modify username while authenticated
- **Delete Account** – Permanently delete user account and associated data
- **Profile Image Cleanup** – Automatic removal of previous images on update or account deletion

### Security

- **HTTP-Only Cookies** – Secure token storage preventing XSS attacks
- **CORS Protection** – Secure same-site cookie policy (lax mode)
- **Environment-Based Security** – Conditional secure flag for production deployments
- **Password Hashing** – bcryptjs with 10-round salt
- **Token Validation** – Middleware verification of JWT signatures
- **Route Protection Middleware** – Server-side route access control

### Backend Infrastructure

- **MongoDB Integration** – NoSQL database with Mongoose ODM
- **API Routes** – Next.js server-side API endpoints
- **Email Service Integration** – Resend email provider for transactional emails
- **Cloud Image Storage** – Cloudinary integration for profile pictures
- **Database Connection Management** – Mongoose connection pooling

### Frontend User Experience

- **Responsive Design** – Mobile-first Bootstrap 5 styling
- **Dark Theme UI** – Modern dark interface with gold accents
- **Toast Notifications** – Real-time user feedback via React Hot Toast
- **Form Validation** – Client-side input validation and error handling
- **Loading States** – Visual feedback during async operations
- **Error Handling** – Comprehensive error messages from API responses

---

## Screenshots

### Login Page
[Add Screenshot Here]

### Signup Page
[Add Screenshot Here]

### Email Verification Page
[Add Screenshot Here]

### User Profile Dashboard
[Add Screenshot Here]

### Forgot Password Page
[Add Screenshot Here]

### Change Password Page
[Add Screenshot Here]

### Admin Dashboard
[Add Screenshot Here]

---

## Tech Stack

| Category | Technology |
|-----------|------------|
| Framework | Next.js 16.2.7 (App Router) |
| Language | TypeScript 5 |
| Frontend | React 19.2.4, React DOM 19.2.4 |
| Styling | Tailwind CSS 4, Bootstrap 5.3.8 |
| Backend | Node.js (Next.js API Routes) |
| Database | MongoDB 7.2.0, Mongoose 9.6.3 |
| Authentication | JWT (jsonwebtoken 9.0.3), jose 6.2.3 |
| Password Security | bcryptjs 3.0.3 |
| Email Service | Resend 6.12.4 |
| File Storage | Cloudinary 2.10.0 |
| HTTP Client | axios 1.17.0 |
| Notifications | react-hot-toast 2.6.0, react-toastify 11.1.0 |
| Build Tool | webpack (Next.js built-in) |
| Package Manager | npm |
| Linting | ESLint 9 |
| Compiler | Babel with React Compiler Plugin |

---

## System Architecture

The application follows a modern three-tier architecture pattern:

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Browser                           │
│               (React 19 Components)                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  Next.js Frontend Layer                     │
│         (App Router, Pages, Client Components)              │
│                                                             │
│  ├─ /login          (User Login Form)                      │
│  ├─ /signup         (User Registration)                    │
│  ├─ /profile        (User Dashboard)                       │
│  ├─ /admin          (Admin Dashboard)                      │
│  └─ /verify-email   (Email Verification)                   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Next.js Middleware Layer                       │
│          (Route Protection & Authentication)                │
│                                                             │
│  - JWT Token Verification (jose)                           │
│  - Role-Based Route Access Control                         │
│  - Automatic Redirection                                   │
│  - Cookie Token Extraction                                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Next.js API Routes Layer                       │
│           (Backend Business Logic & Auth)                   │
│                                                             │
│  Authentication Routes:                                    │
│  ├─ POST /api/users/signup                                 │
│  ├─ POST /api/users/login                                  │
│  ├─ POST /api/users/logout                                 │
│  ├─ POST /api/users/verify-email                           │
│                                                             │
│  Password Management:                                      │
│  ├─ POST /api/users/forgot-password                        │
│  ├─ POST /api/users/reset-password                         │
│  ├─ POST /api/users/change-password                        │
│                                                             │
│  User Management:                                          │
│  ├─ GET  /api/users/me                                     │
│  ├─ POST /api/users/change-username                        │
│  ├─ DELETE /api/users/delete-account                       │
│  ├─ POST /api/users/upload-profile                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│             External Services & Database                    │
│                                                             │
│  ├─ MongoDB Atlas        (User Data Storage)               │
│  ├─ Cloudinary           (Profile Image CDN)               │
│  ├─ Resend               (Email Service)                   │
│  └─ bcryptjs             (Password Hashing)                │
└─────────────────────────────────────────────────────────────┘
```

### Architecture Components

**Client Layer**
- React 19 components with hooks (useState, useEffect)
- Axios HTTP client for API communication
- React Hot Toast for notifications
- Bootstrap 5 and Tailwind CSS styling

**Application Layer**
- Next.js 16 App Router
- Server-side components and API routes
- TypeScript for type safety
- Environment configuration management

**Authentication Layer**
- JWT token generation and verification using jsonwebtoken and jose
- bcryptjs password hashing with 10-round salt
- HTTP-only secure cookies for token storage
- Middleware-based route protection
- Token expiration (1 hour)

**Database Layer**
- MongoDB Atlas with Mongoose ODM
- Connection pooling and error handling
- Schema validation at application level

---

## Authentication Flow

### User Registration Flow

1. **Registration Request** – User submits username, email, and password on `/signup`
2. **Email Validation** – Check if email already exists in database
3. **Password Hashing** – Generate salt (10 rounds) and hash password using bcryptjs
4. **Token Generation** – Create 32-byte hex verification token with 1-hour expiration
5. **User Creation** – Store user in MongoDB with hashed password and verification details
6. **Verification Email** – Resend service sends email with verification link containing token
7. **Redirect** – User redirected to email verification page

### Email Verification Flow

1. **Verification Link Click** – User clicks link in email with token parameter
2. **Token Retrieval** – Extract token from URL query parameter
3. **Verify Request** – Send POST request to `/api/users/verify-email` with token
4. **Token Validation** – Query database for token match with non-expired timestamp
5. **Account Activation** – Set `isVerified` to true, clear verification token fields
6. **Confirmation** – Display success message and redirect to login

### Login Process

1. **Credential Submission** – User enters email and password on `/login`
2. **User Lookup** – Query database for user by email
3. **Password Verification** – Use bcryptjs to compare submitted password with hashed value
4. **Verification Check** – Ensure user has verified email (isVerified = true)
5. **Token Creation** – Generate JWT with user ID, email, username, and role
6. **Token Settings** – Create JWT with 1-hour expiration using TOKEN_SECRET
7. **Cookie Storage** – Set HTTP-only secure cookie with token
8. **Role-Based Redirect** – Direct USER role to `/profile`, ADMIN role to `/admin/dashboard`

### Protected Route Access

1. **Request Initiated** – User navigates to protected route (`/profile`, `/admin`, etc.)
2. **Middleware Execution** – Next.js middleware intercepts request
3. **Token Extraction** – Retrieve token from cookies
4. **Token Verification** – Use jose to verify JWT signature with TOKEN_SECRET
5. **Payload Decoding** – Extract user ID, email, username, and role from JWT
6. **Route Authorization** – Check if user role has access to requested route
7. **Redirection Logic**:
   - Logged-in USER trying to access `/login` → redirect to `/profile`
   - Logged-in ADMIN trying to access `/signup` → redirect to `/admin/dashboard`
   - No token accessing protected route → redirect to `/login`
   - Non-admin user accessing `/admin` → redirect to `/profile`
8. **Request Continuation** – Authorized requests proceed to route handler

### Password Reset Flow (Forgot Password)

1. **Request Submission** – User enters email on `/forgot-password`
2. **User Lookup** – Query database for email match
3. **Token Generation** – Create 32-byte hex reset token with 1-hour expiration
4. **Database Update** – Store reset token and expiration timestamp
5. **Reset Email** – Resend sends email with reset link containing token
6. **Success Message** – Display confirmation message
7. **Link Click** – User clicks link and navigates to `/reset-password?token=...`
8. **Password Update** – Submit new password with token to `/api/users/reset-password`
9. **Token Validation** – Verify token exists and hasn't expired
10. **Password Hashing** – Hash new password with bcryptjs (10-round salt)
11. **Account Update** – Update password, clear reset token fields
12. **Redirect** – Redirect to login for re-authentication

### Password Change (While Logged In)

1. **Page Access** – Navigate to `/change-password` (protected route)
2. **Form Submission** – Enter old password and new password
3. **Token Extraction** – Get JWT from cookies via middleware verification
4. **User Lookup** – Query database by decoded user ID
5. **Old Password Verification** – Use bcryptjs to compare old password with stored hash
6. **New Password Hashing** – Hash new password with bcryptjs (10-round salt)
7. **Database Update** – Update user password field
8. **Session Termination** – Clear authentication token (logout)
9. **Redirect** – Redirect to login for re-authentication with new password

### Profile Picture Upload

1. **File Selection** – User selects image file on `/profile`
2. **File Validation** – Check file size (max 5MB)
3. **FormData Preparation** – Create FormData with image file
4. **Upload Request** – Send POST to `/api/users/upload-profile` with FormData
5. **Token Verification** – Extract and verify JWT from request
6. **Buffer Conversion** – Convert uploaded file to Buffer
7. **Cloudinary Upload** – Upload to Cloudinary with `profile-images` folder
8. **Response Parsing** – Extract secure URL and public ID from Cloudinary response
9. **Previous Image Cleanup** – Delete old Cloudinary image if exists using public_id
10. **Database Update** – Store new profileImage URL and profileImageId
11. **Frontend Update** – Fetch updated user data and display new profile picture

### Account Deletion

1. **Delete Request** – User initiates deletion from `/profile`
2. **Password Confirmation** – Enter password to confirm deletion
3. **Token Verification** – Extract JWT from cookies
4. **User Lookup** – Query database by decoded user ID
5. **Password Verification** – Use bcryptjs to confirm submitted password
6. **Cloudinary Cleanup** – Delete profile image from Cloudinary using public_id
7. **Database Deletion** – Remove user document from MongoDB
8. **Session Termination** – Clear authentication token
9. **Redirect** – Redirect to login page

---

## Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   └── dashboard/
│   │   │       └── page.tsx              # Admin dashboard (role-protected)
│   │   ├── api/
│   │   │   └── users/
│   │   │       ├── signup/
│   │   │       │   └── route.ts          # User registration endpoint
│   │   │       ├── login/
│   │   │       │   └── route.ts          # User login endpoint
│   │   │       ├── logout/
│   │   │       │   └── route.ts          # Clear authentication token
│   │   │       ├── me/
│   │   │       │   └── route.ts          # Get current user profile
│   │   │       ├── verify-email/
│   │   │       │   └── route.tsx         # Email verification endpoint
│   │   │       ├── forgot-password/
│   │   │       │   └── route.ts          # Request password reset
│   │   │       ├── reset-password/
│   │   │       │   └── route.ts          # Update password with reset token
│   │   │       ├── change-password/
│   │   │       │   └── route.ts          # Change password (authenticated)
│   │   │       ├── change-username/
│   │   │       │   └── route.ts          # Update username
│   │   │       ├── delete-account/
│   │   │       │   └── route.ts          # Delete user account
│   │   │       └── upload-profile/
│   │   │           └── route.ts          # Upload profile picture
│   │   ├── change-password/
│   │   │   └── page.tsx                  # Change password form (protected)
│   │   ├── change-username/
│   │   │   └── page.tsx                  # Update username form (protected)
│   │   ├── delete-account/
│   │   │   └── page.tsx                  # Delete account confirmation (protected)
│   │   ├── forgot-password/
│   │   │   └── page.tsx                  # Password reset request form
│   │   ├── login/
│   │   │   └── page.tsx                  # User login form
│   │   ├── profile/
│   │   │   └── page.tsx                  # User profile dashboard (protected)
│   │   ├── reset-password/
│   │   │   └── page.tsx                  # Password reset form
│   │   ├── signup/
│   │   │   └── page.tsx                  # User registration form
│   │   ├── verify-email/
│   │   │   └── page.tsx                  # Email verification status
│   │   ├── dbConfig/
│   │   │   └── dbConfig.ts               # MongoDB connection setup
│   │   ├── model/
│   │   │   └── userModal.js              # User schema definition
│   │   ├── layout.tsx                    # Root layout with Toaster
│   │   └── page.tsx                      # Home page
│   ├── helper/
│   │   ├── cloudinary.ts                 # Cloudinary configuration
│   │   ├── enums.tsx                     # MailTypes and UserRole enums
│   │   ├── getDataFromToken.ts           # JWT token extraction from cookies
│   │   └── mailer.ts                     # Email sending service (Resend)
│   ├── feature/                          # Feature modules (extensible)
│   └── middleware.ts                     # Route protection middleware
├── public/                               # Static assets
├── next.config.ts                        # Next.js configuration
├── tsconfig.json                         # TypeScript configuration
├── postcss.config.mjs                    # PostCSS configuration
├── eslint.config.mjs                     # ESLint configuration
├── package.json                          # Dependencies and scripts
├── package-lock.json                     # Locked dependency versions
└── README.md                             # This file
```

### Key Folders Explained

**`src/app/api/users/`**
All backend API endpoints for user operations. Each subfolder represents a specific endpoint with its route handler.

**`src/helper/`**
Utility functions and service configurations:
- `getDataFromToken.ts` – Extracts and verifies JWT from request cookies
- `mailer.ts` – Resend integration for email delivery
- `cloudinary.ts` – Image upload and storage configuration
- `enums.tsx` – Centralized enum definitions for mail types and user roles

**`src/app/model/`**
MongoDB schema definitions using Mongoose. The User model defines all fields for user records.

**`src/app/dbConfig/`**
Database connection management with Mongoose, including error handling and connection lifecycle.

**`src/middleware.ts`**
Next.js middleware for route protection. Validates JWT tokens, verifies user roles, and redirects unauthorized requests.

---

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required | Body Parameters |
|--------|----------|-------------|---|---|
| POST | `/api/users/signup` | User registration | No | `username`, `email`, `password` |
| POST | `/api/users/login` | User login | No | `email`, `password` |
| POST | `/api/users/logout` | Clear authentication | Yes | (none) |
| GET | `/api/users/me` | Get current user profile | Yes | (none) |

### Email & Password Management

| Method | Endpoint | Description | Auth Required | Body Parameters |
|--------|----------|-------------|---|---|
| POST | `/api/users/verify-email` | Verify email with token | No | `token` |
| POST | `/api/users/forgot-password` | Request password reset | No | `email` |
| POST | `/api/users/reset-password` | Reset password with token | No | `token`, `password` |
| POST | `/api/users/change-password` | Change password (authenticated) | Yes | `oldPassword`, `newPassword` |

### User Profile Management

| Method | Endpoint | Description | Auth Required | Body Parameters |
|--------|----------|-------------|---|---|
| POST | `/api/users/change-username` | Update username | Yes | `username` |
| DELETE | `/api/users/delete-account` | Delete account permanently | Yes | `password` |
| POST | `/api/users/upload-profile` | Upload profile picture | Yes | FormData: `image` (File) |

### Response Codes

- **200** – Request successful
- **400** – Bad request (validation error, invalid credentials, email already exists)
- **401** – Unauthorized (invalid or missing token)
- **404** – Resource not found (user not found, invalid token)
- **500** – Server error

---

## Database Design

### User Schema

| Field | Type | Description | Constraints |
|-------|------|-------------|---|
| `_id` | ObjectId | Unique document identifier | Auto-generated |
| `username` | String | User display name | Required |
| `email` | String | User email address | Required, Unique |
| `password` | String | Hashed password | Required (bcryptjs hash) |
| `role` | String (Enum) | User role | Required, Enum: `USER`, `ADMIN`, Default: `USER` |
| `profileImage` | String | Profile picture URL | Default: empty string, Cloudinary URL |
| `profileImageId` | String | Cloudinary public ID | Default: empty string, Used for image deletion |
| `isVerified` | Boolean | Email verification status | Required, Default: false |
| `verifyToken` | String | Email verification token | 32-byte hex string, Optional |
| `verifyTokenExpire` | Date | Verification token expiration | 1 hour from creation, Optional |
| `isAdmin` | Boolean | Admin flag (legacy field) | Default: false |
| `forgotPasswordToken` | String | Password reset token | 32-byte hex string, Optional |
| `forgotPasswordTokenExpire` | Date | Reset token expiration | 1 hour from creation, Optional |

### Schema Relationships

```
User Document
│
├── Basic Info
│   ├── username (String)
│   ├── email (String, unique)
│   └── password (String, bcryptjs hashed)
│
├── Role & Permissions
│   ├── role (Enum: USER, ADMIN)
│   └── isAdmin (Boolean, legacy)
│
├── Email Verification
│   ├── isVerified (Boolean)
│   ├── verifyToken (String, temporary)
│   └── verifyTokenExpire (Date, temporary)
│
├── Password Reset
│   ├── forgotPasswordToken (String, temporary)
│   └── forgotPasswordTokenExpire (Date, temporary)
│
└── Profile
    ├── profileImage (String, Cloudinary URL)
    └── profileImageId (String, Cloudinary public_id)
```

---

## Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `MONGO_URL` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `TOKEN_SECRET` | JWT signing secret | `your_long_random_secret_key` |
| `RESEND_API_KEY` | Resend email service API key | `re_xxxxxxxxxxxxxxxxxxxx` |
| `RESEND_FROM_EMAIL` | Sender email address | `noreply@yourdomain.com` |
| `NEXT_PUBLIC_APP_URL` | Application base URL (public) | `https://yourdomain.com` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account cloud name | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your_api_secret_key` |
| `NODE_ENV` | Environment type | `production` or `development` |

### Environment Variable Setup

Create a `.env.local` file in the project root:

```bash
# Database
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/database_name

# Authentication
TOKEN_SECRET=your_very_long_random_secret_key_minimum_32_characters

# Email Service (Resend)
RESEND_API_KEY=re_your_actual_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Cloud Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Runtime
NODE_ENV=development
```

---

## Local Development Setup

### Prerequisites

- Node.js 18+ and npm 9+
- MongoDB Atlas account (or local MongoDB instance)
- Cloudinary account
- Resend email service account

### Clone Repository

```bash
git clone <repository-url>
cd authentication
```

### Install Dependencies

```bash
npm install
```

### Environment Configuration

1. Create `.env.local` in project root
2. Copy all required environment variables from [Environment Variables](#environment-variables) section
3. Fill in actual values for your services

### Database Setup

1. Create MongoDB Atlas cluster or use local MongoDB
2. Obtain connection string
3. Add connection string to `MONGO_URL` in `.env.local`

### Email Service Setup

1. Create Resend account at https://resend.com
2. Generate API key from dashboard
3. Add `RESEND_API_KEY` to `.env.local`
4. Configure `RESEND_FROM_EMAIL` (verify sender email)

### Image Storage Setup

1. Create Cloudinary account at https://cloudinary.com
2. Get credentials from Account Settings
3. Add credentials to `.env.local`:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

### Start Development Server

```bash
npm run dev
```

Application starts at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

### Lint Code

```bash
npm run lint
```

---

## Project Routes & Access Control

### Public Routes (No Authentication Required)

- `/` – Home page (redirects to `/profile` if logged in)
- `/signup` – User registration
- `/login` – User login (redirects to `/profile` if already logged in)
- `/verify-email` – Email verification page
- `/forgot-password` – Password reset request
- `/reset-password` – Password reset form

### Protected Routes (Authentication Required - USER Role)

- `/profile` – User profile dashboard (redirects to `/login` if not authenticated)
- `/change-password` – Change password form
- `/change-username` – Update username form
- `/delete-account` – Account deletion page

### Protected Routes (Authentication Required - ADMIN Role)

- `/admin/dashboard` – Admin dashboard (redirects to `/profile` for non-admin users)

### Middleware Configuration

Middleware validates JWT tokens from cookies and enforces route protection:

```typescript
// Protected routes (requires authentication)
matcher: ["/", "/profile", "/admin", "/login", "/signup", "/verify-email"]

// Public routes (accessible without login)
publicRoutes: ["/login", "/signup", "/verify-email"]

// Role-based redirects
- ADMIN users cannot access /login, /signup → redirect to /admin/dashboard
- USER users cannot access /login, /signup → redirect to /profile
- Unauthenticated users cannot access protected routes → redirect to /login
- Non-admin users cannot access /admin routes → redirect to /profile
```

---

## Security Features

### Password Security

- **Hashing Algorithm** – bcryptjs with 10-round salt
- **Hash-Based Comparison** – Passwords compared using bcrypt.compare()
- **Never Stored Plain Text** – All passwords hashed before database storage
- **Verification on Login** – Password verified against stored hash

### Token Security

- **JWT Signing** – Tokens signed with TOKEN_SECRET environment variable
- **Token Expiration** – 1-hour expiration for all JWT tokens
- **HTTP-Only Cookies** – Tokens stored in HTTP-only cookies preventing JavaScript access
- **Secure Flag** – Cookies use secure flag in production (HTTPS only)
- **Same-Site Policy** – Cookies use SameSite=Lax preventing CSRF attacks

### Email Verification

- **Unique Tokens** – 32-byte random tokens generated per verification
- **Token Expiration** – 1-hour expiration window for verification links
- **One-Time Use** – Tokens cleared from database after successful verification
- **Required for Login** – Users must verify email before accessing account

### Database Security

- **Connection Pooling** – Mongoose manages connection lifecycle
- **Error Handling** – Database errors logged without exposing internals
- **Environment Secrets** – Database URI stored in environment variables
- **MongoDB Atlas** – Production deployments use MongoDB Atlas with network access controls

### File Upload Security

- **Size Validation** – Maximum 5MB file size limit
- **File Type Handling** – Cloudinary handles file validation
- **Public ID Management** – Previous images deleted on update
- **Secure Storage** – Images served from Cloudinary CDN

---

## Deployment Guide

### Vercel Deployment (Recommended)

1. Push repository to GitHub
2. Connect GitHub repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `MONGO_URL`
   - `TOKEN_SECRET`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `NEXT_PUBLIC_APP_URL`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
4. Deploy (automatic on push to main)

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY .next ./.next
COPY public ./public

EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t nextauth .
docker run -p 3000:3000 -e MONGO_URL=... -e TOKEN_SECRET=... nextauth
```

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong, unique `TOKEN_SECRET` (minimum 32 characters)
- [ ] Enable MongoDB network access controls
- [ ] Configure Cloudinary account for production
- [ ] Set up email domain verification in Resend
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS if needed
- [ ] Set up database backups
- [ ] Monitor application logs
- [ ] Configure error tracking (Sentry, etc.)
- [ ] Implement rate limiting for API endpoints
- [ ] Set up authentication audit logging

---

## Development Patterns

### Adding New API Routes

1. Create folder in `src/app/api/users/[route-name]/`
2. Create `route.ts` with handler function
3. Extract and verify JWT from cookies if protected
4. Query database using User model
5. Return NextResponse with status codes
6. Handle errors with try-catch blocks

### Adding Protected Pages

1. Create folder in `src/app/[page-name]/`
2. Create `page.tsx` as client component (`"use client"`)
3. Implement useEffect to fetch user data via `/api/users/me`
4. Add error handling and loading states
5. Middleware automatically protects route based on configuration

### Email Integration

Use the `sendVerificationEmail` helper:

```typescript
import { sendVerificationEmail } from "@/helper/mailer";
import { MailTypes } from "@/helper/enums";

await sendVerificationEmail(
  email,
  token,
  MailTypes.VERIFICATION_EMAIL // or MailTypes.RESET_PASSWORD_EMAIL
);
```

### Database Operations

Connect database in routes and use User model:

```typescript
import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/model/userModal";

connect();
const user = await User.findOne({ email });
```

---

## Troubleshooting

### Email Verification Token Expired
- Tokens valid for 1 hour from creation
- Request new verification email from signup page

### JWT Token Invalid
- Clear browser cookies and log in again
- Check TOKEN_SECRET is consistent across environments
- Verify token expiration (1 hour)

### Cloudinary Upload Fails
- Verify API credentials in `.env.local`
- Check file size (max 5MB)
- Ensure Cloudinary account is active

### MongoDB Connection Errors
- Verify MONGO_URL format
- Check network access in MongoDB Atlas
- Ensure credentials are correct
- Verify IP whitelist includes server IP

### Reset Password Link Expired
- Password reset tokens valid for 1 hour
- Request new reset from forgot-password page

---

## Performance Considerations

- **Image Optimization** – Cloudinary handles responsive image delivery
- **Database Indexing** – Email field indexed for faster lookups
- **Connection Pooling** – Mongoose manages connection pool
- **Token Expiration** – 1-hour expiration reduces token validation overhead
- **Static Generation** – Public pages use Next.js static generation
- **API Caching** – Consider implementing Redis for session caching in production

---

## Future Enhancements

- OAuth 2.0 integration (Google, GitHub)
- Two-factor authentication (2FA)
- Session management dashboard
- Login history and device tracking
- API key generation for third-party integrations
- Rate limiting on authentication endpoints
- Enhanced admin dashboard with user management
- Email notification preferences
- Dark/light theme toggle
- Internationalization (i18n)

---

## Contributing

Contributions welcome! Please:

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## License

This project is open source and available under the MIT License.

---

## Support & Contact

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review API route implementations for implementation details

---

**Generated:** June 18, 2026  
**Version:** 1.0.0  
**Status:** Production Ready
