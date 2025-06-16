
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared/Card';
import SkeletonLoader from '@/components/shared/SkeletonLoader';
import { achievements } from '@/data/mock';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Activity, Flame, CalendarDays, Trophy, Award, Sunrise, Moon } from 'lucide-react';
import { getDashboardStats } from '@/queries/dashboard';

const iconMap: { [key: string]: React.ElementType } = {
  Trophy,
  Award,
  Sunrise,
  Moon,
};

const Dashboard = () => {
  const { data: dashboardStats, isLoading, isError, error } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStats,
  });

  if (isLoading) return <SkeletonLoader />;

  if (isError) {
    return <div className="text-center py-8 text-red-500">Failed to load dashboard data: {error.message}</div>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats?.totalWorkouts ?? 0}</div>
            <p className="text-xs text-muted-foreground">+5 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(dashboardStats?.caloriesBurned ?? 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total estimate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Days</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats?.activeDays ?? 0}</div>
            <p className="text-xs text-muted-foreground">Consistency is key</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardStats?.weeklyProgress ?? []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="hours" fill="var(--color-primary)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {achievements.map((ach) => {
              const Icon = iconMap[ach.icon];
              return (
                <div key={ach.name} className="flex flex-col items-center text-center space-y-2 group cursor-pointer">
                  <div className="p-4 bg-secondary/20 rounded-full transition-transform duration-200 group-hover:scale-110">
                    <Icon className="h-8 w-8 text-secondary" />
                  </div>
                  <span className="text-sm font-medium">{ach.name}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

/*
HOW TO MODIFY AND EXTEND THE DASHBOARD PAGE:

1. ADD NEW STAT CARDS:
   - Add new cards to the stats grid by extending the grid-cols-3 to grid-cols-4
   - Follow the existing Card pattern with CardHeader, CardTitle, and CardContent
   - Example: Add a "Personal Records" card:
     <Card>
       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
         <CardTitle className="text-sm font-medium">Personal Records</CardTitle>
         <Crown className="h-4 w-4 text-muted-foreground" />
       </CardHeader>
       <CardContent>
         <div className="text-2xl font-bold">12</div>
         <p className="text-xs text-muted-foreground">New PRs this month</p>
       </CardContent>
     </Card>

2. ADD MORE CHART TYPES:
   - Import additional chart components from recharts: PieChart, LineChart, AreaChart
   - Replace or add alongside BarChart in the charts grid
   - Example: Add a pie chart for exercise categories:
     <PieChart width={300} height={300}>
       <Pie data={exerciseCategories} dataKey="value" nameKey="name" />
     </PieChart>

3. MODIFY EXISTING CHARTS:
   - Change chart colors by modifying the fill prop: fill="#8884d8"
   - Add multiple bars: <Bar dataKey="calories" fill="#ff7300" />
   - Change chart type: Replace BarChart with LineChart for trends

4. ADD TIME PERIOD FILTERS:
   - Add buttons to switch between weekly, monthly, yearly views
   - Example: const [timePeriod, setTimePeriod] = useState('weekly')
   - Modify the dashboard query to accept time period parameter

5. ADD GOAL TRACKING:
   - Add goal cards showing progress towards fitness goals
   - Use Progress component from shadcn/ui: <Progress value={progressPercentage} />
   - Example: Weekly workout goal, calorie burn goal, distance goal

6. ADD RECENT ACTIVITY FEED:
   - Add a new card showing recent workouts, achievements, or milestones
   - Display as a list with timestamps and descriptions
   - Example: "Completed 5K run - 2 hours ago"

7. ADD QUICK ACTIONS:
   - Add floating action buttons or quick action cards
   - Example: "Log Quick Workout", "Start Timer", "View Today's Plan"
   - Use Button components with icons and navigate to relevant pages

8. ADD WEATHER INTEGRATION:
   - Fetch weather data for outdoor workout recommendations
   - Display weather widget with temperature and conditions
   - Suggest indoor/outdoor activities based on weather

9. ADD MOTIVATIONAL QUOTES:
   - Add a quote card that displays random fitness motivation
   - Fetch from an API or use a local array of quotes
   - Refresh quote daily or on user action

10. ADD STREAK TRACKING:
    - Show current workout streak, longest streak
    - Display streak calendar visualization
    - Add streak milestones and celebrations

11. ADD COMPARISON CHARTS:
    - Show this month vs last month comparisons
    - Display year-over-year progress
    - Add percentage change indicators with up/down arrows

12. ADD INTERACTIVE ACHIEVEMENTS:
    - Make achievement items clickable to show details
    - Add progress bars for achievements in progress
    - Show unlock dates and requirements

13. ADD DASHBOARD CUSTOMIZATION:
    - Allow users to rearrange dashboard widgets
    - Add show/hide toggles for different sections
    - Save layout preferences to localStorage or database

14. ADD LOADING STATES:
    - Add skeleton loaders for individual cards during data fetching
    - Show shimmer effects while charts are loading
    - Handle partial data loading gracefully

15. ADD ERROR HANDLING:
    - Add retry buttons for failed data loads
    - Show fallback content when data is unavailable
    - Display user-friendly error messages

16. MODIFY RESPONSIVE DESIGN:
    - Adjust grid layouts for different screen sizes
    - Use responsive grid classes: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
    - Stack charts vertically on mobile devices

17. ADD REFRESH FUNCTIONALITY:
    - Add pull-to-refresh on mobile
    - Add manual refresh button in header
    - Auto-refresh data every few minutes

18. ADD SHARING FEATURES:
    - Add share buttons for achievements or progress
    - Generate shareable images of progress charts
    - Integration with social media platforms
*/
