import React, { useRef } from 'react';
import { 
  Plus, 
  MousePointer, 
  Link2, 
  Hand, 
  Undo2, 
  Redo2, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Save, 
  Download, 
  Upload, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { CanvasTool } from '../types/mindmap';

interface ToolbarProps {
  activeTool: CanvasTool;
  setActiveTool: (tool: CanvasTool) => void;
  onAddNode: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onFitView: () => void;
  onSave: () => void;
  onClearCanvas: () => void;
  onExportJSON: () => void;
  onImportJSON: (jsonString: string) => void;
  onExportImage: () => void;
  isSaving?: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  activeTool,
  setActiveTool,
  onAddNode,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onFitView,
  onSave,
  onClearCanvas,
  onExportJSON,
  onImportJSON,
  onExportImage,
  isSaving,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onImportJSON(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="flex flex-wrap items-center gap-2 bg-white/90 dark:bg-slate-900/90 p-2 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md pointer-events-auto">
      {/* Primary Interaction Tools */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
        <button
          onClick={() => setActiveTool('select')}
          className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
            activeTool === 'select'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
          title="Select & Drag Nodes (V)"
        >
          <MousePointer className="w-4 h-4" />
          <span className="hidden sm:inline">Select</span>
        </button>

        <button
          onClick={() => setActiveTool('connect')}
          className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
            activeTool === 'connect'
              ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
          title="Connect Nodes with Arrow (C)"
        >
          <Link2 className="w-4 h-4" />
          <span className="hidden sm:inline">Connect</span>
        </button>

        <button
          onClick={() => setActiveTool('pan')}
          className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
            activeTool === 'pan'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
          title="Pan Canvas (H)"
        >
          <Hand className="w-4 h-4" />
          <span className="hidden sm:inline">Pan</span>
        </button>
      </div>

      <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-800 hidden sm:block" />

      {/* Action Buttons */}
      <button
        onClick={onAddNode}
        className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs flex items-center gap-1.5 shadow-sm transition-all hover:shadow-indigo-500/20 active:scale-95"
        title="Add New Node (N)"
      >
        <Plus className="w-4 h-4" />
        <span>Add Node</span>
      </button>

      <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-800" />

      {/* Undo & Redo */}
      <div className="flex items-center gap-1">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`p-2 rounded-lg text-xs transition-all ${
            canUndo
              ? 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
          }`}
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="w-4 h-4" />
        </button>

        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`p-2 rounded-lg text-xs transition-all ${
            canRedo
              ? 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
          }`}
          title="Redo (Ctrl+Y)"
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>

      <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-800" />

      {/* Zoom Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={onZoomOut}
          className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs"
          title="Zoom Out (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          onClick={onResetZoom}
          className="px-2 py-1 rounded-md text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Reset Zoom to 100%"
        >
          {Math.round(zoom * 100)}%
        </button>

        <button
          onClick={onZoomIn}
          className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs"
          title="Zoom In (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={onFitView}
          className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs"
          title="Fit All Nodes in View"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-800 hidden md:block" />

      {/* Save & Export Actions */}
      <div className="flex items-center gap-1.5 ml-auto">
        <button
          onClick={onSave}
          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all hover:shadow-emerald-500/20 active:scale-95"
          title="Save Mind Map to Local Storage"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saved!' : 'Save Map'}</span>
        </button>

        <button
          onClick={onExportImage}
          className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs"
          title="Export Map as Image"
        >
          <Download className="w-4 h-4" />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleFileUpload}
        />
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs"
          title="Import JSON Map File"
        >
          <Upload className="w-4 h-4" />
        </button>

        <button
          onClick={onClearCanvas}
          className="p-2 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 text-xs"
          title="Reset / Clear Canvas"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
