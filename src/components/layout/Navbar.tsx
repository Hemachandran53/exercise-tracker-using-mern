
import { Link, useNavigate } from 'react-router-dom';
import { Menu, LogOut, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ title: 'Error logging out', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Logged out successfully' });
      navigate('/');
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const getInitials = (email: string | undefined) => {
    return email ? email.substring(0, 2).toUpperCase() : 'U';
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10 items-center">
            <SidebarTrigger className="block md:hidden" asChild>
                <Button variant="ghost" size="icon"><Menu /></Button>
            </SidebarTrigger>
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-lg text-primary flex items-center gap-2">
              FitTrack
              <img src="/lovable-uploads/93771cfd-8f79-43fd-acee-0ebc1bd6f4c5.png" alt="Fitness Icon" className="h-6 w-6" />
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {session && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="h-8 w-8"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          )}
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.user_metadata.avatar_url} alt={user?.email || ''} />
                    <AvatarFallback>{getInitials(user?.email)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none flex items-center gap-2">
                      My Account
                      <img src="/lovable-uploads/93771cfd-8f79-43fd-acee-0ebc1bd6f4c5.png" alt="Fitness Icon" className="h-4 w-4" />
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <nav className="flex items-center space-x-1">
              <Button variant="ghost" onClick={() => navigate('/auth')}>
                Login
              </Button>
              <Button onClick={() => navigate('/auth')}>
                Sign Up
              </Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

/*
HOW TO MODIFY AND EXTEND THE NAVBAR COMPONENT:

1. ADD NEW BUTTONS TO THE NAVBAR:
   - Add buttons inside the <div className="flex flex-1 items-center justify-end space-x-4"> section
   - Follow the pattern of the dark mode toggle button
   - Example: Add a notifications button by importing Bell from lucide-react and adding:
     <Button variant="ghost" size="icon" onClick={handleNotifications}>
       <Bell className="h-4 w-4" />
     </Button>

2. ADD NEW DROPDOWN MENU ITEMS:
   - Add items inside the DropdownMenuContent component
   - Follow the pattern of the logout item
   - Example: Add a profile settings link:
     <DropdownMenuItem onClick={() => navigate('/profile')}>
       <User className="mr-2 h-4 w-4" />
       <span>Profile Settings</span>
     </DropdownMenuItem>

3. CHANGE THE LOGO/BRAND:
   - Modify the text inside the Link component that says "FitTrack"
   - Add an image logo by replacing the span with: <img src="/logo.png" alt="Logo" className="h-8" />

4. ADD NAVIGATION LINKS TO THE HEADER:
   - Add links in the left section next to the logo
   - Example: <Link to="/about" className="text-sm font-medium">About</Link>

5. CUSTOMIZE DARK MODE FUNCTIONALITY:
   - The toggleDarkMode function handles theme switching
   - To persist theme preference, use localStorage:
     localStorage.setItem('theme', newDarkMode ? 'dark' : 'light')
   - To add system preference detection, use: 
     window.matchMedia('(prefers-color-scheme: dark)').matches

6. ADD USER PROFILE PICTURE:
   - The Avatar component already supports profile pictures via user?.user_metadata.avatar_url
   - To add a default image, modify the AvatarImage src prop

7. MODIFY LOGOUT BEHAVIOR:
   - Edit the handleLogout function to add custom logic before/after logout
   - Example: Clear local storage, show confirmation dialog, etc.

8. ADD MOBILE-SPECIFIC FEATURES:
   - Use Tailwind responsive classes (sm:, md:, lg:) to show/hide elements on different screen sizes
   - The SidebarTrigger is already hidden on larger screens with "block md:hidden"

9. ADD LOADING STATES:
   - Add loading state for logout: const [isLoggingOut, setIsLoggingOut] = useState(false)
   - Show spinner in dropdown when logging out

10. ADD SEARCH FUNCTIONALITY:
    - Add a search input in the header
    - Import Input component and add: <Input placeholder="Search..." className="w-64" />
*/
