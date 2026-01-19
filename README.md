# Centum Academy - Frontend

A modern, scalable React application for Centum Academy's public viewer frontend.

## 🚀 Tech Stack

- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **API Client**: Axios
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── assets/              # Images, fonts, static files
├── components/          # Reusable UI components
│   ├── common/          # Generic components (Button, Input, Modal, Card)
│   ├── layout/          # Layout components (Navbar, Footer, AnnouncementBar)
│   └── specific/        # Feature-specific components (EnquiryForm, HeroSection)
├── context/             # Global state management (AuthContext)
├── hooks/               # Custom React hooks (useFetch, useAuth)
├── pages/               # Page components (Home, About, Login, etc.)
├── services/            # API service layer
│   ├── api.js           # Centralized Axios instance
│   ├── authService.js   # Authentication APIs
│   ├── cmsService.js    # CMS APIs (banners, testimonials)
│   └── enquiryService.js # Enquiry submission API
└── utils/               # Helper functions (validators, formatters)
```

## 🎨 Design System

### Colors
- **Primary**: `#1a73e8` (Blue)
- Tailwind extended with primary color shades (50-900)

### Components
All components are built with reusability in mind:
- **Button**: Variants (primary, outline, ghost, danger)
- **Input/Textarea/Select**: Consistent styling with error states
- **Modal**: Reusable popup component
- **Card**: Base container component

## 🔧 Setup & Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Configure Backend URL**:
   - Update `API_BASE_URL` in `src/services/api.js` if needed
   - Default: `http://localhost:8080`

3. **Run development server**:
```bash
npm run dev
```

4. **Build for production**:
```bash
npm run build
```

## 📡 API Integration

### Backend Endpoints Used:
- `GET /api/tech/announcements/all` - Fetch announcements
- `GET /api/tech/cms/banners` - Fetch hero banners
- `GET /api/tech/social/testimonials` - Fetch testimonials
- `POST /api/public/enquiry` - Submit enquiry form
- `POST /api/auth/login` - User login
- `POST /api/auth/super-admin/signup` - User registration

### API Service Layer
All API calls are centralized in the `services/` directory:
- **api.js**: Base Axios configuration with interceptors
- **authService.js**: Authentication methods
- **cmsService.js**: Content management methods
- **enquiryService.js**: Lead generation methods

## 🔐 Authentication

The app uses JWT-based authentication:
- Token stored in `localStorage`
- Automatically attached to requests via Axios interceptor
- Global auth state managed by `AuthContext`
- Protected routes can be easily added

## 📝 Key Features

### 1. Dynamic Announcement Bar
- Fetches announcements from API
- Auto-rotates every 5 seconds
- Dismissible by user

### 2. Hero Section with Carousel
- Dynamic banners from CMS
- Auto-slide functionality
- Enquiry modal integration

### 3. Enquiry Form (Lead Generation)
- Reusable component
- Can be used in modal or embedded
- Form validation with React Hook Form
- Success notifications with toast

### 4. Authentication Pages
- Login and Signup pages
- Form validation
- Error handling
- Redirect after success

### 5. Responsive Design
- Mobile-first approach
- Hamburger menu for mobile
- Responsive grid layouts

## 🎯 Future Enhancements

The codebase is designed for easy extensibility:

### Adding a Student Dashboard:
1. Create new pages in `src/pages/dashboard/`
2. Add protected route wrapper component
3. Create dashboard-specific services
4. Reuse existing common components

### Adding New Features:
1. Create service methods in `src/services/`
2. Build UI components in `src/components/`
3. Add routes in `src/App.jsx`
4. Reuse existing utilities and hooks

## 🛠️ Development Guidelines

### Component Creation:
- Keep components small and focused
- Use common components for consistency
- Add PropTypes or TypeScript for type safety
- Document props with JSDoc comments

### API Integration:
- Always use service layer (don't call axios directly)
- Handle errors gracefully
- Show loading states
- Display user-friendly error messages

### Styling:
- Use Tailwind utility classes
- Follow mobile-first approach
- Maintain consistent spacing (4, 6, 8, 12, 16)
- Use primary color for brand consistency

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Follow the existing folder structure
2. Keep components reusable
3. Document complex logic
4. Test thoroughly before committing

## 📄 License

Private - Centum Academy

---

**Built with ❤️ for Centum Academy**
