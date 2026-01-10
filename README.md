# Gallery Plus

A modern photo gallery application built with React, TypeScript, and Tailwind CSS as part of the Rocketseat React course to enhance React development skills.

![Gallery Plus](https://img.shields.io/badge/React-19.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4)
![License](https://img.shields.io/badge/license-MIT-green)

## 📖 About

Gallery Plus is a comprehensive photo management application that allows users to organize their photos into albums, search through their collection, and manage their image library efficiently. This project was developed as part of Rocketseat's React course, focusing on modern React patterns, state management, and UI/UX best practices.

> [!NOTE]
> The backend server was provided by Rocketseat as a foundation for the frontend development. This README focuses primarily on the React frontend implementation.

## ✨ Features

- **Photo Management**
    - Upload photos with drag-and-drop support
    - Add titles and descriptions to photos
    - Delete photos from the gallery
    - Navigate between photos with next/previous controls

- **Album Organization**
    - Create custom albums
    - Add photos to multiple albums
    - Filter photos by album
    - View album details with photo counts

- **Search & Filter**
    - Real-time search across all photos
    - Filter photos by album
    - Debounced search for better performance

- **Modern UI/UX**
    - Responsive design for all screen sizes
    - Loading states with skeleton screens
    - Toast notifications for user feedback
    - Modal dialogs for photo and album creation
    - Image preview before upload

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/letyrsl/gallery-plus.git
cd gallery-plus
```

2. Install dependencies:

```bash
pnpm install
```

### Running the Application

You'll need to run both the backend server and the frontend development server.

1. **Start the backend server** (in one terminal):

```bash
pnpm dev-server
```

The server will start at `http://localhost:5799`

2. **Start the frontend development server** (in another terminal):

```bash
pnpm dev
```

The application will open at `http://localhost:5173`

## 📦 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── button.tsx
│   ├── dialog.tsx
│   ├── input-text.tsx
│   └── ...
├── contexts/         # Feature-specific contexts
│   ├── albums/       # Album-related components and hooks
│   └── photos/       # Photo-related components and hooks
├── pages/            # Application pages
│   ├── page-home.tsx
│   └── page-photo-details.tsx
├── helpers/          # Utility functions
└── assets/           # Static assets (icons, images)
```

## 🛠️ Built With

### Frontend Technologies

- **[React 18.3](https://react.dev/)** - UI library
- **[TypeScript 5.6](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Styling
- **[React Router v7](https://reactrouter.com/)** - Routing
- **[TanStack Query](https://tanstack.com/query)** - Data fetching and caching
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Zod](https://zod.dev/)** - Schema validation
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI components
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[Axios](https://axios-http.com/)** - HTTP client

### Development Tools

- **[Vite](https://vitejs.dev/)** - Build tool
- **[ESLint](https://eslint.org/)** - Linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript linting

## 🔧 Configuration

Environment variables can be configured in a `.env` file:

```env
VITE_API_URL=http://localhost:5799
VITE_IMAGES_URL=http://localhost:5799/images
```

## 📄 License

This project is part of the Rocketseat React course and is intended for educational purposes.
