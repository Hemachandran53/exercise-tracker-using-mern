
// src/components/layout/Sidebar.tsx: Reusable sidebar component with navigation links.
// Collapsible on mobile via hamburger menu. Styled with Tailwind CSS.

import { NavLink, useLocation } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  PlusCircle,
  History,
  ClipboardList,
  Library,
  Users,
  Settings,
  HeartPulse,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/log-exercise", label: "Log Exercise", icon: PlusCircle },
  { href: "/history", label: "History", icon: History },
  { href: "/workout-plans", label: "Workout Plans", icon: ClipboardList },
  { href: "/library", label: "Exercise Library", icon: Library },
  { href: "/challenges", label: "Challenges", icon: Users },
  { href: "/nutrition", label: "Nutrition", icon: HeartPulse },
  { href: "/settings", label: "Settings", icon: Settings },
];

const Sidebar = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();

  const getNavlinkClass = (path: string) =>
    cn(
      "flex items-center p-2 rounded-lg",
      location.pathname === path
        ? "bg-primary text-primary-foreground"
        : "hover:bg-muted"
    );

  return (
    <aside className={cn("hidden md:block h-screen transition-all duration-300", collapsed ? "w-16" : "w-64")}>
      <nav className="flex flex-col p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink to={item.href} key={item.href} className={getNavlinkClass(item.href)}>
            <item.icon className="h-5 w-5" />
            {!collapsed && <span className="ml-3">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

/*
HOW TO MODIFY AND EXTEND THE SIDEBAR COMPONENT:

1. ADD NEW NAVIGATION ITEMS:
   - Add new items to the navItems array
   - Import new icons from lucide-react
   - Example: { href: "/reports", label: "Reports", icon: BarChart3 }
   - Make sure to add corresponding routes in App.tsx

2. ADD NAVIGATION GROUPS:
   - Group related navigation items with headers
   - Example: Separate "Tracking" and "Social" sections
   - Add group headers: <div className="text-xs font-semibold text-muted-foreground mt-4 mb-2">TRACKING</div>

3. ADD BADGES/NOTIFICATIONS:
   - Add notification badges to navigation items
   - Example: Show unread message count on challenges
   - Add Badge component: <Badge variant="destructive">3</Badge>

4. ADD COLLAPSIBLE GROUPS:
   - Make navigation groups expandable/collapsible
   - Use Collapsible component from shadcn/ui
   - Store expanded state in localStorage for persistence

5. ADD USER SECTION:
   - Add user profile section at top or bottom of sidebar
   - Show user avatar, name, and quick actions
   - Example: Settings link, logout button in sidebar

6. ADD SEARCH:
   - Add search input at top of sidebar to filter navigation
   - Filter navItems based on search term
   - Example: const filteredItems = navItems.filter(item => item.label.toLowerCase().includes(search))

7. ADD TOOLTIP FOR COLLAPSED STATE:
   - Show tooltips when sidebar is collapsed and user hovers
   - Use Tooltip component from shadcn/ui
   - Wrap navigation items in Tooltip when collapsed

8. ADD CUSTOM STYLING:
   - Modify active state styling by changing bg-primary class
   - Add custom hover effects, transitions
   - Example: Add subtle shadows, gradient backgrounds

9. ADD FOOTER SECTION:
   - Add footer at bottom of sidebar with app version, help links
   - Use absolute positioning: absolute bottom-0
   - Example: <div className="absolute bottom-4 left-4">Version 1.0</div>

10. ADD KEYBOARD NAVIGATION:
    - Add keyboard shortcuts for navigation items
    - Example: 1 for Dashboard, 2 for Log Exercise, etc.
    - Add visual indicators for shortcuts

11. ADD PINNED ITEMS:
    - Allow users to pin frequently used items to top
    - Store pinned items in localStorage or user preferences
    - Add pin/unpin functionality with context menu

12. ADD RECENT PAGES:
    - Show recently visited pages at top of navigation
    - Track navigation history and display last 3-5 visited pages
    - Clear recent history option

13. ADD DRAG & DROP REORDERING:
    - Allow users to reorder navigation items
    - Use react-beautiful-dnd or similar library
    - Save custom order to user preferences

14. ADD SIDEBAR THEMES:
    - Add different color themes for sidebar
    - Example: Dark sidebar, Light sidebar, Colored sidebar
    - Theme selector in settings page

15. ADD ANIMATION EFFECTS:
    - Add smooth transitions for collapse/expand
    - Stagger animations for navigation items
    - Use framer-motion for advanced animations

16. ADD MOBILE SIDEBAR:
    - Enhance mobile behavior with swipe gestures
    - Add overlay when sidebar is open on mobile
    - Close sidebar automatically on navigation

17. ADD BREADCRUMB INTEGRATION:
    - Show current page hierarchy in sidebar
    - Highlight parent pages when on sub-pages
    - Add visual connection lines between related items

18. ADD EXTERNAL LINKS:
    - Add external links (help, documentation, support)
    - Use external-link icon to indicate external navigation
    - Open in new tab/window

19. ADD SIDEBAR CUSTOMIZATION:
    - Allow users to show/hide navigation items
    - Add customization panel in settings
    - Role-based navigation visibility

20. ADD SIDEBAR ANALYTICS:
    - Track most used navigation items
    - Show usage statistics in admin panel
    - Optimize navigation based on usage patterns
*/
