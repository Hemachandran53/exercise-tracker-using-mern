
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared/Card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SkeletonLoader from '@/components/shared/SkeletonLoader';
import { getPublicWorkoutPlans } from '@/queries/workouts';

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

const CommunityPlans = () => {
  const { data: plans, isLoading: loading, error } = useQuery({
    queryKey: ['publicWorkoutPlans'],
    queryFn: getPublicWorkoutPlans,
  });

  if (loading) return <SkeletonLoader />;

  if (error) {
    return <div className="text-center py-8 text-destructive">Error loading community plans.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Community Workout Plans</h1>
      </div>
      <div className="space-y-4">
        {plans && plans.length > 0 ? plans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {Object.keys(plan.days as object).length > 0 ? (
                  Object.entries(plan.days as Partial<Record<Day, string[]>>).map(([day, exercises]) => (
                    <AccordionItem value={day} key={day}>
                      <AccordionTrigger>
                        <span>{day}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        {exercises.length > 0 ? (
                          <ul className="list-disc pl-5 space-y-1">
                            {exercises.map((ex, i) => <li key={i}>{ex}</li>)}
                          </ul>
                        ) : (
                          <p className="text-muted-foreground text-sm">No exercises for this day.</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">This plan currently has no scheduled days.</p>
                )}
              </Accordion>
            </CardContent>
          </Card>
        )) : (
          <p className="text-muted-foreground text-center py-8">No public workout plans available yet. Be the first to share one!</p>
        )}
      </div>
    </div>
  );
};

export default CommunityPlans;
