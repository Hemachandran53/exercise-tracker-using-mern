
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared/Card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Trash2 } from 'lucide-react';
import type { WorkoutPlan } from '@/queries/workouts';

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

interface PlanCardProps {
  plan: WorkoutPlan;
  onUpdatePrivacy: (planId: string, privacy: string) => void;
  onDeletePlan: (planId: string) => void;
  onDeleteDay: (planId: string, day: Day) => void;
  onOpenAddExercise: (planId: string, day: Day) => void;
}

export const PlanCard = ({ plan, onUpdatePrivacy, onDeletePlan, onDeleteDay, onOpenAddExercise }: PlanCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{plan.name}</CardTitle>
          <div className="flex items-center space-x-2">
            <Select value={plan.privacy} onValueChange={(newPrivacy) => onUpdatePrivacy(plan.id, newPrivacy)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Private">Private</SelectItem>
                <SelectItem value="Public">Public</SelectItem>
              </SelectContent>
            </Select>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>This will permanently delete your workout plan "{plan.name}".</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDeletePlan(plan.id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {Object.keys(plan.days as object).length > 0 ? (
            Object.entries(plan.days as Partial<Record<Day, string[]>>).map(([day, exercises]) => (
              <AccordionItem value={day} key={day}>
                <AccordionTrigger>
                  <div className="flex justify-between items-center w-full pr-2">
                    <span>{day}</span>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}><Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete {day}?</AlertDialogTitle>
                          <AlertDialogDescription>Are you sure you want to remove {day} from this plan?</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={(e) => { e.stopPropagation(); onDeleteDay(plan.id, day as Day); }}>Delete Day</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {exercises.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {exercises.map((ex, i) => <li key={i}>{ex}</li>)}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground text-sm">No exercises for this day.</p>
                  )}
                  <Button variant="outline" size="sm" className="mt-4" onClick={() => onOpenAddExercise(plan.id, day as Day)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Exercise
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">This plan currently has no scheduled days.</p>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
};
