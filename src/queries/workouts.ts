import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export type WorkoutLog = Tables<'workout_logs'>;
export type NewWorkoutLog = TablesInsert<'workout_logs'>;
export type UpdateWorkoutLog = TablesUpdate<'workout_logs'>;

export const getWorkoutHistory = async (): Promise<WorkoutLog[]> => {
  const { data, error } = await supabase
    .from('workout_logs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching workout history:', error);
    throw new Error(error.message);
  }

  return data;
};

export const addWorkoutLog = async (workout: NewWorkoutLog) => {
  const { data, error } = await supabase.from('workout_logs').insert(workout).select().single();

  if (error) {
    console.error('Error adding workout log:', error);
    throw new Error(error.message);
  }

  return data;
};

export const updateWorkoutLog = async (id: string, updates: UpdateWorkoutLog) => {
    const { data, error } = await supabase
        .from('workout_logs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating workout log:', error);
        throw new Error(error.message);
    }

    return data;
};

export const deleteWorkoutLog = async (id: string) => {
    const { error } = await supabase.from('workout_logs').delete().eq('id', id);

    if (error) {
        console.error('Error deleting workout log:', error);
        throw new Error(error.message);
    }

    return true;
};

// --- Workout Plans ---

export type WorkoutPlan = Tables<'workout_plans'>;
export type NewWorkoutPlan = TablesInsert<'workout_plans'>;
export type UpdateWorkoutPlan = TablesUpdate<'workout_plans'>;

export const getWorkoutPlans = async (): Promise<WorkoutPlan[]> => {
  const { data, error } = await supabase
    .from('workout_plans')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching workout plans:', error);
    throw new Error(error.message);
  }

  return data;
};

export const getPublicWorkoutPlans = async (): Promise<WorkoutPlan[]> => {
  const { data, error } = await supabase
    .from('workout_plans')
    .select('*')
    .eq('privacy', 'Public')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching public workout plans:', error);
    throw new Error(error.message);
  }

  return data;
};

export const addWorkoutPlan = async (plan: NewWorkoutPlan) => {
  const { data, error } = await supabase.from('workout_plans').insert(plan).select().single();

  if (error) {
    console.error('Error adding workout plan:', error);
    throw new Error(error.message);
  }

  return data;
};

export const updateWorkoutPlan = async (id: string, updates: UpdateWorkoutPlan) => {
    const { data, error } = await supabase
        .from('workout_plans')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating workout plan:', error);
        throw new Error(error.message);
    }

    return data;
};

export const deleteWorkoutPlan = async (id: string) => {
    const { error } = await supabase.from('workout_plans').delete().eq('id', id);

    if (error) {
        console.error('Error deleting workout plan:', error);
        throw new Error(error.message);
    }

    return true;
};
