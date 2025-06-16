
import { supabase } from '@/integrations/supabase/client';

export interface WeeklyProgress {
  day: string;
  hours: number;
}

export interface DashboardStats {
  totalWorkouts: number;
  caloriesBurned: number;
  activeDays: number;
  weeklyProgress: WeeklyProgress[];
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const { data, error } = await supabase.rpc('get_dashboard_stats');

  if (error) {
    console.error('Error fetching dashboard stats:', error);
    throw new Error(error.message);
  }
  
  return data as unknown as DashboardStats;
};

/*
HOW TO MODIFY AND EXTEND THE DASHBOARD QUERIES:

1. ADD NEW DASHBOARD STATS:
   - Extend the DashboardStats interface with new properties
   - Example: personalRecords: number, averageWorkoutDuration: number
   - Update the Supabase RPC function to return these new stats

2. ADD TIME PERIOD FILTERING:
   - Modify getDashboardStats to accept time period parameter
   - Example: getDashboardStats(period: 'weekly' | 'monthly' | 'yearly')
   - Update Supabase function to filter data by time period

3. ADD GOAL TRACKING QUERIES:
   - Create new query functions for user goals
   - Example: getUserGoals(), getGoalProgress()
   - Track progress towards weekly/monthly fitness goals

4. ADD STREAK CALCULATIONS:
   - Add streak counting to dashboard stats
   - Example: currentStreak: number, longestStreak: number
   - Calculate consecutive workout days

5. ADD CATEGORY BREAKDOWNS:
   - Include workout category distribution in stats
   - Example: categoryBreakdown: { cardio: 10, strength: 5, flexibility: 3 }
   - Use for pie charts and category analysis

6. ADD COMPARISON DATA:
   - Include previous period comparisons
   - Example: totalWorkoutsChange: '+15%', caloriesChange: '-2%'
   - Show growth/decline indicators on dashboard

7. ADD PERSONAL RECORDS:
   - Query for recent personal records and achievements
   - Example: getPersonalRecords(), getRecentAchievements()
   - Display breakthrough moments

8. ADD SOCIAL STATS:
   - Include community/social statistics
   - Example: friendsActive: number, challengesParticipating: number
   - Show social engagement metrics

9. ADD CACHING:
   - Implement query caching for better performance
   - Use react-query's staleTime and cacheTime options
   - Example: staleTime: 5 * 60 * 1000 (5 minutes)

10. ADD ERROR HANDLING:
    - Add retry logic for failed requests
    - Implement exponential backoff for network errors
    - Provide fallback data when queries fail

11. ADD REAL-TIME UPDATES:
    - Use Supabase real-time subscriptions for live data
    - Update dashboard when new workouts are logged
    - Example: supabase.channel('dashboard').on('postgres_changes', ...)

12. ADD BATCH QUERIES:
    - Combine multiple related queries into single requests
    - Reduce API calls for better performance
    - Use Promise.all() for parallel data fetching

13. ADD DATA TRANSFORMATION:
    - Transform raw data for specific chart formats
    - Example: formatWeeklyProgressForChart()
    - Prepare data for different visualization types

14. ADD HEALTH METRICS:
    - Include health-related statistics
    - Example: averageHeartRate, caloriesPerWorkout, restDays
    - Integrate with health data if available

15. ADD FORECASTING:
    - Include trend predictions and forecasts
    - Example: projectedMonthlyWorkouts, trendDirection
    - Use for goal setting and motivation

16. ADD CUSTOM METRICS:
    - Allow users to define custom dashboard metrics
    - Store user preferences for displayed stats
    - Dynamic query building based on preferences

17. ADD EXPORT FUNCTIONS:
    - Create functions to export dashboard data
    - Example: exportDashboardData(), generateReport()
    - Support CSV, PDF, or JSON exports

18. ADD AGGREGATION HELPERS:
    - Create utility functions for common aggregations
    - Example: calculateAverage(), getTotals(), getPercentageChange()
    - Reusable calculation functions

19. ADD VALIDATION:
    - Validate API responses and data integrity
    - Type guards for runtime type checking
    - Handle malformed data gracefully

20. ADD MONITORING:
    - Add performance monitoring for query execution
    - Log slow queries and optimization opportunities
    - Track query success/failure rates
*/
