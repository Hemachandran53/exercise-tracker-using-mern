
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import SkeletonLoader from '@/components/shared/SkeletonLoader';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthProvider';
import { getWorkoutPlans, addWorkoutPlan, updateWorkoutPlan, deleteWorkoutPlan, UpdateWorkoutPlan, NewWorkoutPlan } from '@/queries/workouts';
import { CreatePlanDialog } from '@/components/workout-plans/CreatePlanDialog';
import { AddExerciseDialog } from '@/components/workout-plans/AddExerciseDialog';
import { PlanCard } from '@/components/workout-plans/PlanCard';

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

const WorkoutPlans = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false);
  const [isAddExerciseOpen, setIsAddExerciseOpen] = useState(false);
  const [currentPlanId, setCurrentPlanId] = useState<string | null>(null);
  const [currentDay, setCurrentDay] = useState<Day | null>(null);

  const { data: plans, isLoading: loading } = useQuery({
    queryKey: ['workoutPlans'],
    queryFn: getWorkoutPlans,
    enabled: !!user,
  });

  const createPlanMutation = useMutation({
    mutationFn: addWorkoutPlan,
    onSuccess: (newPlan) => {
      queryClient.invalidateQueries({ queryKey: ['workoutPlans'] });
      toast({
        title: "Plan Created!",
        description: `${newPlan.name} has been added to your workout plans.`,
      });
      setIsCreatePlanOpen(false);
    },
    onError: () => {
        toast({ title: "Error", description: "Failed to create plan.", variant: "destructive" });
    }
  });
  
  const updatePlanMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: UpdateWorkoutPlan }) => updateWorkoutPlan(id, updates),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['workoutPlans'] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update plan.", variant: "destructive" });
    }
  });
  
  const deletePlanMutation = useMutation({
    mutationFn: deleteWorkoutPlan,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['workoutPlans'] });
        toast({ title: "Plan Deleted", description: "The workout plan has been removed." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete plan.", variant: "destructive" });
    }
  });

  const handleCreatePlan = (name: string, privacy: 'Private' | 'Public') => {
    if (!name) {
      toast({ title: "Plan name is required", variant: "destructive" });
      return;
    }
    if (!user) {
        toast({ title: "Authentication Error", description: "You must be logged in to create a plan.", variant: "destructive" });
        return;
    }
    const newPlan: NewWorkoutPlan = {
      name: name,
      user_id: user.id,
      privacy: privacy,
      days: {
        Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: [],
      }
    };
    createPlanMutation.mutate(newPlan);
  };

  const handleUpdatePrivacy = (planId: string, privacy: string) => {
    updatePlanMutation.mutate({ id: planId, updates: { privacy } }, {
        onSuccess: () => {
            toast({ title: "Privacy Updated", description: `Plan is now ${privacy}.` });
        }
    });
  };

  const handleDeletePlan = (planId: string) => {
    deletePlanMutation.mutate(planId);
  };

  const openAddExerciseModal = (planId: string, day: Day) => {
    setCurrentPlanId(planId);
    setCurrentDay(day);
    setIsAddExerciseOpen(true);
  };

  const handleAddExercise = (exerciseName: string) => {
    if (!exerciseName || !currentPlanId || !currentDay) return;
    const plan = plans?.find(p => p.id === currentPlanId);
    if (!plan) return;

    const days = plan.days as Partial<Record<Day, string[]>>;
    const updatedDays = { ...days };
    updatedDays[currentDay] = [...(updatedDays[currentDay] || []), exerciseName];
    
    updatePlanMutation.mutate({ id: currentPlanId, updates: { days: updatedDays } }, {
        onSuccess: () => {
            toast({ title: "Exercise Added", description: `${exerciseName} added to ${currentDay}.` });
            setIsAddExerciseOpen(false);
        }
    });
  };
  
  const handleDeleteDay = (planId: string, day: Day) => {
    const plan = plans?.find(p => p.id === planId);
    if (!plan) return;

    const days = plan.days as Partial<Record<Day, string[]>>;
    const newDays = { ...days };
    delete newDays[day];

    updatePlanMutation.mutate({ id: planId, updates: { days: newDays } }, {
        onSuccess: () => {
            toast({ title: "Day Deleted", description: `${day} has been removed from the plan.` });
        }
    });
  };

  if (loading) return <SkeletonLoader />;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <p className="text-lg text-muted-foreground">Please log in to manage your workout plans.</p>
        <p className="text-sm text-muted-foreground mt-2">Once logged in, your personalized workout plans will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Workout Plans</h1>
        <CreatePlanDialog
          isDialogOpen={isCreatePlanOpen}
          onDialogOpen={setIsCreatePlanOpen}
          onCreatePlan={handleCreatePlan}
          isCreating={createPlanMutation.isPending}
        />
      </div>
      <div className="space-y-4">
        {plans && plans.length > 0 ? plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onUpdatePrivacy={handleUpdatePrivacy}
            onDeletePlan={handleDeletePlan}
            onDeleteDay={handleDeleteDay}
            onOpenAddExercise={openAddExerciseModal}
          />
        )) : (
          <p className="text-muted-foreground text-center py-8">You don't have any workout plans yet. Create one to get started!</p>
        )}
      </div>
      <AddExerciseDialog
        open={isAddExerciseOpen}
        onOpenChange={setIsAddExerciseOpen}
        day={currentDay}
        onAddExercise={handleAddExercise}
        isAdding={updatePlanMutation.isPending}
      />
    </div>
  );
};

export default WorkoutPlans;
