
import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/shared/Card';
import SkeletonLoader from '@/components/shared/SkeletonLoader';
import { exerciseLibrary as initialExerciseLibrary } from '@/data/mock';
import { Input } from '@/components/ui/input';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

type Exercise = typeof initialExerciseLibrary[0];

const ExerciseLibrary = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [exercises, setExercises] = useState(initialExerciseLibrary);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredExercises = useMemo(() => {
    return exercises.filter((ex) =>
      ex.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [exercises, searchTerm]);

  const toggleFavorite = (id: number) => {
    setExercises(prevExercises =>
      prevExercises.map(ex => {
        if (ex.id === id) {
          const newFavStatus = !ex.favorite;
          toast({
            title: newFavStatus ? "Added to favorites!" : "Removed from favorites!",
            description: `${ex.name} has been updated.`,
          });
          return { ...ex, favorite: newFavStatus };
        }
        return ex;
      })
    );
  };

  if (loading) return <SkeletonLoader />;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Exercise Library</h1>
      <Input
        placeholder="Search for an exercise..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredExercises.map((ex) => (
          <div key={ex.id} onClick={() => setSelectedExercise(ex)} className="cursor-pointer">
            <Card className="overflow-hidden h-full">
              <img src={ex.thumbnail} alt={ex.name} className="h-40 w-full object-cover" />
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{ex.name}</h3>
                    <p className="text-sm text-muted-foreground">{ex.category}</p>
                  </div>
                  <Heart
                    className={cn(
                      "h-5 w-5 cursor-pointer transition-colors z-10",
                      ex.favorite
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400 hover:text-red-400"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(ex.id);
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <Dialog open={!!selectedExercise} onOpenChange={(isOpen) => !isOpen && setSelectedExercise(null)}>
        <DialogContent>
          {selectedExercise && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedExercise.name}</DialogTitle>
                <DialogDescription>{selectedExercise.category}</DialogDescription>
              </DialogHeader>
              <div>
                <img src={selectedExercise.thumbnail} alt={selectedExercise.name} className="h-60 w-full object-cover rounded-md mb-4" />
                <p>More details about how to perform {selectedExercise.name} would be shown here. This could include instructions, video demonstrations, and common mistakes to avoid.</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExerciseLibrary;
