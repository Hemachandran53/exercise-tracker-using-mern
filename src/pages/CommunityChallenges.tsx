
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared/Card';
import SkeletonLoader from '@/components/shared/SkeletonLoader';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Check } from 'lucide-react';
import { getCommunityChallenges, joinChallenge } from '@/queries/challenges';
import { useAuth } from '@/contexts/AuthProvider';

const CommunityChallenges = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: challenges, isLoading } = useQuery({
    queryKey: ['communityChallenges'],
    queryFn: getCommunityChallenges,
  });

  const joinChallengeMutation = useMutation({
    mutationFn: joinChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communityChallenges'] });
      toast({
        title: "Challenge Joined!",
        description: "Good luck! You can track your progress on the dashboard.",
      });
    },
    onError: (error) => {
       toast({
        title: "Error joining challenge",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleJoinChallenge = (challengeId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You need to be logged in to join a challenge.",
        variant: "destructive",
      });
      return;
    }
    joinChallengeMutation.mutate({ challenge_id: challengeId, user_id: user.id });
  };

  if (isLoading) return <SkeletonLoader />;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Community Challenges</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {challenges?.map((challenge) => {
          const isJoined = challenge.challenge_participants.some(p => p.user_id === user?.id);
          return (
            <Card key={challenge.id}>
              <CardHeader>
                <CardTitle>{challenge.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{challenge.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold">Participants ({challenge.challenge_participants.length})</h4>
                  {challenge.challenge_participants.length > 0 ? (
                    challenge.challenge_participants.map(p => (
                       <div key={p.user_id} className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={p.profiles?.avatar_url ?? `https://i.pravatar.cc/40?u=${p.profiles?.full_name}`} />
                              <AvatarFallback>{p.profiles?.full_name?.charAt(0) ?? 'U'}</AvatarFallback>
                            </Avatar>
                            <span>{p.profiles?.full_name ?? 'Anonymous User'}</span>
                         </div>
                         <span className="text-sm text-muted-foreground">Joined on {new Date(p.joined_at).toLocaleDateString()}</span>
                       </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No participants yet. Be the first to join!</p>
                  )}
                </div>
                {isJoined ? (
                  <Button disabled variant="secondary">
                    <Check className="mr-2 h-4 w-4" />
                    Joined
                  </Button>
                ) : (
                  <Button onClick={() => handleJoinChallenge(challenge.id)} disabled={joinChallengeMutation.isPending}>
                    {joinChallengeMutation.isPending ? 'Joining...' : 'Join Challenge'}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CommunityChallenges;
