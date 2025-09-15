import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';
import { useAuth } from '@/hooks';
import {
  Users,
  BookOpen,
  MessageSquare,
  CreditCard,
  TrendingUp,
  Calendar,
  Sparkles
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Personagens',
      value: '3',
      change: '+2 este mês',
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-muted',
    },
    {
      title: 'Histórias',
      value: '5',
      change: '+1 esta semana',
      icon: BookOpen,
      color: 'text-primary',
      bgColor: 'bg-muted',
    },
    {
      title: 'Conversas',
      value: '12',
      change: '+8 hoje',
      icon: MessageSquare,
      color: 'text-primary',
      bgColor: 'bg-muted',
    },
    {
      title: 'Créditos',
      value: user?.credits?.toString() || '100',
      change: 'Renovado em 7 dias',
      icon: CreditCard,
      color: 'text-primary',
      bgColor: 'bg-muted',
    },
  ];

  const quickActions = [
    {
      title: 'Criar Personagem',
      description: 'Crie um novo personagem AI',
      icon: Users,
      action: () => navigate('/characters/create'),
      color: 'bg-primary hover:bg-primary/90',
    },
    {
      title: 'Nova História',
      description: 'Comece uma nova história',
      icon: BookOpen,
      action: () => navigate('/stories/create'),
      color: 'bg-primary hover:bg-primary/90',
    },
    {
      title: 'Iniciar Chat',
      description: 'Converse com seus personagens',
      icon: MessageSquare,
      action: () => navigate('/chat'),
      color: 'bg-primary hover:bg-primary/90',
    },
  ];

  const recentActivity = [
    {
      action: 'Criou o personagem "Luna"',
      time: '2 horas atrás',
      icon: Users,
    },
    {
      action: 'Publicou a história "Aventuras no Espaço"',
      time: '1 dia atrás',
      icon: BookOpen,
    },
    {
      action: 'Conversou com "Alex" por 45 minutos',
      time: '2 dias atrás',
      icon: MessageSquare,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Olá, {user?.name || 'Usuário'}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Seja bem-vindo de volta ao CharHub. Vamos criar algo incrível hoje?
          </p>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex-col items-start text-left hover:shadow-md"
                onClick={action.action}
              >
                <action.icon className="h-8 w-8 mb-2 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">{action.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <activity.icon className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-4"
              onClick={() => navigate('/activity')}
            >
              Ver Todas as Atividades
            </Button>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card>
          <CardHeader>
            <CardTitle>Primeiros Passos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold">✓</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Conta criada</p>
                  <p className="text-xs text-gray-500">Bem-vindo ao CharHub!</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Criar primeiro personagem</p>
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 h-auto text-xs"
                    onClick={() => navigate('/characters/create')}
                  >
                    Começar agora →
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-semibold">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Iniciar primeiro chat</p>
                  <p className="text-xs text-gray-500">Converse com seu personagem</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;