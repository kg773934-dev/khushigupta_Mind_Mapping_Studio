import React, { useState, useRef, useEffect } from 'react';
import { MindMapNode, NodeShape, NodeColor, COLOR_SCHEMES } from '../types/mindmap';
import { 
  Palette, 
  Shapes, 
  Trash2, 
  Link, 
  Plus, 
  Edit3, 
  Check, 
  X 
} from 'lucide-react';

interface MindMapNodeProps {
  node: MindMapNode;
  isSelected: boolean;
  isConnectSource: boolean;
  isConnectMode: boolean;
  onSelect: (nodeId: string, isShift: boolean) => void;
  onUpdateNode: (nodeId: string, updates: Partial<MindMapNode>) => void;
  onDeleteNode: (nodeId: string) => void;
  onStartConnection: (sourceId: string) => void;
  onAddChildNode: (parentId: string) => void;
  onMouseDown: (e: React.MouseEvent, nodeId: string) => void;
}

export const MindMapNodeComponent: React.FC<MindMapNodeProps> = ({
  node,
  isSelected,
  isConnectSource,
  isConnectMode,
  onSelect,
  onUpdateNode,
  onDeleteNode,
  onStartConnection,
  onAddChildNode,
  onMouseDown,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(node.text);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showShapeMenu, setShowShapeMenu] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const colorScheme = COLOR_SCHEMES[node.color] || COLOR_SCHEMES.blue;

  useEffect(() => {
    setEditText(node.text);
  }, [node.text]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSaveText = () => {
    if (editText.trim()) {
      onUpdateNode(node.id, { text: editText.trim() });
    } else {
      setEditText(node.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveText();
    } else if (e.key === 'Escape') {
      setEditText(node.text);
      setIsEditing(false);
    }
  };

  // Node Shape styling classes
  const getShapeStyles = (shape: NodeShape) => {
    switch (shape) {
      case 'rectangle':
        return 'rounded-lg px-5 py-3 min-w-[120px] shadow-sm';
      case 'rounded-rectangle':
        return 'rounded-2xl px-6 py-3.5 min-w-[130px] shadow-md';
      case 'circle':
        return 'rounded-full px-6 py-6 min-w-[110px] min-h-[110px] flex items-center justify-center text-center shadow-md';
      case 'diamond':
        return 'rounded-md px-6 py-5 min-w-[130px] shadow-md transform rotate-0'; // Clean stylized diamond card
      default:
        return 'rounded-xl px-5 py-3 min-w-[120px] shadow-sm';
    }
  };

  const availableColors: NodeColor[] = [
    'indigo', 'blue', 'teal', 'emerald', 'amber', 'orange', 'rose', 'purple', 'slate'
  ];

  const availableShapes: { id: NodeShape; label: string }[] = [
    { id: 'rounded-rectangle', label: 'Rounded' },
    { id: 'rectangle', label: 'Rectangle' },
    { id: 'circle', label: 'Circle' },
    { id: 'diamond', label: 'Diamond' },
  ];

  return (
    <div
      style={{
        transform: `translate(${node.x}px, ${node.y}px)`,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      className={`group select-none cursor-grab active:cursor-grabbing transition-shadow duration-150 ${
        isSelected ? 'z-30' : 'z-10'
      }`}
      onMouseDown={(e) => {
        if (!isEditing) {
          onMouseDown(e, node.id);
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node.id, e.shiftKey);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
    >
      {/* Node Container */}
      <div
        className={`relative border-2 transition-all duration-200 backdrop-blur-xs flex items-center justify-center text-center ${
          colorScheme.bg
        } ${colorScheme.border} ${colorScheme.text} ${getShapeStyles(node.shape)} ${
          isSelected
            ? 'ring-4 ring-indigo-500/40 border-indigo-600 dark:border-indigo-400 shadow-xl scale-[1.02]'
            : 'hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md'
        } ${
          isConnectSource ? 'ring-4 ring-amber-500 border-amber-600 animate-pulse' : ''
        }`}
      >
        {/* Connection Handle Dots on Card Borders when in Connect mode */}
        {isConnectMode && (
          <div
            className="absolute -inset-1.5 flex items-center justify-between pointer-events-none"
            title="Click node to create connection"
          >
            <span className="w-3 h-3 rounded-full bg-indigo-500 border-2 border-white shadow-xs animate-ping" />
            <span className="w-3 h-3 rounded-full bg-indigo-500 border-2 border-white shadow-xs" />
          </div>
        )}

        {/* Node Content / Inline Editor */}
        {isEditing ? (
          <div className="flex items-center gap-1.5 w-full max-w-[200px]" onClick={(e) => e.stopPropagation()}>
            <input
              ref={inputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSaveText}
              className="w-full bg-white dark:bg-slate-900 border border-indigo-500 rounded px-2 py-1 text-sm font-semibold text-slate-900 dark:text-slate-100 shadow-inner focus:outline-hidden"
            />
            <button
              onClick={handleSaveText}
              className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-700"
              title="Save"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => { setEditText(node.text); setIsEditing(false); }}
              className="p-1 rounded bg-slate-300 text-slate-700 hover:bg-slate-400 dark:bg-slate-700 dark:text-slate-200"
              title="Cancel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span 
              className="font-semibold text-sm sm:text-base tracking-tight leading-snug break-words max-w-[220px]"
              style={{ fontSize: node.fontSize ? `${node.fontSize}px` : undefined }}
            >
              {node.text}
            </span>
          </div>
        )}

        {/* Selected / Hover Quick Floating Action Bar */}
        {(isSelected || isConnectSource) && !isEditing && (
          <div 
            className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-slate-900/90 dark:bg-slate-800 text-white px-2 py-1 rounded-lg shadow-xl backdrop-blur-md border border-slate-700 text-xs pointer-events-auto transition-all animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Quick Edit */}
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 hover:bg-slate-700 rounded text-slate-200 hover:text-white transition-colors"
              title="Edit text"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>

            {/* Color Palette Picker */}
            <div className="relative">
              <button
                onClick={() => { setShowColorMenu(!showColorMenu); setShowShapeMenu(false); }}
                className="p-1 hover:bg-slate-700 rounded text-slate-200 hover:text-white transition-colors"
                title="Change color"
              >
                <Palette className="w-3.5 h-3.5" />
              </button>

              {showColorMenu && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl grid grid-cols-3 gap-1.5 min-w-[120px]">
                  {availableColors.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        onUpdateNode(node.id, { color: c });
                        setShowColorMenu(false);
                      }}
                      className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                        COLOR_SCHEMES[c].bg
                      } ${COLOR_SCHEMES[c].border}`}
                      title={COLOR_SCHEMES[c].name}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Shape Switcher */}
            <div className="relative">
              <button
                onClick={() => { setShowShapeMenu(!showShapeMenu); setShowColorMenu(false); }}
                className="p-1 hover:bg-slate-700 rounded text-slate-200 hover:text-white transition-colors"
                title="Change shape"
              >
                <Shapes className="w-3.5 h-3.5" />
              </button>

              {showShapeMenu && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-1.5 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl flex flex-col gap-1 min-w-[110px]">
                  {availableShapes.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        onUpdateNode(node.id, { shape: s.id });
                        setShowShapeMenu(false);
                      }}
                      className={`px-2 py-1 text-left rounded text-xs hover:bg-slate-800 transition-colors ${
                        node.shape === s.id ? 'font-bold text-indigo-400 bg-slate-800' : 'text-slate-300'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Connect line from this node */}
            <button
              onClick={() => onStartConnection(node.id)}
              className="p-1 hover:bg-amber-600/80 bg-amber-500/20 text-amber-300 rounded transition-colors"
              title="Connect to another node"
            >
              <Link className="w-3.5 h-3.5" />
            </button>

            {/* Add connected child node */}
            <button
              onClick={() => onAddChildNode(node.id)}
              className="p-1 hover:bg-indigo-600 bg-indigo-500/30 text-indigo-200 rounded transition-colors"
              title="Add child node"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>

            <div className="w-[1px] h-3 bg-slate-700 my-auto" />

            {/* Delete Node */}
            <button
              onClick={() => onDeleteNode(node.id)}
              className="p-1 hover:bg-rose-600/80 text-rose-300 hover:text-white rounded transition-colors"
              title="Delete node"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
