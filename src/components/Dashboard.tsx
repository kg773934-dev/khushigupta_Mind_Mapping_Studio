import React from 'react';
import { MindMap } from '../types/mindmap';
import { 
  Network, 
  Plus, 
  FolderGit2, 
  BookmarkCheck, 
  ArrowRight, 
  BookOpen, 
  Target, 
  Lightbulb, 
  Sparkles, 
  Clock, 
  Trash2, 
  FolderOpen 
} from 'lucide-react';

interface DashboardProps {
  savedMaps: MindMap[];
  onNewMap: () => void;
  onSelectTemplate: (templateCategory: 'study' | 'swot' | 'brainstorm') => void;
  onOpenMap: (map: MindMap) => void;
  onDeleteMap: (id: string) => void;
  onNavigateTab: (tab: 'editor' | 'templates' | 'saved' | 'help') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  savedMaps,
  onNewMap,
  onSelectTemplate,
  onOpenMap,
  onDeleteMap,
  onNavigateTab,
}) => {
  const recentMaps = savedMaps.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-in fade-in duration-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-indigo-500/20">
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Interactive Mind Mapping Studio
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Organize ideas visually. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
              Think clearly. Build better connections.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Create, customize, and structure interactive mind maps with fluid drag & drop nodes, directional SVG arrows, instant color themes, and offline local storage persistence.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onNewMap}
              className="px-5 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/30 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Mind Map</span>
            </button>

            <button
              onClick={() => onNavigateTab('templates')}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 border border-white/15 backdrop-blur-md transition-all"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Explore Templates</span>
            </button>

            <button
              onClick={() => onNavigateTab('saved')}
              className="px-4 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm flex items-center gap-2 border border-slate-700 transition-all"
            >
              <BookmarkCheck className="w-4 h-4 text-emerald-400" />
              <span>Recent Maps ({savedMaps.length})</span>
            </button>
          </div>
        </div>

        {/* Decorative Grid Graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden lg:block">
          <div className="w-full h-full border border-indigo-400/20 rounded-full animate-pulse" />
        </div>
      </section>

      {/* Quick Action Cards */}
      <section className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          Quick Actions & Starter Blueprints
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* New Mind Map */}
          <div
            onClick={onNewMap}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-700 cursor-pointer transition-all duration-200 group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                New Mind Map
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Start from a clean canvas with custom nodes and connections.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-4 group-hover:translate-x-1 transition-transform">
              <span>Start Blank</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Study Planner */}
          <div
            onClick={() => onSelectTemplate('study')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-700 cursor-pointer transition-all duration-200 group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Study Planner
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Academic roadmap for Math, Chemistry, Electronics & Mechanics.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 mt-4 group-hover:translate-x-1 transition-transform">
              <span>Use Template</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* SWOT Analysis */}
          <div
            onClick={() => onSelectTemplate('swot')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-emerald-400 dark:hover:border-emerald-700 cursor-pointer transition-all duration-200 group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                SWOT Analysis
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Strategic matrix for Strengths, Weaknesses, Opportunities & Threats.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-4 group-hover:translate-x-1 transition-transform">
              <span>Use Template</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Brainstorm Map */}
          <div
            onClick={() => onSelectTemplate('brainstorm')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-purple-400 dark:hover:border-purple-700 cursor-pointer transition-all duration-200 group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Brainstorm Map
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Structure product features, user needs, and solution ideas.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-purple-600 dark:text-purple-400 mt-4 group-hover:translate-x-1 transition-transform">
              <span>Use Template</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Saved Maps Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Recent Mind Maps
          </h2>

          {savedMaps.length > 0 && (
            <button
              onClick={() => onNavigateTab('saved')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>View All Saved Maps ({savedMaps.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {recentMaps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentMaps.map((map) => (
              <div
                key={map.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 truncate">
                      {map.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                    {map.nodes.length} Connected Nodes • Last edited {new Date(map.updatedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => onOpenMap(map)}
                    className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Open Editor</span>
                  </button>

                  <button
                    onClick={() => onDeleteMap(map.id)}
                    className="p-2 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs"
                    title="Delete Saved Map"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-8 text-center space-y-2">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              No saved mind maps yet.
            </p>
            <p className="text-xs text-slate-400">
              Create your first map above or pick a ready-to-use template!
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
