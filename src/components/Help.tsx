import React from 'react';
import { 
  Network, 
  HelpCircle, 
  MousePointer, 
  Plus, 
  Link2, 
  Palette, 
  Save, 
  Undo2, 
  ZoomIn, 
  Keyboard, 
  GraduationCap, 
  Code2, 
  Sparkles 
} from 'lucide-react';

export const Help: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5" />
          Documentation & User Guide
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          How To Use Mind Mapping Studio
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          A comprehensive guide to building, connecting, styling, and saving visual mind maps.
        </p>
      </div>

      {/* Feature Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Creating & Adding Nodes */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            1. Creating & Adding Nodes
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Click the <strong className="text-indigo-600 font-semibold">+ Add Node</strong> button on the canvas toolbar to insert a new idea node. Double-click any node to edit its text inline.
          </p>
        </div>

        {/* Dragging & Positioning */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <MousePointer className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            2. Dragging & Canvas Panning
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Click and hold any node to drag it across the canvas. Associated SVG directional arrows update dynamically in real time. Use the <strong className="text-indigo-600 font-semibold">Pan</strong> tool to move the canvas viewport.
          </p>
        </div>

        {/* Directional SVG Connections */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Link2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            3. Connecting Nodes
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Switch to <strong className="text-amber-600 font-semibold">Connect Mode</strong> or click the link icon on a selected node. Click the source node first, then click the target node to draw a directional arrowhead.
          </p>
        </div>

        {/* Customization & Themes */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Palette className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            4. Color & Shape Customization
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Select any node to open the Node Inspector or quick action bar. Choose between 9 preset color themes (Ocean Blue, Emerald, Royal Purple, Warm Amber, Rose, etc.) and 4 shapes (Rounded, Rectangle, Circle, Diamond).
          </p>
        </div>

        {/* Zoom & Pan Navigation */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <ZoomIn className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            5. Zoom & View Controls
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Use the mouse scroll wheel or toolbar buttons to zoom in/out (0.4x to 2.5x). Click <strong className="text-teal-600 font-semibold">Fit View</strong> to automatically center all nodes on screen.
          </p>
        </div>

        {/* Local Storage & Undo/Redo */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Save className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            6. Offline Persistence & Undo/Redo
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Click <strong className="text-emerald-600 font-semibold">Save Map</strong> to store your work in browser Local Storage. Use Undo (<kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono text-[10px]">Ctrl+Z</kbd>) and Redo (<kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono text-[10px]">Ctrl+Y</kbd>) anytime.
          </p>
        </div>
      </div>

      {/* Keyboard Shortcuts Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Keyboard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            Keyboard Shortcuts
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-900 rounded border font-mono font-bold text-[11px]">Delete</kbd>
            <span className="block text-slate-500 dark:text-slate-400 mt-1">Delete Selected Node/Edge</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-900 rounded border font-mono font-bold text-[11px]">Ctrl + Z</kbd>
            <span className="block text-slate-500 dark:text-slate-400 mt-1">Undo Last Action</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-900 rounded border font-mono font-bold text-[11px]">Ctrl + Y</kbd>
            <span className="block text-slate-500 dark:text-slate-400 mt-1">Redo Action</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-900 rounded border font-mono font-bold text-[11px]">Esc</kbd>
            <span className="block text-slate-500 dark:text-slate-400 mt-1">Clear Selection / Mode</span>
          </div>
        </div>
      </div>

      {/* Project Information */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-slate-900 border border-indigo-200/80 dark:border-indigo-900/80 rounded-3xl p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">
              Project Information & Specifications
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              College Assignment Submission Details
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/50">
            <span className="text-slate-400 font-semibold block uppercase text-[10px]">Project Name</span>
            <span className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5 block">Mind Mapping Studio</span>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/50">
            <span className="text-slate-400 font-semibold block uppercase text-[10px]">Author</span>
            <span className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5 block">Khushi Gupta</span>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/50">
            <span className="text-slate-400 font-semibold block uppercase text-[10px]">Course</span>
            <span className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5 block">B.Tech</span>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/50">
            <span className="text-slate-400 font-semibold block uppercase text-[10px]">Architecture</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm mt-0.5 block">Frontend SPA (Local Storage)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
