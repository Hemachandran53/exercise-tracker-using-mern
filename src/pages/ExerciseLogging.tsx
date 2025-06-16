
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addWorkoutLog, NewWorkoutLog } from '@/queries/workouts';
import { useAuth } from '@/contexts/AuthProvider';

const initialFormState = {
  name: '',
  category: '',
  duration: '',
  distance: '',
  sets: '',
  reps: '',
  notes: '',
  calories: '',
};

const ExerciseLogging = () => {
  const [formData, setFormData] = useState(initialFormState);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { mutate: saveWorkout, isPending } = useMutation({
    mutationFn: addWorkoutLog,
    onSuccess: () => {
      toast({
        title: 'Exercise Saved!',
        description: 'Your workout has been logged successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['workoutHistory'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      setFormData(initialFormState);
    },
    onError: (error) => {
      toast({
        title: 'Error Saving Exercise',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...initialFormState, name: prev.name, notes: prev.notes, category: value }));
  };

  const handleSave = () => {
    if (!user) {
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to save an exercise.',
        variant: 'destructive',
      });
      return;
    }

    const newWorkout: NewWorkoutLog = {
      user_id: user.id,
      name: formData.name,
      category: formData.category,
      duration_hours: Number(formData.duration) / 60,
      calories_burned: Number(formData.calories) || 0,
      distance_km: formData.distance ? Number(formData.distance) : null,
      sets: formData.sets ? Number(formData.sets) : null,
      reps: formData.reps ? Number(formData.reps) : null,
      notes: formData.notes || null,
    };
    
    saveWorkout(newWorkout);
  };
  
  const handleCancel = () => {
    setFormData(initialFormState);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Log New Exercise</h1>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Workout Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Exercise Name</Label>
            <Input id="name" placeholder="e.g., Bench Press" value={formData.name} onChange={handleInputChange}/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={handleCategoryChange} value={formData.category}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input id="duration" type="number" placeholder="e.g., 30" value={formData.duration} onChange={handleInputChange} />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="calories">Calories Burned</Label>
            <Input id="calories" type="number" placeholder="e.g., 150" value={formData.calories} onChange={handleInputChange} />
          </div>

          {formData.category === 'cardio' && (
            <div className="space-y-2">
              <Label htmlFor="distance">Distance (km)</Label>
              <Input id="distance" type="number" placeholder="e.g., 5" value={formData.distance} onChange={handleInputChange} />
            </div>
          )}

          {formData.category === 'strength' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sets">Sets</Label>
                <Input id="sets" type="number" placeholder="e.g., 3" value={formData.sets} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reps">Reps</Label>
                <Input id="reps" type="number" placeholder="e.g., 12" value={formData.reps} onChange={handleInputChange} />
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="e.g., Felt strong today!" value={formData.notes} onChange={handleInputChange} />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSave} disabled={!formData.name || !formData.category || isPending}>
              {isPending ? 'Saving...' : 'Save Exercise'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExerciseLogging;
