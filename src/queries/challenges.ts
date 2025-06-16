
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

export type CommunityChallenge = Tables<'community_challenges'> & {
  challenge_participants: (Tables<'challenge_participants'> & { profiles: Pick<Tables<'profiles'>, 'full_name' | 'avatar_url'> | null })[]
};
export type NewChallengeParticipant = TablesInsert<'challenge_participants'>;

export const getCommunityChallenges = async (): Promise<CommunityChallenge[]> => {
  const { data, error } = await supabase
    .from('community_challenges')
    .select(`
      *,
      challenge_participants (
        *,
        profiles (
          full_name,
          avatar_url
        )
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching community challenges:', error);
    throw new Error(error.message);
  }

  return data as unknown as CommunityChallenge[];
};

export const joinChallenge = async (participant: NewChallengeParticipant) => {
  const { data, error } = await supabase
    .from('challenge_participants')
    .insert(participant)
    .select()
    .single();

  if (error) {
    console.error('Error joining challenge:', error);
    throw new Error(error.message);
  }

  return data;
};
