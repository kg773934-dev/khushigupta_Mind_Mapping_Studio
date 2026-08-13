import React, { useRef, useState, useCallback, useEffect } from 'react';
import { MindMapNode, Edge, CanvasTool } from '../types/mindmap';
import { MindMapNodeComponent } from './MindMapNode';
import { EdgeComponent } from './Edge';

interface MindMapCanvasProps {
  nodes: MindMapNode[];
  edges: Edge[];
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  activeTool: CanvasTool;
  connectSourceId: string | null;
  zoom: number;
  pan: { x: number; y: number };
  onSelectNode: (nodeId: string | null) => void;
  onSelectEdge: (edgeId: string | null) => void;
  onUpdateNodePosition: (nodeId: string, x: number, y: number) => void;
  onUpdateNode: (nodeId: string, updates: Partial<MindMapNode>) => void;
  onDeleteNode: (nodeId: string) => void;
  onStartConnection: (sourceId: string) => void;
  onCreateEdge: (sourceId: string, targetId: string) => void;
  onDeleteEdge: (edgeId: string) => void;
  onAddChildNode: (parentId: string) => void;
  onPanChange: (pan: { x: number; y: number }) => void;
  onZoomChange: (zoom: number) => void;
  onCanvasClick: () => void;
}

export const MindMapCanvas: React.FC<MindMapCanvasProps> = ({
  nodes,
  edges,
  selectedNodeId,
  selectedEdgeId,
  activeTool,
  connectSourceId,
  zoom,
  pan,
  onSelectNode,
  onSelectEdge,
  onUpdateNodePosition,
  onUpdateNode,
  onDeleteNode,
  onStartConnection,
  onCreateEdge,
  onDeleteEdge,
  onAddChildNode,
  onPanChange,
  onZoomChange,
  onCanvasClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position for previewing connection line
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Canvas background panning state
  const [isPanningCanvas, setIsPanningCanvas] = useState(false);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panInitialRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Node dragging state
  const draggingNodeRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    nodeStartX: number;
    nodeStartY: number;
  } | null>(null);

  // Handle Mouse Wheel for Zooming
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      const newZoom = Math.min(Math.max(zoom * zoomFactor, 0.4), 2.5);
      onZoomChange(newZoom);
    },
    [zoom, onZoomChange]
  );

  // Convert mouse screen coordinates to canvas transformed coordinates
  const screenToCanvas = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return { x: 0, y: 0 };
      const rect = containerRef.current.getBoundingClientRect();
      const x = (clientX - rect.left - pan.x) / zoom;
      const y = (clientY - rect.top - pan.y) / zoom;
      return { x, y };
    },
    [pan, zoom]
  );

  // Handle Mouse Move over Canvas
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const currentCanvasPos = screenToCanvas(e.clientX, e.clientY);
      setMousePos(currentCanvasPos);

      // Handle Canvas Panning
      if (isPanningCanvas) {
        const dx = e.clientX - panStartRef.current.x;
        const dy = e.clientY - panStartRef.current.y;
        onPanChange({
          x: panInitialRef.current.x + dx,
          y: panInitialRef.current.y + dy,
        });
        return;
      }

      // Handle Node Dragging
      if (draggingNodeRef.current) {
        const dx = (e.clientX - draggingNodeRef.current.startX) / zoom;
        const dy = (e.clientY - draggingNodeRef.current.startY) / zoom;
        const newX = draggingNodeRef.current.nodeStartX + dx;
        const newY = draggingNodeRef.current.nodeStartY + dy;

        onUpdateNodePosition(draggingNodeRef.current.id, Math.round(newX), Math.round(newY));
      }
    },
    [isPanningCanvas, onPanChange, onUpdateNodePosition, screenToCanvas, zoom]
  );

  // Handle Mouse Up
  const handleMouseUp = useCallback(() => {
    setIsPanningCanvas(false);
    draggingNodeRef.current = null;
  }, []);

  // Window global listeners for drag & pan
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Start Canvas Panning
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target !== containerRef.current && (e.target as HTMLElement).tagName !== 'svg') {
      return;
    }

    onCanvasClick();

    if (activeTool === 'pan' || e.button === 1 || e.button === 0) {
      setIsPanningCanvas(true);
      panStartRef.current = { x: e.clientX, y: e.clientY };
      panInitialRef.current = { ...pan };
    }
  };

  // Start Node Dragging
  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();

    // If in Connect mode, clicking node triggers connection logic
    if (activeTool === 'connect' || connectSourceId) {
      if (connectSourceId && connectSourceId !== nodeId) {
        onCreateEdge(connectSourceId, nodeId);
      } else {
        onStartConnection(nodeId);
      }
      return;
    }

    onSelectNode(nodeId);

    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    draggingNodeRef.current = {
      id: nodeId,
      startX: e.clientX,
      startY: e.clientY,
      nodeStartX: node.x,
      nodeStartY: node.y,
    };
  };

  const connectSourceNode = nodes.find((n) => n.id === connectSourceId);

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleCanvasMouseDown}
      className={`relative w-full h-full overflow-hidden select-none bg-slate-50 dark:bg-slate-950 ${
        activeTool === 'pan' || isPanningCanvas
          ? 'cursor-grab active:cursor-grabbing'
          : activeTool === 'connect'
          ? 'cursor-crosshair'
          : 'cursor-default'
      }`}
    >
      {/* Dynamic Grid Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 transition-opacity"
        style={{
          backgroundImage: `radial-gradient(circle, #64748b 1.2px, transparent 1.2px)`,
          backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
          backgroundPosition: `${pan.x}px ${pan.y}px`,
        }}
      />

      {/* Main Transformed Canvas Container */}
      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        className="will-change-transform"
      >
        {/* SVG Layer for Node Relationships / Arrows */}
        <svg className="absolute inset-0 w-[5000px] h-[5000px] pointer-events-none overflow-visible">
          <defs>
            {/* Standard Arrow Marker */}
            <marker
              id="arrowhead-default"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>

            {/* Selected Arrow Marker */}
            <marker
              id="arrowhead-selected"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#4f46e5" />
            </marker>

            {/* Preview Arrow Marker */}
            <marker
              id="arrowhead-preview"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
            </marker>
          </defs>

          {/* Render All Edges */}
          {edges.map((edge) => {
            const sourceNode = nodes.find((n) => n.id === edge.source);
            const targetNode = nodes.find((n) => n.id === edge.target);
            if (!sourceNode || !targetNode) return null;

            return (
              <EdgeComponent
                key={edge.id}
                edge={edge}
                sourceNode={sourceNode}
                targetNode={targetNode}
                isSelected={selectedEdgeId === edge.id}
                onSelect={onSelectEdge}
                onDelete={onDeleteEdge}
              />
            );
          })}

          {/* Render Active Connection Line Preview */}
          {connectSourceNode && (
            <path
              d={`M ${connectSourceNode.x + 60} ${connectSourceNode.y + 25} L ${mousePos.x} ${mousePos.y}`}
              fill="none"
              stroke="#f59e0b"
              strokeWidth={3}
              strokeDasharray="6,6"
              markerEnd="url(#arrowhead-preview)"
              className="animate-pulse"
            />
          )}
        </svg>

        {/* Render All Mind Map Nodes */}
        {nodes.map((node) => (
          <MindMapNodeComponent
            key={node.id}
            node={node}
            isSelected={selectedNodeId === node.id}
            isConnectSource={connectSourceId === node.id}
            isConnectMode={activeTool === 'connect' || !!connectSourceId}
            onSelect={(id) => onSelectNode(id)}
            onUpdateNode={onUpdateNode}
            onDeleteNode={onDeleteNode}
            onStartConnection={onStartConnection}
            onAddChildNode={onAddChildNode}
            onMouseDown={handleNodeMouseDown}
          />
        ))}
      </div>
    </div>
  );
};
