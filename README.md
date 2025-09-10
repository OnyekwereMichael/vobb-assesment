📊 Vobb Deal Management Dashboard

A modern web platform to manage clients, products, and deals efficiently.
Built with React, Tailwind CSS, Zustand, and React Query, the dashboard integrates Kanban boards, customizable tables, authentication, and performance tracking — optimized for desktop, tablet, and mobile.

📑 Table of Contents

Overview

Features

Core Features

UI/UX Enhancements

Tech Stack

Installation

Usage

Project Structure

Future Improvements

License

🔎 Overview

This platform enables teams to:

Manage client data, products, and deals in one place

Track deals through multiple stages with Kanban boards

Visualize performance metrics with dashboards

Add, edit, and delete deals with ease

Access responsive views across devices

Authenticate users with Firebase Auth

Maintain light & dark themes consistently

It integrates modern UI components with advanced features like:
✅ Drag-and-drop Kanban
✅ Customizable tables
✅ Real-time search filtering
✅ Toast notifications

⚡ Features
Core Features

User Authentication – Firebase Auth (login, logout, profile management)

Deals CRUD – Create, update, and delete deals with live sync

Kanban View – Interactive drag-and-drop stages

Table View – Customizable columns and filtering

Responsive Design – Mobile-first with Tailwind + MUI

Profile Management – Avatar, role, and performance stats

Notifications – Real-time feedback on user actions

UI/UX Enhancements

Light/Dark themes with smooth transitions

Modern UI with Cards, Badges, Avatars, and Tables

Hero sections and onboarding visuals

Interactive dropdowns, modals, and buttons

🛠️ Tech Stack
Frontend

React 18 (with Vite)

TypeScript (optional)

Next.js (App Router) (for advanced routing setups)

Styling

Tailwind CSS

Material UI v5

Lucide Icons

State & Data

Zustand – Lightweight global state management

React Query (TanStack Query) – Data fetching, caching, mutations

Json-Server – Mock backend

Firebase Auth – Authentication & user management

Utilities

Formik + Yup – Forms & validation

Sonner – Toast notifications

Testing

Vitest – Unit testing

React Testing Library – Component rendering tests

⚙️ Installation

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

🚀 Usage

Navigate to / → Landing Page

Login to access the Dashboard

Switch between Table View and Kanban View

Add, edit, or delete deals


Toggle Light/Dark mode via theme switcher

📂 Project Structure
src/
├── components/
│   ├── ui/         # Reusable UI components (Card, Button, Table, Avatar)
│   ├── layout/     # Navbar, Sidebar, Footer
│   └── theme/      # Theme provider and context
├── pages/          # Page routes
├── lib/
│   ├── query/      # React Query hooks for data fetching
│   └── utils/      # Utility functions (helpers, formatters)
├── store/          # Zustand stores (Kanban, Preferences, ViewMode)
└── firebase/       # Firebase config & authentication

🔮 Future Improvements

Real-time updates with Firestore listeners

Team-based access control with roles & permissions

Advanced analytics dashboards (charts, KPIs)

Email notifications for important events

Integration with external CRMs/ERPs

📜 License

This project is licensed under the MIT License.

