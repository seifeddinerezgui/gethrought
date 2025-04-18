# GTAC Accounting Agency Website

A full-stack accounting agency website built with React, Tailwind CSS, and Express with PostgreSQL integration.

![GTAC Logo](client/src/assets/logo.png)

## Features

- Responsive design using Tailwind CSS and Shadcn UI components
- Modern UI animations with Framer Motion
- Multi-page layout with 5 key sections:
  - Nos solutions (Services)
  - À l'international (International)
  - Nous rejoindre (Join Us/Careers)
  - Actualités (News)
  - Contact
- Job application form
- Database integration with PostgreSQL using Drizzle ORM
- Server-side rendering with Express

## Tech Stack

- **Frontend**: React, Tailwind CSS, Framer Motion, Wouter for routing
- **Backend**: Express, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: TanStack Query (React Query)

## Installation

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL database

### Clone the Repository

```bash
git clone https://github.com/yourusername/gtac-website.git
cd gtac-website
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL=postgresql://username:password@localhost:5432/gtac_db
```

### Database Setup

The application will automatically set up the database schema and seed initial data when it first runs. Make sure your PostgreSQL server is running and accessible using the connection string in the DATABASE_URL environment variable.

### Run the Application

```bash
npm run dev
```

The application will be available at http://localhost:5000.

## Project Structure

- `client/` - Frontend React application
  - `src/assets/` - Static assets (images, icons)
  - `src/components/` - Reusable UI components
  - `src/hooks/` - Custom React hooks
  - `src/lib/` - Utility functions
  - `src/pages/` - Page components
- `server/` - Backend Express server
  - `db.ts` - Database connection
  - `routes.ts` - API routes
  - `storage.ts` - Data access layer
- `shared/` - Shared code between frontend and backend
  - `schema.ts` - Database schema and validation

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or inquiries, please contact us at contact@gtac.com.