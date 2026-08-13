import React, { useState } from 'react';
import { MindMap } from '../types/mindmap';
import { ConfirmDialog } from './ConfirmDialog';
import { 
  FolderOpen, 
  Trash2, 
  Copy, 
  Download, 
  Search, 
  Calendar, 
  Layers, 
  BookmarkCheck, 
  Plus 
} from 'lucide-react';

interface SavedMapsProps {
  maps: MindMap[];
  onOpenMap: (map: MindMap) => void;
  onDeleteMap: (id: string) => void;
  onDuplicateMap: (id: string) => void;
  onNewMap: () => void;
}

export const SavedMaps: React.FC<SavedMapsProps> = ({
  maps,
  onOpenMap,
  onDeleteMap,
  onDuplicateMap,
  onNewMap,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingMapId, setDeletingMapId] = useState<string | null>(null);

  const filteredMaps = maps.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportJSON = (map: MindMap) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(map, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${map.name.replace(/\s+/g, '_')}_mindmap.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const mapToDelete = maps.find((m) => m.id === deletingMapId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
      {/* Header & Search Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Saved Mind Maps
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Manage your persistent local mind maps saved in browser Local Storage.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saved maps..."
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>

          <button
            onClick={onNewMap}
            className="py-2 px-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Map</span>
          </button>
        </div>
      </div>

      {/* Grid of Saved Maps */}
      {filteredMaps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaps.map((map) => (
            <div
              key={map.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-800 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                    {map.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold uppercase border border-indigo-200/60 dark:border-indigo-900/60 shrink-0">
                    Local
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-6 min-h-[32px]">
                  {map.description || 'Custom interactive mind map.'}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium mb-6">
                  <div className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{map.nodes.length} Nodes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{new Date(map.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <button
                  onClick={() => onOpenMap(map)}
                  className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>Open</span>
                </button>

                <button
                  onClick={() => onDuplicateMap(map.id)}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs"
                  title="Duplicate Map"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleExportJSON(map)}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs"
                  title="Export JSON"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setDeletingMapId(map.id)}
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
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <BookmarkCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
            No saved mind maps yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Create a mind map from scratch or pick a template, then save your changes to access them anytime offline.
          </p>
          <button
            onClick={onNewMap}
            className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs inline-flex items-center gap-2 shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Mind Map</span>
          </button>
        </div>
      )}

      {/* Confirmation Dialog for Deleting Map */}
      <ConfirmDialog
        isOpen={!!deletingMapId}
        title="Delete Saved Map"
        message={`Are you sure you want to delete "${mapToDelete?.name || 'this mind map'}"? This action cannot be undone.`}
        confirmLabel="Delete Map"
        cancelLabel="Keep Map"
        onConfirm={() => {
          if (deletingMapId) {
            onDeleteMap(deletingMapId);
            setDeletingMapId(null);
          }
        }}
        onCancel={() => setDeletingMapId(null)}
      />
    </div>
  );
};
