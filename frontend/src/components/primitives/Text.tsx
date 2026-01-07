import React from 'react';

interface TextProps {
    content: string;
    variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
    align?: 'left' | 'center' | 'right';
    emphasis?: 'normal' | 'bold' | 'muted';
}

export const Text: React.FC<TextProps> = ({ 
    content, 
    variant = 'body', 
    align = 'left',
    emphasis = 'normal'
}) => {
    const variantStyles: Record<string, string> = {
        h1: 'text-4xl font-bold tracking-tight',
        h2: 'text-2xl font-semibold',
        h3: 'text-xl font-medium',
        body: 'text-base',
        caption: 'text-sm text-muted-foreground'
    };

    const alignStyles: Record<string, string> = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
    };

    const emphasisStyles: Record<string, string> = {
        normal: 'text-foreground',
        bold: 'font-bold text-foreground',
        muted: 'text-muted-foreground'
    };

    const className = `${variantStyles[variant]} ${alignStyles[align]} ${emphasisStyles[emphasis]}`;

    // Safe render: use specific element based on variant
    if (variant === 'h1') return <h1 className={className}>{content}</h1>;
    if (variant === 'h2') return <h2 className={className}>{content}</h2>;
    if (variant === 'h3') return <h3 className={className}>{content}</h3>;
    
    return <p className={className}>{content}</p>;
};
