import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useAuth } from '@/hooks';
import { Users, MessageSquare, BookOpen, Sparkles } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Users,
      title: 'Personagens AI',
      description: 'Crie e personalize personagens únicos com personalidades distintas'
    },
    {
      icon: MessageSquare,
      title: 'Chat Interativo',
      description: 'Converse em tempo real com seus personagens através de IA avançada'
    },
    {
      icon: BookOpen,
      title: 'Histórias Colaborativas',
      description: 'Desenvolva histórias envolventes com seus personagens'
    },
    {
      icon: Sparkles,
      title: 'IA Generativa',
      description: 'Utilize múltiplas IAs para criar conteúdo de qualidade'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-foreground mb-6">
            Bem-vindo ao <span className="text-primary">CharHub</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Crie, gerencie e interaja com personagens AI únicos.
            Desenvolva histórias envolventes e converse com suas criações através
            de inteligência artificial avançada.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Button
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="text-lg px-8 py-4"
              >
                Ir para Dashboard
              </Button>
            ) : (
              <>
                <Button
                  size="lg"
                  onClick={() => navigate('/register')}
                  className="text-lg px-8 py-4"
                >
                  Começar Agora
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/login')}
                  className="text-lg px-8 py-4"
                >
                  Fazer Login
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border"
            >
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-card rounded-2xl p-8 mt-20 text-center border border-border shadow-sm">
          <h2 className="text-2xl font-bold text-card-foreground mb-4">
            Pronto para começar sua jornada criativa?
          </h2>
          <p className="text-muted-foreground mb-6">
            Junte-se a milhares de criadores que já estão usando o CharHub
          </p>
          {!isAuthenticated && (
            <Button
              size="lg"
              onClick={() => navigate('/register')}
            >
              Criar Conta Gratuita
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;