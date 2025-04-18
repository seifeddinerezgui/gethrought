# GTAC - Accounting Agency Website

A full-stack accounting agency website built with React, Express, and PostgreSQL. The site includes multiple sections such as Solutions, International presence, Job postings, News, and Contact information.

## 📋 Features

- **Modern UI**: Built with React, Tailwind CSS, and Framer Motion animations
- **Responsive Design**: Fully responsive interface for all screen sizes
- **Database Integration**: PostgreSQL for data persistence
- **Job Application System**: Submit and track job applications
- **Contact Form**: Get in touch with the agency
- **Newsletter Signup**: Stay updated with the latest news
- **Multi-language Support**: Toggle between French/English

## 🚀 Technology Stack

- **Frontend**:
  - React with TypeScript
  - Tailwind CSS for styling
  - Framer Motion for animations
  - Wouter for routing
  - React Query for data fetching
  - Zod for type validation

- **Backend**:
  - Express.js server
  - PostgreSQL database
  - Drizzle ORM for database interactions
  - RESTful API endpoints

## 🛠️ Installation

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/gtac-accounting.git
   cd gtac-accounting
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with the following variables:

   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/gtac
   ```

   Replace the database URL with your own PostgreSQL connection string.

4. **Initialize the database**

   The application will automatically create tables and seed data on first start.

5. **Start the development server**

   ```bash
   npm run dev
   ```

   This will start both the frontend and backend servers.

6. **Access the application**

   Open your browser and navigate to `http://localhost:5000`

## 📝 Project Structure

```
/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── assets/         # Static assets
│   │   ├── components/     # UI components
│   │   │   ├── layout/     # Layout components
│   │   │   └── ui/         # UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── pages/          # Page components
│   │   ├── App.tsx         # Main application component
│   │   └── main.tsx        # Entry point
│   └── index.html          # HTML template
├── server/                 # Backend Express server
│   ├── db.ts               # Database connection
│   ├── index.ts            # Entry point
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Data storage interface
│   └── vite.ts             # Vite server integration
├── shared/                 # Shared code
│   └── schema.ts           # Database schema and types
├── drizzle.config.ts       # Drizzle ORM configuration
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## 🔧 Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the production-ready application
- `npm run start`: Start the production server
- `npm run db:push`: Push schema changes to the database

## 📱 Screenshots

[Include screenshots of the application here]

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/gtac-accounting/issues).

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.