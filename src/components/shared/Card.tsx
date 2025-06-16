
import { Card as ShadcnCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <ShadcnCard className={cn("transition-shadow duration-300 hover:shadow-lg", className)} {...props}>
      {children}
    </ShadcnCard>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };

/*
HOW TO MODIFY AND EXTEND THE SHARED CARD COMPONENT:

1. ADD CARD VARIANTS:
   - Create different card styles by adding variant prop
   - Example: variant: 'default' | 'outlined' | 'elevated' | 'flat'
   - Use class-variance-authority (cva) for variant management

2. ADD LOADING STATES:
   - Add loading prop to show skeleton content
   - Example: {loading ? <SkeletonCard /> : children}
   - Create shimmer effects for loading cards

3. ADD CLICKABLE CARDS:
   - Add onClick prop and cursor-pointer styling
   - Make entire card interactive for navigation
   - Add focus states and keyboard accessibility

4. ADD CARD ACTIONS:
   - Add action buttons in card header or footer
   - Example: Edit, Delete, Share buttons
   - Position actions with proper spacing

5. ADD ANIMATIONS:
   - Enhance hover animations with more effects
   - Add entrance animations when cards mount
   - Use framer-motion for advanced animations

6. ADD STATUS INDICATORS:
   - Add colored borders or badges for card status
   - Example: Green for success, Red for error, Yellow for warning
   - Status prop: status: 'success' | 'error' | 'warning' | 'info'

7. ADD CARD SIZES:
   - Create size variants (small, medium, large)
   - Adjust padding and content sizing accordingly
   - Example: size: 'sm' | 'md' | 'lg' | 'xl'

8. ADD CARD THEMES:
   - Create theme variants for different contexts
   - Example: theme: 'primary' | 'secondary' | 'accent'
   - Apply different color schemes

9. ADD COLLAPSE/EXPAND:
   - Add collapsible cards with expand/collapse functionality
   - Store expanded state and toggle content visibility
   - Add expand/collapse icons in header

10. ADD DRAG AND DROP:
    - Make cards draggable for reordering
    - Add drag handles and drop zones
    - Use react-beautiful-dnd library

11. ADD SELECTION:
    - Add selectable cards with checkboxes
    - Manage multi-selection state
    - Add select all/none functionality

12. ADD CARD OVERLAYS:
    - Add overlay content for additional information
    - Example: Action overlays on hover
    - Modal overlays for detailed views

13. ADD ACCESSIBILITY:
    - Add proper ARIA labels and roles
    - Ensure keyboard navigation support
    - Screen reader friendly content structure

14. ADD RESPONSIVE BEHAVIOR:
    - Adjust card layout for different screen sizes
    - Stack card content vertically on mobile
    - Responsive typography and spacing

15. ADD CARD TEMPLATES:
    - Create pre-built card templates for common use cases
    - Example: StatsCard, ProfileCard, ActionCard
    - Extend base Card component

16. ADD CARD BACKGROUNDS:
    - Support for background images or gradients
    - backgroundImage prop for custom backgrounds
    - Overlay options for content readability

17. ADD CARD BORDERS:
    - Customizable border styles and colors
    - Border radius options
    - Gradient borders for premium appearance

18. ADD CARD SHADOWS:
    - Multiple shadow variants
    - Dynamic shadows based on hover state
    - Custom shadow colors and intensities

19. ADD CARD SPACING:
    - Customizable padding and margin options
    - Compact and spacious variants
    - Responsive spacing adjustments

20. ADD CARD COMPOSITION:
    - Support for complex card layouts
    - Nested cards and card sections
    - Flexible content arrangement options
*/
