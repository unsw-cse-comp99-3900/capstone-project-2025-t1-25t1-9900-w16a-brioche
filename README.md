# [Figma Design](https://www.figma.com/design/SruUTfQpmjBHLHvfhX8wvk/InvoiceFlow?node-id=0-1&t=18wcQwIfbpLvfWtK-1)

# [Production Website](https://invoice-flow.org)

# [Production Subdomain Website](https://myinvoiceflow.netlify.app)

# Frontend Development Guide

This guide provides the initial setup and development instructions for the frontend portion of the InvoiceFlow project.

## Prerequisites

- Ensure you have the latest version of [VS Code](https://code.visualstudio.com/) installed.
- Install the following VS Code extensions:
  - Prettier - Code formatter
  - ESLint - Integrates ESLint into VS Code
  - Tailwind CSS IntelliSense - Provides advanced features for Tailwind CSS

## Initial Setup

1. Open VS Code and install the above extensions if you haven't already.

2. Open a new terminal tab in VS Code, navigate to the backend directory using the absolute path:

   ```bash
   cd ./backend/InvoiceBackend
   dotnet run watch
   ```

   This starts the backend server and must be running before starting the frontend.

3. Open your terminal in VS Code and navigate to the frontend directory using the absolute path:

   ```bash
   cd ./frontend
   ```

   This ensures you're in the correct directory.

4. Install the project dependencies using pnpm:

   ```bash
   pnpm install
   ```

5. Start the development server:

   ```bash
   pnpm run dev
   ```

   The development server will start, and you can access the application at http://localhost:5173 (or the configured port).

   ```

   ```

## Development Guidelines

- Always use absolute paths for imports when possible. This helps maintain clarity and consistency in the codebase.
- Adhere to ESLint and Prettier rules for code quality and formatting consistency.
- Utilize Tailwind CSS classes as documented in the official [Tailwind CSS documentation](https://tailwindcss.com/docs).

# Backend Development Guide

This guide provides setup and development instructions for the backend portion of the InvoiceFlow project.

## Prerequisites

- .NET 8

- SQL Server (Recommended: SQL Server Management Studio (SSMS))

- Postman or swapper for testing API endpoints

## Initial Setup

1. Open your terminal or VS Code and navigate to the backend project directory:

   ```bash
   cd ./backend/InvoiceBackend
   ```

2. Apply database migrations using Entity Framework Core:

   ```bash
   dotnet ef database update
   ```

   if doesnt work:
   Update the connection string in appsettings.json, add your userid and password.

   ```bash
   "DefaultConnection": "Server=localhost;Database=InvoiceFlow_Db;User Id=your_user;Password=your_password;Trusted_Connection=True;TrustServerCertificate=True;Encrypt=false;Integrated Security=True;"
   ```

3. Run the backend server with hot reload:
   ```bash
   dotnet watch run
   ```

# InvoiceFlow - E-Invoicing API Platform for SMEs

## Project Overview

This project aims to develop a web application that demonstrates e-invoicing API capabilities for Small and Medium Enterprises (SMEs) by leveraging the Reckon One API and supplementing it with additional services for Australian e-invoicing standards. The application will provide a user-friendly Website that demonstrates various e-invoicing API endpoints and their functions, focusing on three main categories:

1. **Invoice Creation** - Creating invoices via Reckon One API with automatic conversion to UBL XML format
2. **Invoice Validation** - Automatically validating UBL XML invoices against Australian e-invoicing standards
3. **Invoice Sending** - Transmitting validated invoices via email and PEPPOL network

The application will serve as a SaaS solution, allowing SMEs to create, validate, and send e-invoices without the need for expensive, inflexible vendor solutions that comply with Australian standards.

## Core Purpose

The core purpose of this application is to:

- Demonstrate the functionality of e-invoicing APIs through an intuitive GUI
- Show how Reckon One API can be integrated with UBL XML conversion for Australian standards
- Provide automated validation against Australian e-invoicing standards
- Demonstrate invoice sending via email and PEPPOL network
- Provide a reference implementation for SMEs considering e-invoicing solutions

1. **Technology Stack**

   - Frontend: React.js with ShadcnUI and tailwindCss
   - Backend: DotNet Web API
   - Database: MS-SQL
   - Authentication: Clerk

2. **API Integration**

   - Primary: Reckon One API for invoice creation and email sending
   - Secondary: ESS Validator for validation against Australian standards
   - Tertiary: Storecove API for PEPPOL network integration

3. **Development Timeline (6 weeks)**

   - Week 1: Project setup, authentication, and basic UI
   - Week 2: Reckon One API integration and invoice creation
   - Week 3: UBL XML conversion implementation
   - Week 4: Invoice validation integration
   - Week 5: Email and PEPPOL sending implementation
   - Week 6: Dashboard, testing, and bug fixes

## Running the Application with Docker (Recommended for Testing)

This setup uses Docker Compose to run the frontend, backend, and database in containers for a consistent testing environment across different operating systems.

**Prerequisites:**

- Docker Desktop installed and running.

**Steps:**

1.  **Open a terminal or command prompt** in the root directory of the project (where `docker-compose.yml` is located).

2.  **Build and start the containers:**

    ```bash
    docker-compose up --build
    ```

    - Use `docker-compose up -d --build` to run in detached (background) mode.
    - The first build might take some time as it downloads images and builds the applications.

3.  **Wait for services to be ready:** Observe the logs in your terminal (if not running in detached mode). Look for messages indicating:

    - Backend migration completion (`Migration successful. Starting application...`)
    - Backend application start (`Now listening on: ...`, `Application started.`)
    - Frontend Nginx start (usually logs requests or shows Nginx process started).
    - Backend started. Access frontend at: https://localhost:5173/ （`This message show final success `）

4.  **Access the application:** Once the services appear to be ready, open your web browser and navigate to:

    **https://localhost:5173/**

5.  **Accept Self-Signed Certificates:** Your browser will likely show security warnings for both the frontend (`https://localhost:5173`) and potentially for backend connections made by the frontend (due to the self-signed certificates generated for HTTPS). You will need to accept the security risk to proceed.

6.  **Stopping the application:**
    - If running in the foreground, press `Ctrl + C` in the terminal.
    - If running in detached mode, run: `docker-compose down`
    - To remove the database volume (and all its data), run: `docker-compose down -v`

## Local Development Setup (Without Docker)

# ... (Keep existing local development instructions here) ...

## Database Seeding

Seed data (e.g., the initial Reckon token) is applied automatically when running database migrations (both locally via `dotnet ef database update` and during Docker startup).

## Troubleshooting

- **Port Conflicts:** If you get errors about ports (e.g., 5173, 5080, 1434) being already allocated, ensure no other applications or Docker containers are using these ports on your host machine.
- **Database Connection Issues (Docker):** If the backend fails to connect to the database:
  - Ensure Docker Desktop has sufficient resources (RAM, CPU).
  - Try stopping and removing the volume: `docker-compose down -v` followed by `docker-compose up --build`.
  - Check logs (`docker-compose logs backend` and `docker-compose logs db`).
- **CORS Errors:** Ensure the backend CORS policy (`Program.cs`) correctly allows the frontend origin (`https://localhost:5173`) and allows credentials if needed.
