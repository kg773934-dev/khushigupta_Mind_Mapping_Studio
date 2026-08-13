import React from 'react';
import { ALL_TEMPLATES } from '../data/templates';
import { TemplateCard } from './TemplateCard';
import { MindMap } from '../types/mindmap';
import { FolderGit2, Sparkles } from 'lucide-react';

interface TemplatesProps {
  onSelectTemplate: (template: MindMap) => void;
}

export const Templates: React.FC<TemplatesProps> = ({ onSelectTemplate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          Predefined Architectural Layouts
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Explore Ready-To-Use Templates
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Select a structured mind map template to jumpstart your study schedule, strategic SWOT evaluation, or brainstorming session.
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {ALL_TEMPLATES.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onUseTemplate={onSelectTemplate}
          />
        ))}
      </div>
    </div>
  );
};
