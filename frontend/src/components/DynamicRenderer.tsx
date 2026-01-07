import React from 'react';
import { UIComponent } from '../types/uiSchema';
import { Container } from './primitives/Container';
import { Text } from './primitives/Text';
import { Button } from './primitives/Button';

interface DynamicRendererProps {
    component: UIComponent;
}

export const DynamicRenderer: React.FC<DynamicRendererProps> = ({ component }) => {
    // Recursive rendering of children
    const renderChildren = () => {
        return component.children?.map((child, index) => (
            <DynamicRenderer key={child.id || index} component={child} />
        ));
    };

    switch (component.type) {
        case 'container':
            return (
                <Container className={component.props?.className} {...component.props}>
                    {renderChildren()}
                </Container>
            );
        
        case 'text':
            return (
                <Text 
                    content={component.props?.content || ''} 
                    {...component.props} 
                />
            );
        
        case 'button':
            return (
                <Button 
                    label={component.props?.label || 'Click me'} 
                    {...component.props} 
                />
            );
        
        default:
            console.warn(`Unknown component type: ${component.type}`);
            return null;
    }
};
