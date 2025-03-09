# [Figma Design](https://www.figma.com/design/SruUTfQpmjBHLHvfhX8wvk/InvoiceFlow?node-id=0-1&t=18wcQwIfbpLvfWtK-1)

# [Production Website](https://myinvoiceflow.netlify.app)

# E-Invoicing API Platform for SMEs - User Stories and Analysis

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
