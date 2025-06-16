
ALTER TABLE public.workout_logs
ADD COLUMN name TEXT,
ADD COLUMN category TEXT,
ADD COLUMN distance_km REAL,
ADD COLUMN sets INTEGER,
ADD COLUMN reps INTEGER,
ADD COLUMN notes TEXT;

-- Now, add NOT NULL constraints after adding the columns to avoid issues with existing data if any.
-- Assuming name and category are required fields based on the UI.
ALTER TABLE public.workout_logs ALTER COLUMN name SET NOT NULL;
ALTER TABLE public.workout_logs ALTER COLUMN category SET NOT NULL;
