# Vobb Deal Management Dashboard (Atlas Module)

A professional, feature-rich deal management dashboard built for Vobb's frontend engineering assessment. This application provides comprehensive deal pipeline management with both table and Kanban views.

## 🚀 Features

### Core Functionality
- **Dual View Modes**: Switch between table and Kanban views
- **Deal Management**: Create, view, edit, and delete deals
- **Drag & Drop**: Move deals between pipeline stages in Kanban view
- **User Preferences**: Persistent column visibility and card metadata settings
- **Real-time Updates**: All views update dynamically without page refresh

### Navigation & UI
- Clean, professional navigation bar
- Responsive design for desktop and mobile
- Modern SaaS-style interface with Tailwind CSS
- Professional color scheme and animations

### State Management
- Zustand for centralized state management
- Persistent user preferences in localStorage
- Optimistic UI updates

### Mock API Integration
- Simulated API calls with loading states
- Mock data for deals, clients, and products
- Error handling and toast notifications

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui
- **Drag & Drop**: @hello-pangea/dnd
- **Routing**: React Router DOM
- **Testing**: Vitest + React Testing Library
- **Mock API**: Custom mock service (json-server ready)

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd vobb-deal-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload

# Build & Preview
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run unit tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Generate coverage report

# Linting
npm run lint         # Check code quality
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── dashboard/         # Dashboard layout components
│   ├── deals/            # Deal-specific components
│   ├── layout/           # Navigation and layout
│   └── ui/               # Reusable UI components (shadcn)
├── hooks/                # Custom React hooks
├── pages/                # Route components
├── services/             # API and data services
├── store/                # Zustand state management
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## 🎯 Key Features Implementation

### 1. Deal Dashboard Views

**Table View:**
- Sortable columns (Client Name, Product Name, Deal Stage, Created Date)
- Column visibility toggles with persistence
- Action dropdown for each deal (View/Edit/Delete)
- Professional data presentation

**Kanban View:**
- 8 pipeline stages from Lead Generated to Completed/Lost
- Drag-and-drop functionality between stages
- Card metadata visibility controls
- Stage-specific color coding

### 2. Deal Creation
- Modal form with validation
- Client and Product dropdowns (populated from mock API)
- Stage selection with default "Lead Generated"
- Optional deal value and notes
- Real-time form validation

### 3. State Management Features
- Persistent user preferences (localStorage)
- Optimistic UI updates
- Loading and error states
- Data normalization and relationships

### 4. User Experience
- Toast notifications for actions
- Loading spinners for async operations
- Confirmation dialogs for destructive actions
- Responsive design for all screen sizes
- Professional animations and transitions

## 📊 Mock Data

The application includes comprehensive mock data:
- **5 Clients**: Various company types and contact information
- **5 Products**: Different software solutions with pricing
- **8 Sample Deals**: Representing all pipeline stages
- **Realistic Relationships**: Connected clients, products, and deals

## 🧪 Testing Strategy

### Component Testing
- Unit tests for all major components
- Integration tests for user workflows
- Mock store and API interactions

### Test Coverage
- Deal creation flow
- View switching functionality
- Drag and drop operations
- User preference persistence
- Error handling scenarios

## 🎨 Design System

### Colors
- Professional blue primary palette
- Semantic color tokens for different states
- Consistent spacing and typography
- Stage-specific color coding for Kanban

### Components
- Fully customized shadcn/ui components
- Consistent design language
- Accessible and responsive design
- Professional hover states and animations

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Vercel**: Connect GitHub repository for automatic deployments
- **Netlify**: Drag and drop build folder or GitHub integration
- **Other Platforms**: Any static hosting service

### Environment Configuration
- No environment variables required
- All configuration built into the application
- Mock data included for immediate functionality

## 🔄 API Integration

The application is designed to easily integrate with a real API:

### Endpoints Structure
```
GET    /api/deals          # List all deals
POST   /api/deals          # Create new deal
PUT    /api/deals/:id      # Update deal
DELETE /api/deals/:id      # Delete deal
GET    /api/clients        # List all clients
GET    /api/products       # List all products
```

### Mock API Service
- Located in `src/services/mockApi.ts`
- Simulates network delays and responses
- Easy to replace with real API calls
- Includes error handling patterns

## 📈 Performance Features

- **Code Splitting**: Automatic route-based splitting with Vite
- **Tree Shaking**: Unused code elimination
- **Bundle Optimization**: Minimal dependencies and optimized build
- **Lazy Loading**: Dynamic imports for better performance
- **Optimistic Updates**: Immediate UI feedback for better UX

## 🛠️ Development Notes

### Code Quality
- TypeScript for type safety
- ESLint for code quality
- Consistent code formatting
- Component-based architecture

### State Management Philosophy
- Centralized state with Zustand
- Persistent user preferences
- Optimistic UI updates
- Clean separation of concerns

### Styling Approach
- Design system with semantic tokens
- No hardcoded colors or sizes
- Consistent spacing and typography
- Responsive-first design

## 🎯 Assessment Criteria Coverage

✅ **Tech Stack**: React + TypeScript + Vite + Zustand  
✅ **Features**: All required features implemented  
✅ **Views**: Table and Kanban with persistence  
✅ **CRUD Operations**: Create, Read, Update, Delete  
✅ **State Management**: Zustand with persistence  
✅ **Mock API**: Comprehensive mock service  
✅ **Styling**: Professional UI with Tailwind CSS  
✅ **Testing**: Unit and integration tests  
✅ **Documentation**: Complete setup and usage docs  
✅ **Responsive Design**: Desktop and mobile support  

## 📝 License

This project is built for Vobb's frontend engineering assessment.