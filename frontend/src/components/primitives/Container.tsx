import React from 'react';

interface ContainerProps {
    children?: React.ReactNode;
    padding?: 'none' | 'loose' | 'compact' | 'breathable';
    layout?: 'flex' | 'grid';
    direction?: 'row' | 'col';
    gap?: 'none' | 'small' | 'medium' | 'large';
    background?: 'default' | 'muted' | 'card';
    className?: string;
}

export const Container: React.FC<ContainerProps> = ({ 
    children, 
    padding = 'loose', 
    layout = 'flex', 
    direction = 'col',
    gap = 'medium',
    background = 'default',
    className = ''
}) => {
    // Whitelisted styles mapping
    const paddingMap: Record<string, string> = {
        none: 'p-0',
        loose: 'p-8',
        compact: 'p-4',
        breathable: 'p-12'
    };

    const gapMap: Record<string, string> = {
        none: 'gap-0',
        small: 'gap-2',
        medium: 'gap-4',
        large: 'gap-8'
    };

    const bgMap: Record<string, string> = {
        default: 'bg-transparent',
        muted: 'bg-muted rounded-xl',
        card: 'bg-card border border-border shadow-sm rounded-xl'
    };

    const baseClass = `flex w-full ${layout === 'flex' ? (direction === 'col' ? 'flex-col' : 'flex-row') : 'grid grid-cols-1 md:grid-cols-2'}`;
    const styles = `${baseClass} ${paddingMap[padding]} ${gapMap[gap]} ${bgMap[background]} ${className}`;

    return (
        <div className={styles}>
            {children}
        </div>
    );
};
