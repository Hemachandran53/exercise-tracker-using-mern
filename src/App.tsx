
// src/App.tsx: The main React component that sets up React Router for navigation.
// It defines the routes for the landing page and the main application layout.

import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import ExerciseLogging from "./pages/ExerciseLogging";
import ExerciseHistory from "./pages/ExerciseHistory";
import WorkoutPlans from "./pages/WorkoutPlans";
import CommunityPlans from "./pages/CommunityPlans";
import ExerciseLibrary from "./pages/ExerciseLibrary";
import CommunityChallenges from "./pages/CommunityChallenges";
import NutritionTracking from "./pages/NutritionTracking";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import { AuthProvider } from "./contexts/AuthProvider";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <SonnerToaster />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/log-exercise" element={<ExerciseLogging />} />
              <Route path="/history" element={<ExerciseHistory />} />
              <Route path="/workout-plans" element={<WorkoutPlans />} />
              <Route path="/community-plans" element={<CommunityPlans />} />
              <Route path="/library" element={<ExerciseLibrary />} />
              <Route path="/challenges" element={<CommunityChallenges />} />
              <Route path="/nutrition" element={<NutritionTracking />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

/*
HOW TO MODIFY AND EXTEND THE APP COMPONENT:

1. ADD NEW ROUTES:
   - Add new Route components inside the MainLayout Route
   - Import the new page component at the top
   - Example: <Route path="/profile" element={<Profile />} />
   - Make sure the path matches your sidebar navigation

2. ADD PUBLIC ROUTES:
   - Add routes outside the MainLayout for unauthenticated pages
   - Example: <Route path="/about" element={<About />} />
   - These routes won't have the sidebar/navbar layout

3. ADD PROTECTED ROUTES:
   - Wrap routes in a ProtectedRoute component for role-based access
   - Example: <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
   - Check user permissions before rendering components

4. ADD NESTED ROUTES:
   - Create nested routing for complex page structures
   - Example: Workout plans with sub-routes for create/edit
   - Use nested Route components and Outlet in parent components

5. ADD ROUTE GUARDS:
   - Implement authentication guards for protected routes
   - Redirect unauthorized users to login page
   - Check user roles and permissions

6. ADD ROUTE PARAMETERS:
   - Add dynamic routes with parameters
   - Example: <Route path="/workout/:id" element={<WorkoutDetails />} />
   - Access params with useParams() hook in components

7. ADD QUERY PARAMETERS:
   - Handle URL query parameters for filtering/searching
   - Example: /history?category=cardio&date=2024-01-01
   - Use URLSearchParams to parse query strings

8. ADD ROUTE TRANSITIONS:
   - Add page transition animations between routes
   - Use framer-motion's AnimatePresence
   - Create smooth transitions for better UX

9. ADD LAZY LOADING:
   - Implement code splitting with React.lazy()
   - Example: const Dashboard = lazy(() => import('./pages/Dashboard'))
   - Wrap with Suspense for loading states

10. ADD ERROR BOUNDARIES:
    - Add error boundaries around route components
    - Catch and handle routing errors gracefully
    - Example: <ErrorBoundary><Routes>...</Routes></ErrorBoundary>

11. ADD REDIRECT ROUTES:
    - Add redirects for old URLs or default routing
    - Example: <Route path="/old-dashboard" element={<Navigate to="/dashboard" replace />} />
    - Handle URL migrations and shortcuts

12. ADD BREADCRUMB ROUTES:
    - Configure routes for automatic breadcrumb generation
    - Add route metadata for breadcrumb labels
    - Use route hierarchy for navigation context

13. ADD QUERY CLIENT CONFIGURATION:
    - Customize QueryClient with global settings
    - Example: defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } }
    - Add global error handling for queries

14. ADD GLOBAL PROVIDERS:
    - Add additional context providers
    - Example: ThemeProvider, SocketProvider, etc.
    - Wrap around other providers for proper context hierarchy

15. ADD ANALYTICS:
    - Add route tracking for analytics
    - Track page views and user navigation patterns
    - Example: Google Analytics, Mixpanel integration

16. ADD PWA FEATURES:
    - Add service worker registration
    - Handle offline routing and caching
    - Add install prompts for PWA

17. ADD INTERNATIONALIZATION:
    - Add i18n provider for multi-language support
    - Configure language routing (e.g., /en/dashboard, /es/dashboard)
    - Handle language detection and switching

18. ADD DEV TOOLS:
    - Add React Query DevTools in development
    - Add React Router DevTools for debugging
    - Conditional rendering based on environment

19. ADD GLOBAL ERROR HANDLING:
    - Add global error handlers for unhandled errors
    - Implement error reporting services
    - Show user-friendly error pages

20. ADD PERFORMANCE MONITORING:
    - Add performance tracking for route changes
    - Monitor bundle sizes and loading times
    - Implement performance optimizations
*/
