import { MindMap } from '../types/mindmap';

export const DEFAULT_NEW_MAP: MindMap = {
  id: 'default-new-map',
  name: 'New Mind Map',
  description: 'Starting map for new ideas and projects',
  category: 'general',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  nodes: [
    { id: 'node-main', text: 'Main Idea', x: 500, y: 300, color: 'indigo', shape: 'circle', fontSize: 18 },
    { id: 'node-1', text: 'Key Tasks', x: 250, y: 180, color: 'blue', shape: 'rounded-rectangle', fontSize: 14 },
    { id: 'node-2', text: 'Important Notes', x: 750, y: 180, color: 'amber', shape: 'rounded-rectangle', fontSize: 14 },
    { id: 'node-3', text: 'Creative Ideas', x: 250, y: 420, color: 'purple', shape: 'rounded-rectangle', fontSize: 14 },
    { id: 'node-4', text: 'Action Items', x: 750, y: 420, color: 'emerald', shape: 'rounded-rectangle', fontSize: 14 },
  ],
  edges: [
    { id: 'edge-1', source: 'node-main', target: 'node-1' },
    { id: 'edge-2', source: 'node-main', target: 'node-2' },
    { id: 'edge-3', source: 'node-main', target: 'node-3' },
    { id: 'edge-4', source: 'node-main', target: 'node-4' },
  ],
};

export const STUDY_PLANNER_TEMPLATE: MindMap = {
  id: 'template-study-planner',
  name: 'Study Planner',
  description: 'Structured roadmap for academic subjects, topics, and revision goals.',
  category: 'study',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  nodes: [
    // Main Root
    { id: 'sp-root', text: 'Study Planner', x: 500, y: 300, color: 'indigo', shape: 'diamond', fontSize: 20 },
    
    // Mathematics Branch
    { id: 'sp-math', text: 'Mathematics', x: 220, y: 150, color: 'blue', shape: 'rounded-rectangle', fontSize: 16 },
    { id: 'sp-math-alg', text: 'Algebra', x: 60, y: 80, color: 'blue', shape: 'rectangle', fontSize: 13 },
    { id: 'sp-math-calc', text: 'Calculus', x: 60, y: 150, color: 'blue', shape: 'rectangle', fontSize: 13 },
    { id: 'sp-math-prac', text: 'Practice', x: 60, y: 220, color: 'blue', shape: 'rectangle', fontSize: 13 },

    // Chemistry Branch
    { id: 'sp-chem', text: 'Chemistry', x: 780, y: 150, color: 'emerald', shape: 'rounded-rectangle', fontSize: 16 },
    { id: 'sp-chem-conc', text: 'Concepts', x: 940, y: 80, color: 'emerald', shape: 'rectangle', fontSize: 13 },
    { id: 'sp-chem-react', text: 'Reactions', x: 940, y: 150, color: 'emerald', shape: 'rectangle', fontSize: 13 },
    { id: 'sp-chem-rev', text: 'Revision', x: 940, y: 220, color: 'emerald', shape: 'rectangle', fontSize: 13 },

    // Electronics Branch
    { id: 'sp-elec', text: 'Electronics', x: 220, y: 450, color: 'purple', shape: 'rounded-rectangle', fontSize: 16 },
    { id: 'sp-elec-circ', text: 'Circuits', x: 60, y: 410, color: 'purple', shape: 'rectangle', fontSize: 13 },
    { id: 'sp-elec-comp', text: 'Components', x: 60, y: 490, color: 'purple', shape: 'rectangle', fontSize: 13 },

    // Mechanical Branch
    { id: 'sp-mech', text: 'Mechanical', x: 780, y: 450, color: 'orange', shape: 'rounded-rectangle', fontSize: 16 },
    { id: 'sp-mech-theo', text: 'Theory', x: 940, y: 410, color: 'orange', shape: 'rectangle', fontSize: 13 },
    { id: 'sp-mech-prac', text: 'Practice', x: 940, y: 490, color: 'orange', shape: 'rectangle', fontSize: 13 },
  ],
  edges: [
    // Center connections
    { id: 'e-sp-1', source: 'sp-root', target: 'sp-math' },
    { id: 'e-sp-2', source: 'sp-root', target: 'sp-chem' },
    { id: 'e-sp-3', source: 'sp-root', target: 'sp-elec' },
    { id: 'e-sp-4', source: 'sp-root', target: 'sp-mech' },

    // Math children
    { id: 'e-sp-m1', source: 'sp-math', target: 'sp-math-alg' },
    { id: 'e-sp-m2', source: 'sp-math', target: 'sp-math-calc' },
    { id: 'e-sp-m3', source: 'sp-math', target: 'sp-math-prac' },

    // Chem children
    { id: 'e-sp-c1', source: 'sp-chem', target: 'sp-chem-conc' },
    { id: 'e-sp-c2', source: 'sp-chem', target: 'sp-chem-react' },
    { id: 'e-sp-c3', source: 'sp-chem', target: 'sp-chem-rev' },

    // Electronics children
    { id: 'e-sp-e1', source: 'sp-elec', target: 'sp-elec-circ' },
    { id: 'e-sp-e2', source: 'sp-elec', target: 'sp-elec-comp' },

    // Mechanical children
    { id: 'e-sp-k1', source: 'sp-mech', target: 'sp-mech-theo' },
    { id: 'e-sp-k2', source: 'sp-mech', target: 'sp-mech-prac' },
  ],
};

