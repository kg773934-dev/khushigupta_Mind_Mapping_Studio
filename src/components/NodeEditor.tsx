import React, { useState, useEffect } from 'react';
import { MindMapNode, NodeShape, NodeColor, COLOR_SCHEMES, Edge } from '../types/mindmap';
import { 
  X, 
  Trash2, 
  Plus, 
  Link2, 
  Type, 
  Palette, 
  Shapes, 
  Sliders, 
  Layers 
} from 'lucide-react';

interface NodeEditorProps {
  node: MindMapNode | null;
  edges: Edge[];
  nodes: MindMapNode[];
  onClose: () => void;
  onUpdateNode: (nodeId: string, updates: Partial<MindMapNode>) => void;
  onDeleteNode: (nodeId: string) => void;
  onAddChildNode: (parentId: string) => void;
  onStartConnection: (sourceId: string) => void;
  onDeleteEdge: (edgeId: string) => void;
}

export const NodeEditor: React.FC<NodeEditorProps> = ({
  node,
  edges,
  nodes,
  onClose,
  onUpdateNode,
  onDeleteNode,
  onAddChildNode,
  onStartConnection,
  onDeleteEdge,
}) => {
  if (!node) return null;

  const [text, setText] = useState(node.text);

  useEffect(() => {
    setText(node.text);
  }, [node]);

  const availableColors: NodeColor[] = [
    'indigo', 'blue', 'teal', 'emerald', 'amber', 'orange', 'rose', 'purple', 'slate'
  ];

  const availableShapes: { id: NodeShape; label: string }[] = [
    { id: 'rounded-rectangle', label: 'Rounded Box' },
    { id: 'rectangle', label: 'Rectangle' },
    { id: 'circle', label: 'Circle / Oval' },
    { id: 'diamond', label: 'Diamond Card' },
  ];

  // Find edges connected to this node
  const connectedEdges = edges.filter(
    (e) => e.source === node.id || e.target === node.id
  );

  return (
    <div className="w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col h-full z-40 animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Node Inspector</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 text-sm">
        {/* Text Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1.5 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5" />
            Node Text
          </label>
          <textarea
            rows={3}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              onUpdateNode(node.id, { text: e.target.value });
            }}
            className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            placeholder="Type node idea..."
          />
        </div>

        {/* Shape Picker */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2 flex items-center gap-1.5">
            <Shapes className="w-3.5 h-3.5" />
            Node Shape
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableShapes.map((s) => (
              <button
                key={s.id}
                onClick={() => onUpdateNode(node.id, { shape: s.id })}
                className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                  node.shape === s.id
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 font-bold shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Color Palette */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5" />
            Color Theme
          </label>
          <div className="grid grid-cols-3 gap-2">
            {availableColors.map((c) => {
              const scheme = COLOR_SCHEMES[c];
              return (
                <button
                  key={c}
                  onClick={() => onUpdateNode(node.id, { color: c })}
                  className={`p-2 rounded-xl border-2 flex items-center gap-2 text-xs font-medium transition-all ${
                    scheme.bg
                  } ${scheme.border} ${
                    node.color === c ? 'ring-2 ring-indigo-500 shadow-md font-bold' : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${scheme.bg} ${scheme.border}`} />
                  <span className="truncate text-[11px]">{scheme.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Font Size Slider */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
              Text Size
            </label>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              {node.fontSize || 15}px
            </span>
          </div>
          <input
            type="range"
            min={12}
            max={28}
            value={node.fontSize || 15}
            onChange={(e) => onUpdateNode(node.id, { fontSize: Number(e.target.value) })}
            className="w-full accent-indigo-600"
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => onAddChildNode(node.id)}
            className="w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Connected Child Node</span>
          </button>

          <button
            onClick={() => onStartConnection(node.id)}
            className="w-full py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-semibold text-xs flex items-center justify-center gap-2 border border-amber-300/40 transition-all"
          >
            <Link2 className="w-4 h-4" />
            <span>Connect to Another Node</span>
          </button>
        </div>

        {/* Connected Relationships list */}
        {connectedEdges.length > 0 && (
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Connections ({connectedEdges.length})
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {connectedEdges.map((e) => {
                const isSource = e.source === node.id;
                const otherNodeId = isSource ? e.target : e.source;
                const otherNode = nodes.find((n) => n.id === otherNodeId);

                return (
                  <div
                    key={e.id}
                    className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs"
                  >
                    <span className="truncate max-w-[170px] text-slate-700 dark:text-slate-300">
                      {isSource ? '→ ' : '← '} {otherNode?.text || 'Node'}
                    </span>
                    <button
                      onClick={() => onDeleteEdge(e.id)}
                      className="text-rose-500 hover:text-rose-700 p-1"
                      title="Remove Connection"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer Delete Action */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <button
          onClick={() => {
            onDeleteNode(node.id);
            onClose();
          }}
          className="w-full py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 dark:text-rose-300 font-semibold text-xs flex items-center justify-center gap-2 border border-rose-200 dark:border-rose-900/60 transition-all"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete Node</span>
        </button>
      </div>
    </div>
  );
};
