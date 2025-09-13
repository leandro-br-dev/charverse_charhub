import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-lg p-6 shadow">
            <h3 className="text-sm font-medium text-muted-foreground">Characters</h3>
            <p className="text-2xl font-bold text-foreground">0</p>
          </div>
          <div className="bg-card rounded-lg p-6 shadow">
            <h3 className="text-sm font-medium text-muted-foreground">Stories</h3>
            <p className="text-2xl font-bold text-foreground">0</p>
          </div>
          <div className="bg-card rounded-lg p-6 shadow">
            <h3 className="text-sm font-medium text-muted-foreground">Credits</h3>
            <p className="text-2xl font-bold text-foreground">100</p>
          </div>
          <div className="bg-card rounded-lg p-6 shadow">
            <h3 className="text-sm font-medium text-muted-foreground">Chat Sessions</h3>
            <p className="text-2xl font-bold text-foreground">0</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold text-foreground mb-4">Recent Characters</h2>
            <p className="text-muted-foreground">No characters yet. Create your first character to get started!</p>
          </div>
          <div className="bg-card rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
            <p className="text-muted-foreground">Welcome to CharHub! Your activity will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;