# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Evergreen Link is a digital business card web application built with React and Vite. The application provides a mobile-first interface for displaying business contact information and product catalogs, designed specifically for Korean manufacturing businesses (e.g., factories in Ansan industrial area).

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Tech Stack

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: TailwindCSS 3.4.19 with Autoprefixer
- **Icons**: lucide-react
- **Linting**: ESLint 9 with flat config

## Architecture

### Component Structure

The application has a simple, single-component architecture:

- **src/main.jsx**: Entry point that renders the app with React StrictMode
- **src/App.jsx**: Root component that renders EvergreenCard
- **src/EvergreenCard.jsx**: Main component containing all business logic and UI
  - Implements a tab-based interface with two views: "명함" (Business Card) and "카탈로그" (Catalog)
  - Uses React useState for tab state management
  - Contains embedded sample data for profile and products
  - Mobile-first design with responsive containers

### Key Features in EvergreenCard Component

1. **Business Card Tab**: Displays contact information with large, accessible buttons for calling and saving contacts
2. **Catalog Tab**: Grid layout showcasing products/services with emoji placeholders
3. **Share Functionality**: Share button in header (currently shows alert, designed for navigator.share API)
4. **Fixed Bottom Navigation**: Tab switcher that remains visible while scrolling

### Design Principles

- **Target Audience**: Designed for ease of use by older Korean manufacturing business owners
- **Color Scheme**: Evergreen green (#166534) as primary color for trust and reliability
- **Typography**: Large, readable text with Korean language support
- **Interaction**: Large touch targets for accessibility
- **Responsiveness**: Full mobile viewport on mobile, contained card layout on desktop (sm: breakpoint)

## ESLint Configuration

The project uses ESLint flat config (eslint.config.js):
- Ignores `dist` directory
- React Hooks rules enforced
- React Refresh plugin configured for Vite HMR
- Custom rule: `no-unused-vars` allows uppercase and underscore-prefixed variables

## Styling

TailwindCSS is configured to scan all HTML and JSX/TSX files in the src directory. PostCSS is set up with Tailwind and Autoprefixer plugins.

## File Organization

```
src/
├── main.jsx          # React app initialization
├── App.jsx           # Root component wrapper
├── EvergreenCard.jsx # Main application component
├── index.css         # Global styles with Tailwind directives
├── App.css           # Additional component styles
└── assets/           # Static assets
```

## Notes

- The application is currently a single-page prototype with hardcoded sample data
- Phone call and contact save features use browser APIs (`tel:` protocol and alerts)
- Icons are currently emojis; can be replaced with actual images via img tags
- Korean language is used throughout the UI
