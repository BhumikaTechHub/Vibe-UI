import React from 'react';

interface ButtonProps {
    label: string;
    action?: string; // ID of the action to trigger
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    fullWidth?: boolean;
    onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ 
    label, 
    variant = 'primary', 
    fullWidth = false,
    onClick 
}) => {
    const variantStyles: Record<string, string> = {
        primary: 'bg-accent text-accent-foreground hover:opacity-90 shadow-md',
        secondary: 'bg-muted text-foreground hover:bg-muted/80',
        ghost: 'bg-transparent hover:bg-muted/50 text-foreground',
        danger: 'bg-red-500 text-white hover:bg-red-600'
    };

    const widthStyle = fullWidth ? 'w-full' : 'w-auto';
    const baseStyle = 'px-6 py-3 rounded-xl font-medium transition-all active:scale-[0.98]';

    return (
        <button 
            className={`${baseStyle} ${variantStyles[variant]} ${widthStyle}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};
