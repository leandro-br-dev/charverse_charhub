import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './router';
import './index.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground">
        <AppRouter />
      </div>
    </QueryClientProvider>
  );
}

export default App;
