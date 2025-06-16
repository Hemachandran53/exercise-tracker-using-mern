
-- Create table for community challenges
CREATE TABLE public.community_challenges (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    description text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS for challenges
ALTER TABLE public.community_challenges ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can read all challenges
CREATE POLICY "Authenticated users can read challenges" ON public.community_challenges
FOR SELECT
TO authenticated
USING (true);

-- Create table for challenge participants
CREATE TABLE public.challenge_participants (
    challenge_id uuid NOT NULL REFERENCES public.community_challenges(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    joined_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (challenge_id, user_id)
);

-- Enable RLS for participants
ALTER TABLE public.challenge_participants ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view all participants
CREATE POLICY "Users can view all participants" ON public.challenge_participants
FOR SELECT
TO authenticated
USING (true);

-- Policy: Users can join a challenge
CREATE POLICY "Users can join a challenge" ON public.challenge_participants
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can leave a challenge (by deleting their participation)
CREATE POLICY "Users can leave a challenge" ON public.challenge_participants
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Seed initial challenges from mock data
INSERT INTO public.community_challenges (name, description)
VALUES
    ('30-Day Cardio Challenge', 'Complete 30 minutes of cardio every day for 30 days.'),
    ('Strength Builder', 'Increase your max lift by 10% in 4 weeks.');
