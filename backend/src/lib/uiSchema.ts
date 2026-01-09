import { z } from 'zod';

// Define the properties for each component type
const ContainerProps = z.object({
    layout: z.enum(['stack', 'row', 'grid']).optional(),
    padding: z.enum(['none', 'tight', 'normal', 'loose']).optional(),
    gap: z.enum(['none', 'tight', 'normal', 'loose']).optional(),
    background: z.string().optional(),
});

const TextProps = z.object({
    variant: z.enum(['h1', 'h2', 'h3', 'body', 'caption', 'label']).optional(),
    align: z.enum(['left', 'center', 'right']).optional(),
    emphasis: z.enum(['low', 'normal', 'high']).optional(),
    content: z.string().optional(), // Added content as it's essential for text
});

const ButtonProps = z.object({
    variant: z.enum(['primary', 'secondary', 'ghost', 'destructive']).optional(),
    size: z.enum(['small', 'medium', 'large']).optional(),
    fullWidth: z.boolean().optional(),
    label: z.string().optional(), // Added label
    action: z.string().optional(), // Semantic action identifier
});

const InputProps = z.object({
    placeholder: z.string().optional(),
    type: z.enum(['text', 'number', 'email', 'password']).optional(),
    label: z.string().optional(),
    name: z.string().optional(),
});

// Base Component Schema
const BaseComponent = z.object({
    id: z.string().optional(),
});

// Recursive definition for Container Children
// Zod requires lazy evaluation for recursion
export type UIComponent = {
    type: 'container' | 'text' | 'button' | 'input';
    props?: any;
    children?: UIComponent[];
};

const UIComponentSchema: z.ZodType<UIComponent> = z.lazy(() =>
    z.union([
        BaseComponent.extend({
            type: z.literal('container'),
            props: ContainerProps.optional(),
            children: z.array(UIComponentSchema).optional(),
        }),
        BaseComponent.extend({
            type: z.literal('text'),
            props: TextProps.optional(),
        }),
        BaseComponent.extend({
            type: z.literal('button'),
            props: ButtonProps.optional(),
        }),
        BaseComponent.extend({
            type: z.literal('input'),
            props: InputProps.optional(),
        }),
    ])
);

export const GeminiResponseSchema = z.object({
    uiSchema: UIComponentSchema,
    explanation: z.string().optional(),
});

export type GeminiResponse = z.infer<typeof GeminiResponseSchema>;
