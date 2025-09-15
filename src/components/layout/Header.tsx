import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, User, LogOut, Settings, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useAuth } from '@/hooks';
import { cn } from '@/utils';

interface HeaderProps {
  onMenuClick?: () => void;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, className }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className={cn(
      'border-b border-border bg-background px-4 py-3 shadow-sm',
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {onMenuClick && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="lg:hidden"
              icon={Menu}
            />
          )}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-orange-600"></div>
            <span className="text-xl font-bold text-foreground">CharHub</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span>{user?.credits || 0} créditos</span>
              </div>

              <ThemeToggle />

              <div className="relative group">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-1 w-48 bg-card rounded-lg shadow-lg border border-border py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium text-card-foreground">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>

                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-card-foreground hover:bg-muted"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Perfil
                  </Link>

                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-card-foreground hover:bg-muted"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Configurações
                  </Link>

                  <Link
                    to="/billing"
                    className="flex items-center px-4 py-2 text-sm text-card-foreground hover:bg-muted"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Créditos
                  </Link>

                  <hr className="my-1" />

                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
              >
                Entrar
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate('/register')}
              >
                Criar Conta
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};