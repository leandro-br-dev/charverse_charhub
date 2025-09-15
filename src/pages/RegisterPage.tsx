import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import ThemeToggle from '../components/ui/ThemeToggle';
import SocialAuthButton from '../components/ui/SocialAuthButton';
import { useAuthStore } from '../stores/authStore';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

const registerSchema = z.object({
  username: z.string().min(3, 'Nome de usuário deve ter pelo menos 3 caracteres').max(50, 'Nome de usuário deve ter no máximo 50 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuthStore();
  const [socialLoading, setSocialLoading] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
      navigate('/dashboard');
    } catch (error: any) {
      if (error.response?.data?.message === 'Email is already registered') {
        setError('email', { message: 'Email já está em uso' });
      } else if (error.response?.data?.message === 'Username is already taken') {
        setError('username', { message: 'Nome de usuário já está em uso' });
      } else {
        setError('root', {
          message: error.response?.data?.message || 'Erro no registro. Tente novamente.'
        });
      }
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'facebook') => {
    setSocialLoading(provider);
    try {
      // TODO: Implementar autenticação social no backend
      console.log(`Registro/Autenticação ${provider} será implementada no backend`);
      // Temporary mock
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(`Registro/Autenticação ${provider} ainda não foi implementada no backend.`);
    } catch (error) {
      console.error(`Erro na autenticação ${provider}:`, error);
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full mb-4">
            <UserPlus size={32} />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Criar Conta
          </h1>
          <p className="text-muted-foreground">
            Junte-se ao CharVerse e comece sua jornada criativa
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              {...register('username')}
              type="text"
              placeholder="Nome de usuário"
              error={errors.username?.message}
              leftIcon={<User size={20} />}
              disabled={isLoading}
            />
          </div>

          <div>
            <Input
              {...register('email')}
              type="email"
              placeholder="Email"
              error={errors.email?.message}
              leftIcon={<Mail size={20} />}
              disabled={isLoading}
            />
          </div>

          <div>
            <Input
              {...register('password')}
              type="password"
              placeholder="Senha"
              error={errors.password?.message}
              leftIcon={<Lock size={20} />}
              disabled={isLoading}
            />
          </div>

          <div>
            <Input
              {...register('confirmPassword')}
              type="password"
              placeholder="Confirmar senha"
              error={errors.confirmPassword?.message}
              leftIcon={<Lock size={20} />}
              disabled={isLoading}
            />
          </div>

          {errors.root && (
            <div className="text-red-600 dark:text-red-400 text-sm text-center">
              {errors.root.message}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            loading={isLoading}
          >
            {isLoading ? 'Criando conta...' : 'Criar Conta'}
          </Button>
        </form>

        {/* Social Authentication */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Ou registre-se com</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <SocialAuthButton
              provider="google"
              onClick={() => handleSocialAuth('google')}
              isLoading={socialLoading === 'google'}
              disabled={socialLoading !== null}
            />
            <SocialAuthButton
              provider="facebook"
              onClick={() => handleSocialAuth('facebook')}
              isLoading={socialLoading === 'facebook'}
              disabled={socialLoading !== null}
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            Já tem uma conta?{' '}
            <Link
              to="/login"
              className="text-primary hover:text-primary/80 font-medium hover:underline"
            >
              Faça login
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Ao criar uma conta, você concorda com nossos{' '}
            <a href="#" className="text-primary hover:underline">
              Termos de Serviço
            </a>{' '}
            e{' '}
            <a href="#" className="text-primary hover:underline">
              Política de Privacidade
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;