
// src/components/layout/MainLayout.tsx: This component provides the main structure
// for the authenticated parts of the app, including the Navbar and Sidebar.
// It uses React Router's Outlet to render the active page.

import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthProvider";
import { useEffect } from "react";

const MainLayout = () => {
  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/auth', { replace: true });
    }
  }, [session, navigate]);

  if (!session) {
    return null;
  }
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-muted/40">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;

/*
HOW TO MODIFY AND EXTEND THE MAIN LAYOUT COMPONENT:

1. ADD LOADING STATES:
   - Add loading spinner while session is being checked
   - Example: if (!session && isLoading) return <div className="loading-spinner">Loading...</div>
   - Show skeleton layout during authentication check

2. ADD BREADCRUMBS:
   - Add breadcrumb navigation below the navbar
   - Import Breadcrumb components from shadcn/ui
   - Example: <Breadcrumb><BreadcrumbItem>Dashboard</BreadcrumbItem></Breadcrumb>

3. ADD FOOTER:
   - Add footer component below the main content
   - Create src/components/layout/Footer.tsx
   - Add copyright, links, version info

4. MODIFY SIDEBAR BEHAVIOR:
   - Change sidebar collapse behavior by modifying SidebarProvider props
   - Add defaultOpen prop: <SidebarProvider defaultOpen={true}>
   - Set custom collapsed width: <SidebarProvider collapsedWidth={60}>

5. ADD NOTIFICATIONS:
   - Add notification banner or toast container
   - Example: <NotificationBanner /> below Navbar
   - Handle app-wide notifications and announcements

6. ADD BACKGROUND PATTERNS:
   - Modify the bg-muted/40 class on main to add patterns
   - Example: bg-gradient-to-br from-blue-50 to-white
   - Add decorative elements or background images

7. ADD MOBILE NAVIGATION:
   - Enhance mobile sidebar with bottom navigation
   - Add mobile-specific navigation patterns
   - Use conditional rendering based on screen size

8. ADD SESSION MANAGEMENT:
   - Add session timeout warnings
   - Auto-logout functionality after inactivity
   - Session refresh handling

9. ADD ERROR BOUNDARIES:
   - Wrap components in error boundaries to catch crashes
   - Create ErrorBoundary component for graceful error handling
   - Show fallback UI when components fail

10. ADD LAYOUT VARIANTS:
    - Support different layouts for different page types
    - Example: Full-width layout, Centered layout, Split layout
    - Use URL parameters or page props to determine layout

11. ADD ACCESSIBILITY:
    - Add skip-to-content links for keyboard navigation
    - Proper ARIA labels and roles
    - Focus management for sidebar toggling

12. ADD THEME MANAGEMENT:
    - Move theme management to layout level
    - Add theme persistence to localStorage
    - Support for system theme detection

13. ADD SCROLL MANAGEMENT:
    - Add scroll-to-top functionality
    - Maintain scroll position on navigation
    - Smooth scrolling behavior

14. ADD PAGE TRANSITIONS:
    - Add animations between page changes
    - Use framer-motion for smooth transitions
    - Loading animations during navigation

15. MODIFY AUTHENTICATION FLOW:
    - Add different redirect logic based on user roles
    - Handle first-time user onboarding
    - Add remember me functionality

16. ADD OFFLINE SUPPORT:
    - Add offline detection and messaging
    - Cache critical app shell components
    - Handle offline state gracefully

17. ADD PERFORMANCE MONITORING:
    - Add performance tracking and analytics
    - Monitor component render times
    - Track user interaction patterns

18. ADD KEYBOARD SHORTCUTS:
    - Add global keyboard shortcuts for navigation
    - Example: Ctrl+/ to toggle sidebar, Ctrl+D for dashboard
    - Show shortcut help overlay
*/
