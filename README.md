# NSS_PROJECT

A modern, full-stack donation management platform built with Next.js 16, MongoDB, and Stripe. This application enables transparent donation processing with separate user and admin dashboards for comprehensive donation tracking and management.

![Next.js](https://img.shields.io/badge/Next.js-16.1.2-black)
![React](https://img.shields.io/badge/React-19.2.3-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)
![Stripe](https://img.shields.io/badge/Stripe-20.2.0-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-blue)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Database Schema](#database-schema)
- [API Routes](#api-routes)
- [Authentication & Authorization](#authentication--authorization)
- [Payment Integration](#payment-integration)
- [Contributing](#contributing)
- [License](#license)

## Features

### User Features
- **Secure Authentication** - Email/password authentication with NextAuth.js
- **Stripe Payment Integration** - Secure donation processing in INR
- **Personal Dashboard** - Track donation history and impact
- **Donation History** - View all past donations with status tracking
- **Profile Management** - View donation statistics and account details
- **Real-time Status Updates** - Success, pending, and failed donation tracking

### Admin Features
- **Analytics Dashboard** - Real-time statistics and insights
- **User Management** - View, manage, and promote users
- **Donation Management** - Track all donations with detailed breakdowns
- **Financial Reports** - Monthly and total donation analytics
- **Status Monitoring** - Track success, pending, and failed transactions
- **CSV Export** - Export user and donation data

### Technical Features
- **Modern UI/UX** - Beautiful, responsive design with Tailwind CSS
- **Role-based Access Control** - Separate user and admin routes
- **Server-side Rendering** - Optimized performance with Next.js 16
- **Fully Responsive** - Mobile-first design approach
- **Middleware Protection** - Route-level authentication
- **MongoDB Integration** - Efficient data storage and retrieval

## Tech Stack

### Frontend
- **Framework:** Next.js 16.1.2 (App Router)
- **UI Library:** React 19.2.3
- **Styling:** Tailwind CSS 4
- **State Management:** React Hooks

### Backend
- **Runtime:** Node.js
- **Authentication:** NextAuth.js 4.24.13
- **Database:** MongoDB with Mongoose 9.1.4
- **Payment Processing:** Stripe 20.2.0

### Security
- **Password Hashing:** bcryptjs 3.0.3
- **Session Management:** JWT (JSON Web Tokens)
- **Encryption:** crypto-js 4.2.0

## Project Structure

```
nss-project/
├── src/
│   ├── app/
│   │   ├── admin/              # Admin-only routes
│   │   │   ├── dashboard/      # Admin dashboard
│   │   │   ├── donations/      # Donation management
│   │   │   ├── overview/       # Statistics overview
│   │   │   └── users/          # User management
│   │   ├── api/                # API routes
│   │   │   ├── admin/          # Admin API endpoints
│   │   │   ├── auth/           # Authentication
│   │   │   ├── donations/      # Donation APIs
│   │   │   ├── register/       # User registration
│   │   │   ├── stripe-session/ # Stripe checkout
│   │   │   ├── confirm-donation/ # Payment confirmation
│   │   │   └── cancel-donation/  # Payment cancellation
│   │   ├── user/               # User routes
│   │   │   ├── dashboard/      # User dashboard
│   │   │   ├── donate/         # Donation page
│   │   │   │   ├── success/    # Success page
│   │   │   │   └── cancel/     # Cancel page
│   │   │   ├── history/        # Donation history
│   │   │   └── profile/        # User profile
│   │   ├── layout.js           # Root layout
│   │   ├── page.js             # Login/Register page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── AdminSidebar.js     # Admin navigation
│   │   ├── Sidebar.js          # User navigation
│   │   └── AuthProvider.js     # Session provider
│   ├── lib/
│   │   └── mongodb.js          # Database connection
│   ├── models/
│   │   ├── user.js             # User schema
│   │   └── Donation.js         # Donation schema
│   └── middleware.js           # Route protection
├── public/                     # Static assets
├── .env.local                  # Environment variables
├── next.config.mjs            # Next.js configuration
├── tailwind.config.js         # Tailwind configuration
└── package.json               # Dependencies
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20.9.0 or higher)
- **npm** or **yarn** or **pnpm**
- **MongoDB** (local or MongoDB Atlas account)
- **Stripe Account** (for payment processing)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nss-project.git
cd nss-project
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

## Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nss_project?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret-key-generate-with-openssl
NEXTAUTH_URL=http://localhost:3000

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Generating NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

### Getting Stripe Keys

1. Sign up at [stripe.com](https://stripe.com)
2. Navigate to Developers → API Keys
3. Copy your **Secret Key** (starts with `sk_test_`)

### Setting up MongoDB Atlas

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string from "Connect" → "Connect your application"
4. Replace `<password>` and `<dbname>` in the connection string

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## Database Schema

### User Schema

```javascript
{
  name: String,           // User's full name
  email: String,          // Unique email address
  password: String,       // Hashed password
  role: String,           // "user" or "admin"
  createdAt: Date,       // Auto-generated
  updatedAt: Date        // Auto-generated
}
```

### Donation Schema

```javascript
{
  name: String,           // Donor name
  email: String,          // Donor email
  amount: Number,         // Donation amount in INR
  status: String,         // "pending", "success", "failed"
  paymentId: String,      // Stripe payment ID
  createdAt: Date,       // Auto-generated
  updatedAt: Date        // Auto-generated
}
```

## API Routes

### Public Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register new user |
| POST | `/api/auth/[...nextauth]` | NextAuth handler |

### User Routes (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/stripe-session` | Create Stripe checkout |
| POST | `/api/confirm-donation` | Confirm successful payment |
| POST | `/api/cancel-donation` | Mark payment as failed |
| GET | `/api/donations/history` | Get user donation history |

### Admin Routes (Admin Only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Get platform statistics |
| GET | `/api/admin/dashboard` | Get dashboard data |
| GET | `/api/admin/users` | Get all users |
| PUT | `/api/admin/users/update-role` | Update user role |
| GET | `/api/admin/donations` | Get all donations |

## Authentication & Authorization

### User Roles

- **User**: Can donate, view history, and manage profile
- **Admin**: Full access to all features + user management

### Route Protection

Routes are protected using Next.js middleware (`src/middleware.js`):

- `/user/*` - Accessible only by users
- `/admin/*` - Accessible only by admins
- Auto-redirects based on role

### Session Management

- Sessions handled by NextAuth.js with JWT strategy
- User role stored in JWT token
- Automatic session refresh

## Payment Integration

### Stripe Workflow

1. **User initiates donation** → Creates pending donation in DB
2. **Stripe session created** → Redirects to Stripe Checkout
3. **User completes payment** → Redirected to success/cancel page
4. **Payment confirmed** → Donation status updated to "success"
5. **Payment failed/cancelled** → Donation status updated to "failed"

### Supported Currency

- **INR (₹)** - Indian Rupee

### Test Cards (Stripe Test Mode)

| Card Number | Status |
|-------------|--------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 0002 | Declined |

## Key Features Explained

### User Dashboard
- Real-time donation statistics
- Recent activity tracking
- Quick access to donate and profile

### Admin Overview
- Total users and donations
- Success/Pending/Failed breakdown
- Visual progress bars

### Donation History
- Detailed transaction records
- Date and time tracking
- Status indicators

### Security Features
- Password hashing with bcrypt
- JWT-based authentication
- Role-based access control
- Server-side session validation

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database solution
- Stripe for payment processing
- Tailwind CSS for the styling framework

---

Made with ❤️ for NSS