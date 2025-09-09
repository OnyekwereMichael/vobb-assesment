Table of Contents

Overview

Features

Tech Stack

Installation

Usage

Project Structure

Future Improvements

License

Overview

This platform enables teams to:

Manage client data, products, and deals in one place

Track deals through multiple stages using Kanban boards

Visualize performance metrics with dashboards

Add, edit, and delete deals with ease

Access responsive views optimized for desktop, tablet, and mobile

Authenticate users with Firebase Auth

Maintain consistent theming (light & dark modes) across the app

It integrates modern UI components with advanced features like drag-and-drop Kanban, customizable tables, real-time search filtering, and notifications.

Features
Core Features

User Authentication: Firebase Authentication for login, logout, and profile management

Deals CRUD: Create, update, and delete deals with live data

Kanban View: Drag-and-drop deal stages, fully interactive

Table View: Customizable columns and filtering

Responsive Design: Mobile-first design using Tailwind CSS and Material UI components

Profile Management: View and edit profile info including avatar, role, and stats

Notifications: Real-time toast alerts for actions like creating, updating, or deleting deals


UI/UX Enhancements

Light and Dark themes with seamless transitions

Modern design with Cards, Badges, Avatars, and Tables

Hero sections and onboarding visuals

Interactive components such as dropdown menus, modals, and buttons

Tech Stack

Frontend: React, Next.js (App Router), TypeScript (optional)

Styling: Tailwind CSS, Material UI (MUI v5), Lucide Icons

State Management: Zustand (Kanban & Preferences stores)

Backend / Data Fetching: Firebase Auth, Json-Server, React Query

Utilities: Formik + Yup (forms & validation), Sonner (notifications)

Testing: Vitest for unit testing

Installation

Clone the repository:

git clone https://github.com/OnyekwereMichael/vobb-assesment.git


Install dependencies:

npm install
# or
yarn install




Run the project locally:

npm run dev
# or
yarn dev

Usage

Navigate to / to view the landing page

After login, access the Dashboard to view deals

Switch between Table View and Kanban View

Add, edit, or delete deals

Track performance metrics in the Profile section

Toggle themes via the theme switcher

Project Structure
src/
├── components/
│   ├── ui/           # Reusable UI components (Card, Button, Table, Avatar)
│   ├── layout/       # Navbar, Sidebar, Footer
│   └── theme/        # Theme provider and context
├── pages/           
├── lib/
│   ├── query/        # React Query hooks for data fetching
│   └── utils/        # Utility functions
├── store/            # Zustand stores (Kanban, Preferences, ViewMode)
└── firebase/         # Firebase configuration and auth

Future Improvements

Real-time updates with Firestore listeners

Team-based access and roles

Advanced analytics and charting dashboards

Email notifications and alerts

Integration with external CRMs or ERP systems

License

This project is MIT licensed.