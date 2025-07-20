import { type ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const baseClasses = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

        const variantClasses = {
            primary: "bg-primary-500 text-white hover:bg-primary-600 shadow-sm",
            outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
            ghost: "bg-transparent hover:bg-gray-100",
        };

        const sizeClasses = {
            sm: "px-3 py-1.5 text-sm",
            md: "px-4 py-2 text-base",
            lg: "px-6 py-3 text-lg",
        };

        const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} rounded-lg ${className || ''}`;

        return (
            <button
                className={classes}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export default Button;