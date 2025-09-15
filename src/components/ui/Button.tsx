import React from 'react';
import { Button as HeadlessButton } from '@headlessui/react';
import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary hover:bg-primary/90 text-primary-foreground focus:ring-primary/20',
        secondary: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground focus:ring-secondary/20',
        destructive: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500/20 dark:bg-red-700 dark:hover:bg-red-800',
        outline: 'border border-border bg-background hover:bg-muted text-foreground focus:ring-primary/20',
        ghost: 'bg-transparent hover:bg-muted text-foreground focus:ring-primary/20',
        link: 'text-primary hover:text-primary/80 underline-offset-4 hover:underline focus:ring-primary/20',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        default: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 text-lg',
        icon: 'h-10 w-10',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        default: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      rounded: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: LucideIcon | React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    rounded,
    asChild = false,
    children,
    icon,
    iconPosition = 'left',
    loading = false,
    disabled,
    ...props
  }, ref) => {
    const isIconOnly = !children && icon;
    const actualSize = isIconOnly ? 'icon' : size;
    const actualRounded = isIconOnly ? 'full' : rounded;
    const isDisabled = disabled || loading;

    const renderIcon = (Icon: LucideIcon | React.ReactNode) => {
      if (React.isValidElement(Icon)) {
        return Icon;
      }
      if (typeof Icon === 'function') {
        const IconComponent = Icon as LucideIcon;
        return <IconComponent className="h-4 w-4" />;
      }
      return Icon;
    };

    const LoadingSpinner = () => (
      <svg
        className="h-4 w-4 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    return (
      <HeadlessButton
        className={cn(buttonVariants({ variant, size: actualSize, rounded: actualRounded, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {!loading && icon && iconPosition === 'left' && (
          <span className={cn(children && 'mr-2')}>
            {renderIcon(icon)}
          </span>
        )}
        {children}
        {!loading && icon && iconPosition === 'right' && (
          <span className={cn(children && 'ml-2')}>
            {renderIcon(icon)}
          </span>
        )}
      </HeadlessButton>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };