
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface CreatePlanDialogProps {
  onCreatePlan: (name: string, privacy: 'Private' | 'Public') => void;
  isCreating: boolean;
  onDialogOpen: (isOpen: boolean) => void;
  isDialogOpen: boolean;
}

export const CreatePlanDialog = ({ onCreatePlan, isCreating, onDialogOpen, isDialogOpen }: CreatePlanDialogProps) => {
  const [newPlanName, setNewPlanName] = useState('');
  const [newPlanPrivacy, setNewPlanPrivacy] = useState<'Private' | 'Public'>('Private');

  const handleCreate = () => {
    onCreatePlan(newPlanName, newPlanPrivacy);
  };
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => {
      onDialogOpen(open);
      if (!open) {
        setNewPlanName('');
        setNewPlanPrivacy('Private');
      }
    }}>
      <DialogTrigger asChild>
        <Button>Create New Plan</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Workout Plan</DialogTitle>
          <DialogDescription>Give your new plan a name to get started.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="planName">Plan Name</Label>
            <Input id="planName" placeholder="e.g., My Awesome Plan" value={newPlanName} onChange={(e) => setNewPlanName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Privacy</Label>
            <RadioGroup defaultValue="Private" value={newPlanPrivacy} onValueChange={(value) => setNewPlanPrivacy(value as 'Private' | 'Public')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Private" id="privacy-private" />
                <Label htmlFor="privacy-private">Private</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Public" id="privacy-public" />
                <Label htmlFor="privacy-public">Public</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreate} disabled={isCreating}>
            {isCreating ? 'Creating...' : 'Create Plan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
