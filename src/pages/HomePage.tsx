import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to CharHub
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Create, manage, and interact with your AI characters
          </p>
          <div className="space-x-4">
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
              Get Started
            </button>
            <button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;