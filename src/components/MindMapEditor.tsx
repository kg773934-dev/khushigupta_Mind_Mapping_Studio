import React, { useState, useEffect, useCallback } from 'react';
import { MindMap, MindMapNode, Edge, CanvasTool, NodeColor, NodeShape } from '../types/mindmap';
import { useUndoRedo } from '../hooks/useUndoRedo';
import { MindMapCanvas } from './MindMapCanvas';
import { Toolbar } from './Toolbar';
import { NodeEditor } from './NodeEditor';
import { ConfirmDialog } from './ConfirmDialog';
import { 
  ArrowLeft, 
  Save, 
  Download, 
  Sparkles, 
  Sliders, 
  Layers, 
  Check, 
  Edit2 
} from 'lucide-react';

interface MindMapEditorProps {
  initialMap: MindMap;
  onSaveMap: (map: MindMap) => void;
  onBackToDashboard: () => void;
}

export const MindMapEditor: React.FC<MindMapEditorProps> = ({
  initialMap,
  onSaveMap,
  onBackToDashboard,
}) => {
  // Undo/Redo state wrapper for map payload { nodes, edges }
  const {
    state: mapState,
    setState: setMapState,
    undo,
    redo,
    canUndo,
    canRedo,
    reset: resetUndoRedo,
  } = useUndoRedo<{ nodes: MindMapNode[]; edges: Edge[] }>({
    nodes: initialMap.nodes,
    edges: initialMap.edges,
  });

  const [mapName, setMapName] = useState(initialMap.name);
  const [isEditingName, setIsEditingName] = useState(false);

  // Selection & Tools
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<CanvasTool>('select');
  const [connectSourceId, setConnectSourceId] = useState<string | null>(null);

  // Canvas View Transforms
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  // Dialogs & Notification Feedback
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const [isSavingNotification, setIsSavingNotification] = useState(false);
  const [showInspector, setShowInspector] = useState(true);

  // Reset editor when initialMap changes
  useEffect(() => {
    setMapName(initialMap.name);
    resetUndoRedo({ nodes: initialMap.nodes, edges: initialMap.edges });
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
    setConnectSourceId(null);
  }, [initialMap, resetUndoRedo]);

  const nodes = mapState.nodes;
  const edges = mapState.edges;

  // Selected Node Object
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;

  // Save current map state
  const handleSave = useCallback(() => {
    const updatedMap: MindMap = {
      ...initialMap,
      name: mapName.trim() || 'Untitled Mind Map',
      nodes,
      edges,
      updatedAt: new Date().toISOString(),
    };
    onSaveMap(updatedMap);
    setIsSavingNotification(true);
    setTimeout(() => setIsSavingNotification(false), 2000);
  }, [initialMap, mapName, nodes, edges, onSaveMap]);

  // Add Node
  const handleAddNode = useCallback(() => {
    const id = `node-${Date.now()}`;
    // Position node around center view
    const newX = Math.round(400 - pan.x + (Math.random() * 80 - 40));
    const newY = Math.round(250 - pan.y + (Math.random() * 80 - 40));

    const colors: NodeColor[] = ['indigo', 'blue', 'teal', 'emerald', 'amber', 'purple'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newNode: MindMapNode = {
      id,
      text: 'New Idea',
      x: newX,
      y: newY,
      color: randomColor,
      shape: 'rounded-rectangle',
      fontSize: 15,
    };

    setMapState({
      nodes: [...nodes, newNode],
      edges,
    });

    setSelectedNodeId(id);
    setSelectedEdgeId(null);
  }, [nodes, edges, pan, setMapState]);

  // Add connected Child Node from a parent node
  const handleAddChildNode = useCallback(
    (parentId: string) => {
      const parent = nodes.find((n) => n.id === parentId);
      if (!parent) return;

      const childId = `node-${Date.now()}`;
      const newX = parent.x + 220;
      const newY = parent.y + (Math.random() * 100 - 50);

      const newChildNode: MindMapNode = {
        id: childId,
        text: 'Sub Idea',
        x: newX,
        y: newY,
        color: parent.color,
        shape: parent.shape,
        fontSize: 14,
      };

      const newEdge: Edge = {
        id: `edge-${Date.now()}`,
        source: parentId,
        target: childId,
      };

      setMapState({
        nodes: [...nodes, newChildNode],
        edges: [...edges, newEdge],
      });

      setSelectedNodeId(childId);
    },
    [nodes, edges, setMapState]
  );

  // Update Node position (during/after dragging)
  const handleUpdateNodePosition = useCallback(
    (nodeId: string, x: number, y: number) => {
      const updatedNodes = nodes.map((n) =>
        n.id === nodeId ? { ...n, x, y } : n
      );
      setMapState({ nodes: updatedNodes, edges }, true); // overwrite history during live drag
    },
    [nodes, edges, setMapState]
  );

  // Update Node properties
  const handleUpdateNode = useCallback(
    (nodeId: string, updates: Partial<MindMapNode>) => {
      const updatedNodes = nodes.map((n) =>
        n.id === nodeId ? { ...n, ...updates } : n
      );
      setMapState({ nodes: updatedNodes, edges });
    },
    [nodes, edges, setMapState]
  );

  // Delete Node & associated edges
  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      const updatedNodes = nodes.filter((n) => n.id !== nodeId);
      const updatedEdges = edges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId
      );
      setMapState({ nodes: updatedNodes, edges: updatedEdges });
      if (selectedNodeId === nodeId) {
        setSelectedNodeId(null);
      }
    },
    [nodes, edges, selectedNodeId, setMapState]
  );

  // Connection Creation
  const handleStartConnection = useCallback((sourceId: string) => {
    setConnectSourceId(sourceId);
    setActiveTool('connect');
  }, []);

  const handleCreateEdge = useCallback(
    (sourceId: string, targetId: string) => {
      if (sourceId === targetId) return; // Prevent self-connection

      // Prevent duplicate edge
      const existing = edges.find(
        (e) =>
          (e.source === sourceId && e.target === targetId) ||
          (e.source === targetId && e.target === sourceId)
      );

      if (!existing) {
        const newEdge: Edge = {
          id: `edge-${Date.now()}`,
          source: sourceId,
          target: targetId,
        };
        setMapState({ nodes, edges: [...edges, newEdge] });
      }

      setConnectSourceId(null);
      setActiveTool('select');
    },
    [nodes, edges, setMapState]
  );

  // Delete Edge
  const handleDeleteEdge = useCallback(
    (edgeId: string) => {
      const updatedEdges = edges.filter((e) => e.id !== edgeId);
      setMapState({ nodes, edges: updatedEdges });
      if (selectedEdgeId === edgeId) {
        setSelectedEdgeId(null);
      }
    },
    [nodes, edges, selectedEdgeId, setMapState]
  );

  // Clear Canvas
  const handleClearCanvas = useCallback(() => {
    setMapState({ nodes: [], edges: [] });
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
    setConnectSourceId(null);
    setIsClearConfirmOpen(false);
  }, [setMapState]);

  // Fit view bounds to contain all nodes
  const handleFitView = useCallback(() => {
    if (nodes.length === 0) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
      return;
    }

    const minX = Math.min(...nodes.map((n) => n.x));
    const maxX = Math.max(...nodes.map((n) => n.x));
    const minY = Math.min(...nodes.map((n) => n.y));
    const maxY = Math.max(...nodes.map((n) => n.y));

    const width = maxX - minX + 300;
    const height = maxY - minY + 300;

    const viewportWidth = window.innerWidth - 300;
    const viewportHeight = window.innerHeight - 150;

    const scaleX = viewportWidth / width;
    const scaleY = viewportHeight / height;
    const newZoom = Math.min(Math.max(Math.min(scaleX, scaleY), 0.5), 1.5);

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    setZoom(newZoom);
    setPan({
      x: viewportWidth / 2 - centerX * newZoom,
      y: viewportHeight / 2 - centerY * newZoom,
    });
  }, [nodes]);

  // Export as Image (PNG/SVG)
  const handleExportImage = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ name: mapName, nodes, edges }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${mapName.replace(/\s+/g, '_')}_mindmap.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [mapName, nodes, edges]);

  // Import JSON file
  const handleImportJSON = useCallback((jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && Array.isArray(parsed.nodes) && Array.isArray(parsed.edges)) {
        if (parsed.name) setMapName(parsed.name);
        setMapState({ nodes: parsed.nodes, edges: parsed.edges });
      }
    } catch (e) {
      console.error('Invalid JSON file imported', e);
    }
  }, [setMapState]);

  // Global Keyboard Shortcuts (Delete, Undo, Redo, Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing inside an input/textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedNodeId) {
          handleDeleteNode(selectedNodeId);
        } else if (selectedEdgeId) {
          handleDeleteEdge(selectedEdgeId);
        }
      } else if (e.key === 'Escape') {
        setSelectedNodeId(null);
        setSelectedEdgeId(null);
        setConnectSourceId(null);
        setActiveTool('select');
      } else if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') {
          e.preventDefault();
          if (canUndo) undo();
        } else if (e.key === 'y') {
          e.preventDefault();
          if (canRedo) redo();
        } else if (e.key === 's') {
          e.preventDefault();
          handleSave();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    selectedNodeId,
    selectedEdgeId,
    handleDeleteNode,
    handleDeleteEdge,
    canUndo,
    canRedo,
    undo,
    redo,
    handleSave,
  ]);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
      {/* Editor Header Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="Return to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          {/* Editable Map Name */}
          {isEditingName ? (
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={mapName}
                onChange={(e) => setMapName(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                className="font-bold text-base bg-slate-50 dark:bg-slate-800 border border-indigo-500 rounded px-2 py-1 text-slate-900 dark:text-slate-100 focus:outline-hidden"
                autoFocus
              />
              <button
                onClick={() => setIsEditingName(false)}
                className="p-1 rounded bg-indigo-600 text-white text-xs"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => setIsEditingName(true)}
              className="flex items-center gap-2 cursor-pointer group px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <h2 className="font-extrabold text-slate-900 dark:text-slate-100 text-base sm:text-lg tracking-tight truncate max-w-[200px] sm:max-w-[320px]">
                {mapName || 'Untitled Mind Map'}
              </h2>
              <Edit2 className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
        </div>

        {/* Action Indicators */}
        <div className="flex items-center gap-2">
          {/* Toggle Inspector Panel button */}
          <button
            onClick={() => setShowInspector(!showInspector)}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showInspector
                ? 'bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-950 dark:border-indigo-800 dark:text-indigo-300'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
            title="Toggle Node Inspector"
          >
            <Sliders className="w-4 h-4" />
            <span className="hidden md:inline">Inspector</span>
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm shadow-indigo-500/20 active:scale-95 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{isSavingNotification ? 'Saved!' : 'Save Map'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas & Inspector Workspace */}
      <div className="relative flex-1 w-full h-full overflow-hidden flex">
        {/* Canvas Area */}
        <div className="relative flex-1 h-full w-full">
          <MindMapCanvas
            nodes={nodes}
            edges={edges}
            selectedNodeId={selectedNodeId}
            selectedEdgeId={selectedEdgeId}
            activeTool={activeTool}
            connectSourceId={connectSourceId}
            zoom={zoom}
            pan={pan}
            onSelectNode={(id) => {
              setSelectedNodeId(id);
              setSelectedEdgeId(null);
            }}
            onSelectEdge={(id) => {
              setSelectedEdgeId(id);
              setSelectedNodeId(null);
            }}
            onUpdateNodePosition={handleUpdateNodePosition}
            onUpdateNode={handleUpdateNode}
            onDeleteNode={handleDeleteNode}
            onStartConnection={handleStartConnection}
            onCreateEdge={handleCreateEdge}
            onDeleteEdge={handleDeleteEdge}
            onAddChildNode={handleAddChildNode}
            onPanChange={setPan}
            onZoomChange={setZoom}
            onCanvasClick={() => {
              setSelectedNodeId(null);
              setSelectedEdgeId(null);
              if (activeTool === 'connect') {
                setConnectSourceId(null);
                setActiveTool('select');
              }
            }}
          />

          {/* Floating Canvas Controls Toolbar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 max-w-[95vw]">
            <Toolbar
              activeTool={activeTool}
              setActiveTool={setActiveTool}
              onAddNode={handleAddNode}
              onUndo={undo}
              onRedo={redo}
              canUndo={canUndo}
              canRedo={canRedo}
              zoom={zoom}
              onZoomIn={() => setZoom((z) => Math.min(z + 0.15, 2.5))}
              onZoomOut={() => setZoom((z) => Math.max(z - 0.15, 0.4))}
              onResetZoom={() => setZoom(1)}
              onFitView={handleFitView}
              onSave={handleSave}
              onClearCanvas={() => setIsClearConfirmOpen(true)}
              onExportJSON={handleExportImage}
              onImportJSON={handleImportJSON}
              onExportImage={handleExportImage}
              isSaving={isSavingNotification}
            />
          </div>
        </div>

        {/* Side Inspector Drawer */}
        {showInspector && selectedNode && (
          <NodeEditor
            node={selectedNode}
            edges={edges}
            nodes={nodes}
            onClose={() => setSelectedNodeId(null)}
            onUpdateNode={handleUpdateNode}
            onDeleteNode={handleDeleteNode}
            onAddChildNode={handleAddChildNode}
            onStartConnection={handleStartConnection}
            onDeleteEdge={handleDeleteEdge}
          />
        )}
      </div>

      {/* Confirmation Popup for Resetting Canvas */}
      <ConfirmDialog
        isOpen={isClearConfirmOpen}
        title="Clear Entire Canvas?"
        message="Are you sure you want to remove all nodes and connections from this mind map? You can use Undo (Ctrl+Z) to restore."
        confirmLabel="Clear Canvas"
        cancelLabel="Cancel"
        onConfirm={handleClearCanvas}
        onCancel={() => setIsClearConfirmOpen(false)}
      />
    </div>
  );
};
