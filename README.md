# Project Overview

This is a monorepo project that contains a backend application built with **NestJS** and a frontend application using **React** and **Vite**. The structure of the project is organized to separate the concerns of the backend and frontend while allowing for easy management and development.

## Backend Architecture

The backend is developed using **Domain-Driven Design (DDD)** principles, which helps in managing complex business logic by structuring the application around the core domain. In this project, **MongoDB** is utilized as the database to store and manage data. The choice of MongoDB complements the DDD approach by allowing for flexible schema definitions and efficient handling of data entities.

### Key Features of the Backend:

- **Modular Structure**: The application is divided into modules based on DDD principles, making it easier to manage and scale.
- **Services and Repositories**: Each domain entity is encapsulated within its own service and repository, promoting clean separation of concerns.
- **DTOs and Value Objects**: Data Transfer Objects (DTOs) and Value Objects are used to enforce type safety and ensure clear communication between different parts of the application.

## Project Structure

```plaintext
├── apps
│   ├── backend
│   │   ├── dist                   # Compiled files
│   │   ├── node_modules           # Backend dependencies
│   │   ├── package.json            # Backend package file
│   │   ├── README.md               # Backend README
│   │   ├── src                    # Source files for backend
│   │   │   ├── application         # Application logic
│   │   │   ├── config              # Configuration files
│   │   │   ├── domain              # Domain entities and repositories
│   │   │   ├── infrastructure       # Infrastructure modules
│   │   │   ├── main.ts             # Entry point for the backend
│   │   │   └── presentation         # Controllers and presentation logic
│   │   └── test                   # Tests for backend
│   └── frontend
│       ├── node_modules           # Frontend dependencies
│       ├── package.json            # Frontend package file
│       ├── README.md               # Frontend README
│       ├── src                    # Source files for frontend
│       │   ├── assets              # Static assets
│       │   ├── components          # React components
│       │   ├── hooks               # Custom hooks
│       │   ├── services            # API services
│       │   └── store               # State management
├── docker-compose.dev.yml          # Development Docker Compose file
├── docker-compose.yml               # Production Docker Compose file
├── Dockerfile                       # Dockerfile for the application
├── package.json                     # Root package file
├── pnpm-lock.yaml                   # PNPM lock file
└── pnpm-workspace.yaml              # PNPM workspace configuration
```

## Getting Started

### Installation

- Clone the repository:

```
git clone https://github.com/ferhateroglu/react-nest-monorepo
cd react-nest-monorepo
```

### Environment Configuration

Before running the project in production, you need to set up the environment variables.

1. Rename the `.env.example` file to `.env.production`:

```bash
mv .env.example .env.production
```

### Running the Project in Production

```
pnpm run docker:up:prod
```

That's all! Now your project is running.
