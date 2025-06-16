
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-1", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-xs font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-5 w-5 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-6 font-normal text-[0.7rem]",
        row: "flex w-full mt-1",
        cell: "h-6 w-6 text-center text-xs p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-6 w-6 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-3 w-3" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-3 w-3" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

/*
HOW TO MODIFY AND EXTEND THE CALENDAR COMPONENT:

1. CHANGE CALENDAR SIZE:
   - Modify the cell dimensions by changing "h-6 w-6" in the cell and day classes
   - Example: Change to "h-8 w-8" for larger calendar
   - Adjust nav_button size accordingly: "h-7 w-7"

2. CUSTOMIZE CALENDAR COLORS:
   - day_selected: Controls selected date appearance
   - day_today: Controls today's date highlighting
   - day_outside: Controls dates outside current month
   - Example: Change selected color to green: "bg-green-500 text-white"

3. ADD DATE RANGE SELECTION:
   - Change mode prop when using: <Calendar mode="range" selected={dateRange} onSelect={setDateRange} />
   - Handle range selection in parent component with useState<DateRange>()

4. DISABLE SPECIFIC DATES:
   - Add disabled prop: <Calendar disabled={[new Date('2024-01-01'), { before: new Date() }]} />
   - Disable weekends: disabled={[{ dayOfWeek: [0, 6] }]}
   - Disable past dates: disabled={[{ before: new Date() }]}

5. ADD CUSTOM MODIFIERS:
   - Use modifiers prop to highlight special dates
   - Example: <Calendar modifiers={{ holiday: [new Date('2024-12-25')] }} />
   - Style with modifiersClassNames: { holiday: 'bg-red-100 text-red-800' }

6. CHANGE NAVIGATION ICONS:
   - Replace ChevronLeft/ChevronRight with other lucide-react icons
   - Example: Use ArrowLeft, ArrowRight for different arrow styles

7. CUSTOMIZE MONTH/YEAR DISPLAY:
   - Modify caption_label class to change font size/weight
   - Add custom formatters for different date formats

8. ADD MULTIPLE MONTHS:
   - Set numberOfMonths prop: <Calendar numberOfMonths={2} />
   - Adjust months class for layout: "flex flex-row space-x-4"

9. CHANGE WEEK START DAY:
   - Add weekStartsOn prop: <Calendar weekStartsOn={1} /> (1 = Monday)
   - 0 = Sunday (default), 1 = Monday, etc.

10. ADD CUSTOM STYLING:
    - Override any className in the classNames prop
    - Example: classNames={{ day_today: "bg-blue-500 text-white" }}
    - Use cn() utility to merge with existing classes

11. ADD LOCALE SUPPORT:
    - Import locale from date-fns: import { es } from 'date-fns/locale'
    - Add locale prop: <Calendar locale={es} />

12. ADD EVENT HANDLING:
    - onDayClick: Triggered when any day is clicked
    - onMonthChange: Triggered when month changes
    - onSelect: Triggered when date selection changes
*/
