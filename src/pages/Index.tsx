
// src/pages/Index.tsx: This is the landing page of the application.
// It includes a hero section, feature cards, and calls to action.
// Since there's no authentication, it directs users to the dashboard.

import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/shared/Card';
import { BarChart, Dumbbell, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: 'Track Your Progress',
    description: 'Log every workout and see your progress over time with detailed charts and stats.',
  },
  {
    icon: <Dumbbell className="h-10 w-10 text-secondary" />,
    title: 'Custom Workout Plans',
    description: 'Create and follow personalized workout plans tailored to your fitness goals.',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Join Community Challenges',
    description: 'Stay motivated by joining community challenges and competing on the leaderboard.',
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="font-bold text-lg text-primary">
            FitTrack
          </Link>
          <div className="space-x-2">
            <Button variant="ghost" onClick={() => navigate('/auth')}>Login</Button>
            <Button onClick={() => navigate('/auth')}>Sign Up</Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container text-center py-20 sm:py-32">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-4 flex items-center justify-center gap-3">
            Achieve Your Fitness Goals
            <img src="/lovable-uploads/93771cfd-8f79-43fd-acee-0ebc1bd6f4c5.png" alt="Fitness Icon" className="h-12 w-12 sm:h-16 sm:w-16" />
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
            The ultimate companion for tracking your workouts, creating plans, and staying motivated on your fitness journey.
          </p>
          <Link to="/dashboard">
            <Button size="lg">Get Started</Button>
          </Link>
        </section>

        {/* Features Section */}
        <section className="container py-20 sm:py-24 bg-muted/40 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            Everything You Need to Succeed
            <img src="/lovable-uploads/93771cfd-8f79-43fd-acee-0ebc1bd6f4c5.png" alt="Fitness Icon" className="h-8 w-8" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="flex items-center justify-center gap-2">
                    {feature.title}
                    <img src="/lovable-uploads/93771cfd-8f79-43fd-acee-0ebc1bd6f4c5.png" alt="Fitness Icon" className="h-5 w-5" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="container text-center py-8 mt-16 border-t">
          <p className="text-sm text-muted-foreground">© 2025 FitTrack. All Rights Reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
