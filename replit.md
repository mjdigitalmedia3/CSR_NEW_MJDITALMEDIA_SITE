# MJ Digital Media - Professional Digital Agency Website

## Overview

MJ Digital Media is a professional digital agency website serving as both a company showcase and client lead capture system. The site offers web design, website development, SEO, social media marketing, branding, and full digital marketing services for businesses.

The system provides a conversion-focused homepage with agency services, about section, testimonials, and strong CTAs. It includes a client dashboard with key metrics, a searchable/filterable lead list, detailed lead views with status management, a portfolio showcase, and a comprehensive project inquiry form capturing requirements, budgets, timelines, and feature needs.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **Component Library**: shadcn/ui (Radix UI primitives with custom styling)
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite

The frontend follows a page-based architecture with shared components. Pages are located in `client/src/pages/` and include Home, Dashboard, Clients list, Client detail, and Submit (lead form). The UI components in `client/src/components/ui/` are shadcn/ui components configured for the "new-york" style.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful JSON API under `/api` prefix
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Validation**: Zod schemas shared between client and server

The server uses a simple storage layer pattern (`server/storage.ts`) that abstracts database operations. Routes are registered in `server/routes.ts` and handle CRUD operations for clients and statistics endpoints.

### Data Model
The core data entities are:
- **Users**: Basic authentication structure (id, username, password)
- **Clients**: Lead records with contact info, project details, budget, timeline, features, requirements, and status

Client status workflow: New → Contacted → In Progress → Converted/Archived

### Shared Code
The `shared/` directory contains schema definitions (`schema.ts`) using Drizzle ORM table definitions and Zod schemas derived via `drizzle-zod`. This enables type-safe validation on both client and server with a single source of truth.

### Theme System
The application supports light and dark modes via CSS variables and a ThemeProvider context. Theme preferences persist in localStorage.

## External Dependencies

### Database
- **PostgreSQL**: Primary database, configured via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema management and queries
- **Drizzle Kit**: Database migrations via `db:push` command

### UI/Component Libraries
- **Radix UI**: Accessible primitive components (dialogs, dropdowns, forms, etc.)
- **shadcn/ui**: Pre-styled component collection built on Radix
- **Lucide React**: Icon library
- **date-fns**: Date formatting utilities
- **embla-carousel-react**: Carousel component
- **class-variance-authority**: Component variant management
- **tailwind-merge/clsx**: Class name utilities

### Development
- **Vite**: Frontend build and dev server with HMR
- **esbuild**: Server bundling for production
- **tsx**: TypeScript execution for development
- **Replit plugins**: Development banner and cartographer for Replit environment

## Recent Changes (January 2026)

- Complete homepage rewrite with conversion-focused agency content (Hero, About, Services, Why Choose Us, Process, Testimonials, CTA sections)
- Added comprehensive data-testid attributes to all interactive elements and display content for automated testing
- Enhanced PATCH /api/clients/:id endpoint with proper Zod schema validation using updateClientSchema
- All API endpoints now validate request bodies with shared Zod schemas for type safety
- Red/black color scheme with Material Design 3-inspired dark theme aesthetic
- Portfolio with image/video upload, lightbox modal, and Framer Motion animations

## Key Features

1. **Landing Page**: Conversion-focused homepage with Hero, About MJ Digital Media, Services (6 service offerings), Why Choose Us, How We Work process, Client Testimonials, and Final CTA sections
2. **Lead Submission Form**: Captures contact info, project type, budget, timeline, features, and requirements
3. **Dashboard**: Real-time statistics with charts showing lead distribution by status
4. **Client List**: Searchable, filterable list with status badges
5. **Client Detail**: Full client info with inline status management and delete functionality
6. **Portfolio**: Showcase with image/video upload, visibility controls, and lightbox modal
7. **Dark Mode**: Full theme support with toggle in header, dark theme by default

## API Endpoints

- `GET /api/clients` - List all clients
- `POST /api/clients` - Create new client (validated with insertClientSchema)
- `GET /api/clients/:id` - Get single client
- `PATCH /api/clients/:id` - Update client (validated with updateClientSchema)
- `DELETE /api/clients/:id` - Delete client
- `GET /api/stats` - Dashboard statistics