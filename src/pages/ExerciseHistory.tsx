
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared/Card';
import SkeletonLoader from '@/components/shared/SkeletonLoader';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWorkoutHistory, updateWorkoutLog, deleteWorkoutLog, WorkoutLog, UpdateWorkoutLog } from '@/queries/workouts';
import { Calendar } from '@/components/ui/calendar';

type HistoryItem = WorkoutLog;

const ExerciseHistory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const { data: history = [], isLoading, isError, error } = useQuery<HistoryItem[]>({
    queryKey: ['workoutHistory'],
    queryFn: getWorkoutHistory,
  });
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<HistoryItem | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<HistoryItem>>({});

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteWorkoutLog,
    onSuccess: () => {
      toast({
        title: 'Workout Deleted',
        description: 'The workout has been removed from your history.',
        variant: 'destructive',
      });
      queryClient.invalidateQueries({ queryKey: ['workoutHistory'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    },
    onError: (err) => {
      toast({ title: 'Error deleting workout', description: err.message, variant: 'destructive' });
    },
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: (vars: { id: string; updates: UpdateWorkoutLog }) => updateWorkoutLog(vars.id, vars.updates),
    onSuccess: () => {
      toast({
        title: 'Workout Updated',
        description: 'Your workout has been successfully updated.',
      });
      queryClient.invalidateQueries({ queryKey: ['workoutHistory'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      setIsEditDialogOpen(false);
      setEditingItem(null);
    },
    onError: (err) => {
      toast({ title: 'Error updating workout', description: err.message, variant: 'destructive' });
    },
  });

  const handleDelete = (id: string) => {
    deleteMutate(id);
  };

  const handleEdit = (item: HistoryItem) => {
    setEditingItem(item);
    setEditFormData({
        name: item.name,
        duration_hours: item.duration_hours ? item.duration_hours * 60 : undefined,
        distance_km: item.distance_km || undefined,
        sets: item.sets || undefined,
        reps: item.reps || undefined,
    });
    setIsEditDialogOpen(true);
  };
  
  const handleUpdate = () => {
    if (!editingItem) return;

    const updates: UpdateWorkoutLog = {
        name: editFormData.name,
        duration_hours: editFormData.duration_hours ? Number(editFormData.duration_hours) / 60 : null,
        distance_km: editFormData.distance_km ? Number(editFormData.distance_km) : null,
        sets: editFormData.sets ? Number(editFormData.sets) : null,
        reps: editFormData.reps ? Number(editFormData.reps) : null,
    }

    updateMutate({ id: editingItem.id, updates });
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [id]: type === 'number' ? (value === '' ? undefined : Number(value)) : value,
    }));
  }

  const filteredHistory = selectedDate
    ? history.filter(item => new Date(item.created_at).toDateString() === selectedDate.toDateString())
    : history;

  if (isLoading) return <SkeletonLoader />;
  if (isError) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Exercise History</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <div className="lg:col-span-1">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            initialFocus
          />
        </div>
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Your Past Workouts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Exercise</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stats</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.length > 0 ? (
                    filteredHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          {item.duration_hours && `${Math.round(item.duration_hours * 60)} min `}
                          {item.sets && `${item.sets}x${item.reps} `}
                          {item.distance_km && `${item.distance_km} km`}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        {selectedDate ? "No workouts found for this date." : "No workouts recorded yet."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Workout</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Exercise Name</Label>
                <Input id="name" value={editFormData.name || ''} onChange={handleEditFormChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration_hours">Duration (min)</Label>
                <Input id="duration_hours" type="number" value={editFormData.duration_hours || ''} onChange={handleEditFormChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="distance_km">Distance (km)</Label>
                <Input id="distance_km" type="number" value={editFormData.distance_km || ''} onChange={handleEditFormChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sets">Sets</Label>
                <Input id="sets" type="number" value={editFormData.sets || ''} onChange={handleEditFormChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reps">Reps</Label>
                <Input id="reps" type="number" value={editFormData.reps || ''} onChange={handleEditFormChange} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExerciseHistory;