export const SWOT_ANALYSIS_TEMPLATE: MindMap = {
  id: 'template-swot-analysis',
  name: 'SWOT Analysis',
  description: 'Evaluate Strengths, Weaknesses, Opportunities, and Threats for strategic planning.',
  category: 'business',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  nodes: [
    // Center Root
    { id: 'swot-root', text: 'SWOT Analysis', x: 500, y: 300, color: 'slate', shape: 'diamond', fontSize: 20 },

    // Strengths (Green)
    { id: 'swot-str', text: 'Strengths', x: 250, y: 150, color: 'emerald', shape: 'rounded-rectangle', fontSize: 16 },
    { id: 'swot-str-1', text: 'Unique Skills', x: 80, y: 100, color: 'emerald', shape: 'rectangle', fontSize: 13 },
    { id: 'swot-str-2', text: 'Key Resources', x: 80, y: 190, color: 'emerald', shape: 'rectangle', fontSize: 13 },

    // Weaknesses (Rose)
    { id: 'swot-wk', text: 'Weaknesses', x: 750, y: 150, color: 'rose', shape: 'rounded-rectangle', fontSize: 16 },
    { id: 'swot-wk-1', text: 'Resource Limitations', x: 920, y: 100, color: 'rose', shape: 'rectangle', fontSize: 13 },
    { id: 'swot-wk-2', text: 'Skill Challenges', x: 920, y: 190, color: 'rose', shape: 'rectangle', fontSize: 13 },

    // Opportunities (Blue)
    { id: 'swot-opp', text: 'Opportunities', x: 250, y: 450, color: 'blue', shape: 'rounded-rectangle', fontSize: 16 },
    { id: 'swot-opp-1', text: 'Continuous Learning', x: 80, y: 400, color: 'blue', shape: 'rectangle', fontSize: 13 },
    { id: 'swot-opp-2', text: 'Career Advancement', x: 80, y: 490, color: 'blue', shape: 'rectangle', fontSize: 13 },

    // Threats (Amber/Orange)
    { id: 'swot-th', text: 'Threats', x: 750, y: 450, color: 'amber', shape: 'rounded-rectangle', fontSize: 16 },
    { id: 'swot-th-1', text: 'Market Competition', x: 920, y: 400, color: 'amber', shape: 'rectangle', fontSize: 13 },
    { id: 'swot-th-2', text: 'External Risks', x: 920, y: 490, color: 'amber', shape: 'rectangle', fontSize: 13 },
  ],
  edges: [
    { id: 'e-swot-1', source: 'swot-root', target: 'swot-str' },
    { id: 'e-swot-2', source: 'swot-root', target: 'swot-wk' },
    { id: 'e-swot-3', source: 'swot-root', target: 'swot-opp' },
    { id: 'e-swot-4', source: 'swot-root', target: 'swot-th' },

    { id: 'e-swot-s1', source: 'swot-str', target: 'swot-str-1' },
    { id: 'e-swot-s2', source: 'swot-str', target: 'swot-str-2' },

    { id: 'e-swot-w1', source: 'swot-wk', target: 'swot-wk-1' },
    { id: 'e-swot-w2', source: 'swot-wk', target: 'swot-wk-2' },

    { id: 'e-swot-o1', source: 'swot-opp', target: 'swot-opp-1' },
    { id: 'e-swot-o2', source: 'swot-opp', target: 'swot-opp-2' },

    { id: 'e-swot-t1', source: 'swot-th', target: 'swot-th-1' },
    { id: 'e-swot-t2', source: 'swot-th', target: 'swot-th-2' },
  ],
};

