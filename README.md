# Stride: Personal Health & Fitness Dashboard

## Overview

Stride is a modern, customizable health and fitness tracking dashboard built with React. It provides users with a comprehensive overview of their health metrics, activity data, and workout history in a visually appealing and intuitive interface.

Stride aims to centralize health and fitness data in a single, customizable platform that adapts to individual user preferences.

**Note: This is a frontend-only application that uses mock data.** It was created for the Frontend UI Hackathon 2025, hosted by Outlier AI, and developed in just 2-3 days.

## Features

### Customizable Dashboard

- **Drag-and-drop widgets**: Users can rearrange dashboard widgets to create a personalized view
- **Responsive layout**: Automatically adapts to different screen sizes (desktop, tablet, mobile)
- **Layout persistence**: Widget positions are saved to localStorage and restored on return visits

### Health & Activity Tracking

- **Activity rings**: Track daily movement, exercise, and standing goals similar to Apple Health
- **Step counter**: Monitor daily step count with historical data
- **Distance tracker**: Track walking/running distance metrics
- **Heart rate monitoring**: Visualize heart rate data throughout the day
- **Health trio**: Combined view of key health metrics (sleep, weight, etc.)

### Workout Management

- **Workout logging**: Record and categorize different types of workouts
- **Workout statistics**: View aggregated data on workout frequency, duration, and calories
- **Filtering capabilities**: Filter workouts by type (walking, strength training, cycling, mind & body)
- **Date range selection**: View workout data by day, week, month, or year

### Data Visualization

- **Interactive charts**: Rich data visualization using Recharts library
- **Detailed breakdowns**: Drill down into metrics for more detailed analysis
- **Progress tracking**: Monitor improvements over time

## Technical Stack

### Frontend

- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: TanStack Router (formerly React Router)
- **State Management**: Zustand
- **UI Components**:
  - Radix UI (accessible component primitives)
  - Align UI components built on Radix
- **Styling**: Tailwind CSS
- **Icons**: Remix Icons (@remixicon/react)
- **Date Handling**: date-fns
- **Charts & Visualization**: Recharts
- **Grid Layout**: react-grid-layout for draggable dashboard widgets

### Development Tools

- **Package Manager**: Bun (preferred over npm)
- **Linting**: ESLint
- **Code Formatting**: Prettier with import sorting
- **TypeScript**: Partial TypeScript support

## Project Structure

```
stride/
├── src/
│   ├── assets/          # Static assets like images and icons
│   ├── components/      # Reusable UI components
│   │   ├── shared/      # Shared components used across features
│   │   ├── ui/          # Base UI components
│   │   └── widgets/     # Dashboard widget components
│   ├── data/            # Mock data and data utilities
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility libraries
│   ├── routes/          # Application routes
│   ├── store/           # Global state management
│   └── utils/           # Utility functions
├── public/              # Public static files
└── ...config files      # Various configuration files
```

## Key Design Decisions

### Widget-Based Architecture

The dashboard is built around a widget system that allows for maximum flexibility. Each widget is a self-contained component that can be positioned anywhere on the grid.

### Persistent User Preferences

User customizations, including widget layouts, are stored in localStorage using the key 'stride-widget-layouts', ensuring that user preferences persist across sessions.

### Responsive Design

The application uses a responsive grid layout that adapts to different screen sizes, with specific layouts defined for large (lg), medium (md), and small (sm) viewports.

### Component Modularity

UI components are built with modularity in mind, using composition patterns from Radix UI and custom component design to ensure reusability and maintainability.

## Getting Started

### Prerequisites

- Node.js (v18+) or Bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd stride

# Install dependencies (using Bun)
bun install

# Start the development server
bun dev
```

### Building for Production

```bash
bun build
```
