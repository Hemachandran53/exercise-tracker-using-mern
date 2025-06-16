
-- Drop the existing policy for selecting workout plans
DROP POLICY "Users can view their own workout plans" ON public.workout_plans;

-- Create a new policy that allows users to view their own plans, or any public plans
CREATE POLICY "Users can view their own and public workout plans"
  ON public.workout_plans FOR SELECT
  USING (auth.uid() = user_id OR privacy = 'Public');
