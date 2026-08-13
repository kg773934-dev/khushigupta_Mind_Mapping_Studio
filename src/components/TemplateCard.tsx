import React from 'react';
import { MindMap } from '../types/mindmap';
import { Network, ArrowRight, Layers, Sparkles } from 'lucide-react';

interface TemplateCardProps {
  template: MindMap;
  onUseTemplate: (template: MindMap) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onUseTemplate,
}) => {
  const getBadgeColor = (category?: string) => {
    switch (category) {
      case 'study':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200 dark:border-blue-900';
      case 'business':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900';
      case 'brainstorm':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-200 dark:border-purple-900';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-800 transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
            <Network className="w-5 h-5" />
          </div>
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase border ${getBadgeColor(template.category)}`}>
            {template.category || 'Template'}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
          {template.name}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          {template.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-500" />
            <span>{template.nodes.length} Nodes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{template.edges.length} Connections</span>
          </div>
        </div>
      </div>

      {/* Primary CTA */}
      <button
        onClick={() => onUseTemplate(template)}
        className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-indigo-600 dark:bg-slate-800 dark:hover:bg-indigo-600 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm group/btn transition-all"
      >
        <span>Use This Template</span>
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
