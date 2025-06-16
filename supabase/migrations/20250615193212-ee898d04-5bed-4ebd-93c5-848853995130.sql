
-- Create a table for workout logs
CREATE TABLE public.workout_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  duration_hours REAL NOT NULL,
  calories_burned INT NOT NULL
);

COMMENT ON TABLE public.workout_logs IS 'Stores logs of user workouts.';
COMMENT ON COLUMN public.workout_logs.duration_hours IS 'Duration of the workout in hours.';
COMMENT ON COLUMN public.workout_logs.calories_burned IS 'Estimated calories burned during the workout.';

-- Enable Row Level Security
ALTER TABLE public.workout_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
CREATE POLICY "Users can view their own workout logs"
  ON public.workout_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own workout logs"
  ON public.workout_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workout logs"
  ON public.workout_logs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workout logs"
  ON public.workout_logs FOR DELETE
  USING (auth.uid() = user_id);

-- Create a function to get all dashboard stats in one go for efficiency
CREATE OR REPLACE FUNCTION public.get_dashboard_stats()
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
  total_workouts int;
  total_calories int;
  active_days int;
  weekly_progress json;
  current_user_id uuid := auth.uid();
begin
  select count(*) into total_workouts from public.workout_logs where user_id = current_user_id;
  select coalesce(sum(calories_burned), 0) into total_calories from public.workout_logs where user_id = current_user_id;
  select count(distinct created_at::date) into active_days from public.workout_logs where user_id = current_user_id;

  select json_agg(t) into weekly_progress
  from (
    select
      to_char(day_series.day, 'Dy') as day,
      coalesce(sum(wl.duration_hours), 0) as hours
    from
      generate_series(
        date_trunc('day', now() at time zone 'utc' - interval '6 days'),
        date_trunc('day', now() at time zone 'utc'),
        '1 day'
      ) as day_series(day)
    left join
      public.workout_logs wl on date_trunc('day', wl.created_at) = day_series.day and wl.user_id = current_user_id
    group by
      day_series.day
    order by
      day_series.day
  ) t;

  return json_build_object(
    'totalWorkouts', total_workouts,
    'caloriesBurned', total_calories,
    'activeDays', active_days,
    'weeklyProgress', weekly_progress
  );
end;
$function$;
