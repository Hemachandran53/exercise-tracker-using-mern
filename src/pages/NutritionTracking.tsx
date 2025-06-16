
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared/Card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import useLocalStorage from '@/hooks/use-local-storage';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

type Meal = {
  id: number;
  name: string;
  calories: number;
  protein: number;
  date: string;
};

const CALORIE_GOAL = 2200;
const PROTEIN_GOAL = 150;

const NutritionTracking = () => {
  const { toast } = useToast();
  const [meals, setMeals] = useLocalStorage<Meal[]>('nutritionHistory', []);
  const [isLogMealOpen, setIsLogMealOpen] = useState(false);
  const [newMeal, setNewMeal] = useState({ name: '', calories: '', protein: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewMeal(prev => ({ ...prev, [id]: value }));
  };

  const handleLogMeal = () => {
    if (!newMeal.name || !newMeal.calories || !newMeal.protein) {
      toast({ title: "All fields are required.", variant: "destructive" });
      return;
    }
    const mealToAdd: Meal = {
      id: Date.now(),
      name: newMeal.name,
      calories: Number(newMeal.calories),
      protein: Number(newMeal.protein),
      date: new Date().toISOString().split('T')[0],
    };

    setMeals(prev => [mealToAdd, ...prev]);
    toast({ title: "Meal Logged!", description: `${newMeal.name} has been added.` });
    setNewMeal({ name: '', calories: '', protein: '' });
    setIsLogMealOpen(false);
  };
  
  const handleDeleteMeal = (mealId: number) => {
    setMeals(prev => prev.filter(m => m.id !== mealId));
    toast({ title: "Meal Deleted", description: "The meal has been removed from your log." });
  }

  const today = new Date().toISOString().split('T')[0];
  const todaysMeals = meals.filter(m => m.date === today);
  const totalCalories = todaysMeals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = todaysMeals.reduce((sum, meal) => sum + meal.protein, 0);
  const calorieProgress = Math.min((totalCalories / CALORIE_GOAL) * 100, 100);
  const proteinProgress = Math.min((totalProtein / PROTEIN_GOAL) * 100, 100);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Nutrition Tracking</h1>
        <Dialog open={isLogMealOpen} onOpenChange={setIsLogMealOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Log Meal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log a New Meal</DialogTitle>
              <DialogDescription>Enter the details of your meal below.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Meal Name</Label>
                <Input id="name" placeholder="e.g., Chicken Salad" value={newMeal.name} onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="calories">Calories (kcal)</Label>
                  <Input id="calories" type="number" placeholder="e.g., 450" value={newMeal.calories} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="protein">Protein (g)</Label>
                  <Input id="protein" type="number" placeholder="e.g., 30" value={newMeal.protein} onChange={handleInputChange} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsLogMealOpen(false)}>Cancel</Button>
              <Button onClick={handleLogMeal}>Log Meal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Calories</span>
              <span className="text-sm">{totalCalories} / {CALORIE_GOAL} kcal</span>
            </div>
            <Progress value={calorieProgress} />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Protein</span>
              <span className="text-sm">{totalProtein} / {PROTEIN_GOAL} g</span>
            </div>
            <Progress value={proteinProgress} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Today's Meals</CardTitle>
        </CardHeader>
        <CardContent>
          {todaysMeals.length > 0 ? (
            <ul className="space-y-3">
              {todaysMeals.map(meal => (
                <li key={meal.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{meal.name}</p>
                    <p className="text-sm text-muted-foreground">{meal.calories} kcal, {meal.protein}g protein</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteMeal(meal.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center py-4">No meals logged for today.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionTracking;