export const BRAINSTORM_TEMPLATE: MindMap = {
  id: 'template-brainstorm-map',
  name: 'Brainstorm Map',
  description: 'Unleash creative thinking and organize product ideas, user needs, and solutions.',
  category: 'brainstorm',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  nodes: [
    { id: 'bs-root', text: 'Main Idea', x: 500, y: 300, color: 'purple', shape: 'circle', fontSize: 20 },

    { id: 'bs-feat', text: 'Feature Ideas', x: 250, y: 160, color: 'teal', shape: 'rounded-rectangle', fontSize: 15 },
    { id: 'bs-feat-1', text: 'Interactive Dashboards', x: 70, y: 120, color: 'teal', shape: 'rectangle', fontSize: 13 },
    { id: 'bs-feat-2', text: 'Export SVG & PNG', x: 70, y: 200, color: 'teal', shape: 'rectangle', fontSize: 13 },

    { id: 'bs-needs', text: 'User Needs', x: 750, y: 160, color: 'rose', shape: 'rounded-rectangle', fontSize: 15 },
    { id: 'bs-needs-1', text: 'Fast Offline Access', x: 920, y: 120, color: 'rose', shape: 'rectangle', fontSize: 13 },
    { id: 'bs-needs-2', text: 'Easy Canvas Controls', x: 920, y: 200, color: 'rose', shape: 'rectangle', fontSize: 13 },

    { id: 'bs-sol', text: 'Solutions', x: 250, y: 440, color: 'indigo', shape: 'rounded-rectangle', fontSize: 15 },
    { id: 'bs-sol-1', text: 'Browser Local Storage', x: 70, y: 400, color: 'indigo', shape: 'rectangle', fontSize: 13 },
    { id: 'bs-sol-2', text: 'Smooth SVG Arrow Drawing', x: 70, y: 480, color: 'indigo', shape: 'rectangle', fontSize: 13 },

    { id: 'bs-fut', text: 'Future Ideas', x: 750, y: 440, color: 'amber', shape: 'rounded-rectangle', fontSize: 15 },
    { id: 'bs-fut-1', text: 'Realtime Collaboration', x: 920, y: 400, color: 'amber', shape: 'rectangle', fontSize: 13 },
    { id: 'bs-fut-2', text: 'AI Mindmap Generator', x: 920, y: 480, color: 'amber', shape: 'rectangle', fontSize: 13 },
  ],
  edges: [
    { id: 'e-bs-1', source: 'bs-root', target: 'bs-feat' },
    { id: 'e-bs-2', source: 'bs-root', target: 'bs-needs' },
    { id: 'e-bs-3', source: 'bs-root', target: 'bs-sol' },
    { id: 'e-bs-4', source: 'bs-root', target: 'bs-fut' },

    { id: 'e-bs-f1', source: 'bs-feat', target: 'bs-feat-1' },
    { id: 'e-bs-f2', source: 'bs-feat', target: 'bs-feat-2' },

    { id: 'e-bs-n1', source: 'bs-needs', target: 'bs-needs-1' },
    { id: 'e-bs-n2', source: 'bs-needs', target: 'bs-needs-2' },

    { id: 'e-bs-s1', source: 'bs-sol', target: 'bs-sol-1' },
    { id: 'e-bs-s2', source: 'bs-sol', target: 'bs-sol-2' },

    { id: 'e-bs-u1', source: 'bs-fut', target: 'bs-fut-1' },
    { id: 'e-bs-u2', source: 'bs-fut', target: 'bs-fut-2' },
  ],
};

export const ALL_TEMPLATES: MindMap[] = [
  STUDY_PLANNER_TEMPLATE,
  SWOT_ANALYSIS_TEMPLATE,
  BRAINSTORM_TEMPLATE
];
