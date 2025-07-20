import { type HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> { }

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={`bg-white rounded-xl shadow-card p-6 ${className || ''}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

export default Card;