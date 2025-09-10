Vobb Deal Management Dashboard - Submission
Tech Stack Used
Core Technologies

React 18 (with Vite) – Fast, modern frontend framework with optimized build

TypeScript – Type-safe development for reliability and scalability

Zustand – Lightweight, performant state management

Tailwind CSS – Utility-first CSS for styling and responsiveness

Radix UI + Shadcn – Accessible, composable UI primitives with polish

React Router DOM – Client-side routing for navigation

Vitest + React Testing Library – Unit and integration testing

Supporting Libraries

Lucide React – Icon library for a clean and consistent UI

React Query (TanStack Query) – API fetching, caching, and mutation handling

Sonner – Toast notifications

Swiper.js (for specific UI cases) – Responsive sliders/carousels

Custom Mock API / JSON Server – Simulated backend for CRUD operations

Design Decisions & Trade-offs
1. State Management

Decision: Chose Zustand for simplicity and performance.

Why: Less boilerplate than Redux, excellent for selective subscriptions, and integrates well with localStorage.

2. Styling & UI

Decision: Tailwind CSS + Radix UI components.

Why: Utility-first styling keeps the codebase consistent and fast to build, while Radix ensures accessibility and composability.

3. API & Data Layer

Decision: React Query for async data and mutations.

Why: Provides caching, background refetching, and optimistic updates out of the box.

4. Testing

Decision: Vitest with React Testing Library.

Why: Fast testing in Vite ecosystem, simple syntax, and good developer experience.

5. Search & Stats

Decision: Added a lightweight search/filtering feature and stats dashboard (React Query + Zustand powered).

Why: Improves UX by letting users find deals quickly and see key metrics at a glance.

Known Limitations / Areas for Improvement

Pagination & Performance – Lists load all data at once, could add pagination or infinite scroll.

Accessibility – Good baseline with Radix, but drag-and-drop and advanced keyboard navigation need enhancements.

Offline Support – No service workers/PWA features yet.

Testing Coverage – Unit tests for core components exist, but E2E (Playwright/Cypress) could be added.

Error Handling – More granular retry mechanisms and user-friendly error boundaries can be added.

Bonus Features Implemented

✅ Responsive Design – Works across desktop, tablet, and mobile.
✅ Search & Filtering – Quick deal lookup.
✅ Stats Dashboard – Displays KPIs and counts for deals.
✅ Toast Notifications – User feedback on all major actions.
✅ Optimistic Updates – Smooth UX when updating/deleting deals.
✅ Reusable Components – Shared UI and form components to keep code 
clean.
Auth: 
✅ Login/Signup pages with basic form validation using Formik AND Yup.
✅ Protected routes with React Router.
✅ LocalStorage persistence for user session.
✅ Implemented a simple role-based access control (RBAC) system.

Architecture Highlights

Component-driven structure with separation of features (deals/, dashboard/, ui/).

Reusable hooks for API queries (useGetDealById, useUpdateDeal, etc.).

Local state + server state balance via Zustand + React Query.

Consistent design system with Tailwind + Radix tokens.

Lazy loading & code-splitting prepared for scalability.

Deployment

Vercel used for deployment – fast, seamless Git integration, and global edge network.

Environment ready for production with optimizations from Vite.

Summary

The Vobb Deal Management Dashboard showcases:

Modern React development with TypeScript, Vite, Zustand, and React Query

Clean, responsive UI powered by Tailwind CSS, Radix UI, and Lucide icons

Robust features including search, stats, CRUD for deals, and state persistence

Testing confidence with Vitest and React Testing Library

Production readiness with error states, notifications, and deployment strategy

This implementation meets and exceeds the assessment requirements, offering a scalable and professional-grade foundation for future enhancements.