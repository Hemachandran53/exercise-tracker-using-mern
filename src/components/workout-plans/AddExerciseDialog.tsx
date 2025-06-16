
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

interface AddExerciseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  day: Day | null;
  onAddExercise: (exerciseName: string) => void;
  isAdding: boolean;
}

export const AddExerciseDialog = ({ open, onOpenChange, day, onAddExercise, isAdding }: AddExerciseDialogProps) => {
  const [newExerciseName, setNewExerciseName] = useState('');

  const handleAdd = () => {
    onAddExercise(newExerciseName);
  };
  
  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      setNewExerciseName('');
    }
  }

  useEffect(() => {
    if (open) {
      setNewExerciseName('');
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Exercise to {day}</DialogTitle>
          <DialogDescription>Enter the name of the exercise you want to add.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="exerciseName">Exercise Name</Label>
            <Input id="exerciseName" placeholder="e.g., Push Ups" value={newExerciseName} onChange={(e) => setNewExerciseName(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleAdd} disabled={isAdding}>
            {isAdding ? 'Adding...' : 'Add Exercise'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
