// src/data/mock.ts: This file contains mock data for the application.
// In a real MERN stack app, this data would come from a MongoDB database.
// For now, we use this to populate the UI and make it interactive.

export const dashboardStats = {
  totalWorkouts: 78,
  caloriesBurned: 25000,
  activeDays: 120,
};

export const weeklyProgress = [
  { day: 'Mon', hours: 1.5 },
  { day: 'Tue', hours: 2 },
  { day: 'Wed', hours: 1 },
  { day: 'Thu', hours: 2.5 },
  { day: 'Fri', hours: 1.5 },
  { day: 'Sat', hours: 3 },
  { day: 'Sun', hours: 0.5 },
];

export const achievements = [
  { name: 'First 10k', icon: 'Trophy' },
  { name: '50 Workouts', icon: 'Award' },
  { name: 'Morning Bird', icon: 'Sunrise' },
  { name: 'Night Owl', icon: 'Moon' },
];

export const workoutPlans = [
  { id: 1, name: 'Full Body Beginner', privacy: 'Public', days: {
      Monday: ['Push-ups', 'Squats', 'Plank'],
      Wednesday: ['Dumbbell Rows', 'Lunges', 'Bicep Curls'],
      Friday: ['Overhead Press', 'Deadlifts', 'Tricep Dips'],
    }
  },
  { id: 2, name: 'Cardio Blast', privacy: 'Private', days: {
      Tuesday: ['Running', 'Jumping Jacks', 'Burpees'],
      Thursday: ['Cycling', 'High Knees', 'Mountain Climbers'],
    }
  },
];

export const exerciseLibrary = [
  { id: 1, name: 'Push-ups', category: 'Strength', favorite: true, thumbnail: '/placeholder.svg' },
  { id: 2, name: 'Running', category: 'Cardio', favorite: false, thumbnail: '/placeholder.svg' },
  { id: 3, name: 'Squats', category: 'Strength', favorite: false, thumbnail: '/placeholder.svg' },
  { id: 4, name: 'Yoga', category: 'Flexibility', favorite: true, thumbnail: '/placeholder.svg' },
];

export const communityChallenges = [
    { id: 1, name: '30-Day Cardio Challenge', description: 'Complete 30 minutes of cardio every day for 30 days.', participants: 150, leaderboard: [ { name: 'You', rank: 1, score: 28 }, { name: 'Jane D.', rank: 2, score: 27 }, { name: 'John S.', rank: 3, score: 25 }] },
    { id: 2, name: 'Strength Builder', description: 'Increase your max lift by 10% in 4 weeks.', participants: 80, leaderboard: [ { name: 'Mike T.', rank: 1, score: 12 }, { name: 'You', rank: 2, score: 10 }, { name: 'Sarah L.', rank: 3, score: 9 }] },
];
