export type UIComponentType = 'container' | 'text' | 'button' | 'input';

export interface UIComponent {
    type: UIComponentType;
    id?: string;
    props?: Record<string, any>;
    children?: UIComponent[];
}

export interface UISchema {
    root: UIComponent;
    vibe?: string;
}
