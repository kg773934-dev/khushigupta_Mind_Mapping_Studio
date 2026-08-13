export type NodeShape = 'rectangle' | 'rounded-rectangle' | 'circle' | 'diamond';

export type NodeColor = 
  | 'blue' 
  | 'emerald' 
  | 'amber' 
  | 'purple' 
  | 'rose' 
  | 'indigo' 
  | 'teal' 
  | 'orange' 
  | 'slate';

export interface MindMapNode {
  id: string;
  text: string;
  x: number;
  y: number;
  color: NodeColor;
  shape: NodeShape;
  fontSize?: number;
  width?: number;
  height?: number;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  label?: string;
  color?: string;
  animated?: boolean;
}

export interface MindMap {
  id: string;
  name: string;
  nodes: MindMapNode[];
  edges: Edge[];
  createdAt: string;
  updatedAt: string;
  description?: string;
  category?: 'study' | 'business' | 'brainstorm' | 'general' | 'custom';
}

export type ActiveTab = 'dashboard' | 'editor' | 'templates' | 'saved' | 'help';

export type CanvasTool = 'select' | 'connect' | 'add' | 'pan';

export interface ColorScheme {
  id: NodeColor;
  name: string;
  bg: string;
  border: string;
  text: string;
  ring: string;
  badge: string;
}

export const COLOR_SCHEMES: Record<NodeColor, ColorScheme> = {
  blue: {
    id: 'blue',
    name: 'Ocean Blue',
    bg: 'bg-blue-50 dark:bg-blue-950/60',
    border: 'border-blue-400 dark:border-blue-500',
    text: 'text-blue-900 dark:text-blue-100',
    ring: 'focus:ring-blue-400',
    badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/80 dark:text-blue-200'
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Green',
    bg: 'bg-emerald-50 dark:bg-emerald-950/60',
    border: 'border-emerald-400 dark:border-emerald-500',
    text: 'text-emerald-900 dark:text-emerald-100',
    ring: 'focus:ring-emerald-400',
    badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/80 dark:text-emerald-200'
  },
  amber: {
    id: 'amber',
    name: 'Warm Amber',
    bg: 'bg-amber-50 dark:bg-amber-950/60',
    border: 'border-amber-400 dark:border-amber-500',
    text: 'text-amber-900 dark:text-amber-100',
    ring: 'focus:ring-amber-400',
    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/80 dark:text-amber-200'
  },
  purple: {
    id: 'purple',
    name: 'Royal Purple',
    bg: 'bg-purple-50 dark:bg-purple-950/60',
    border: 'border-purple-400 dark:border-purple-500',
    text: 'text-purple-900 dark:text-purple-100',
    ring: 'focus:ring-purple-400',
    badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/80 dark:text-purple-200'
  },
  rose: {
    id: 'rose',
    name: 'Rose Pink',
    bg: 'bg-rose-50 dark:bg-rose-950/60',
    border: 'border-rose-400 dark:border-rose-500',
    text: 'text-rose-900 dark:text-rose-100',
    ring: 'focus:ring-rose-400',
    badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/80 dark:text-rose-200'
  },
  indigo: {
    id: 'indigo',
    name: 'Indigo Velvet',
    bg: 'bg-indigo-50 dark:bg-indigo-950/60',
    border: 'border-indigo-400 dark:border-indigo-500',
    text: 'text-indigo-900 dark:text-indigo-100',
    ring: 'focus:ring-indigo-400',
    badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/80 dark:text-indigo-200'
  },
  teal: {
    id: 'teal',
    name: 'Teal Mint',
    bg: 'bg-teal-50 dark:bg-teal-950/60',
    border: 'border-teal-400 dark:border-teal-500',
    text: 'text-teal-900 dark:text-teal-100',
    ring: 'focus:ring-teal-400',
    badge: 'bg-teal-100 text-teal-800 dark:bg-teal-900/80 dark:text-teal-200'
  },
  orange: {
    id: 'orange',
    name: 'Sunset Orange',
    bg: 'bg-orange-50 dark:bg-orange-950/60',
    border: 'border-orange-400 dark:border-orange-500',
    text: 'text-orange-900 dark:text-orange-100',
    ring: 'focus:ring-orange-400',
    badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900/80 dark:text-orange-200'
  },
  slate: {
    id: 'slate',
    name: 'Classic Slate',
    bg: 'bg-slate-100 dark:bg-slate-800/80',
    border: 'border-slate-400 dark:border-slate-500',
    text: 'text-slate-900 dark:text-slate-100',
    ring: 'focus:ring-slate-400',
    badge: 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
  }
};
