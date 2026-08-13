import React from 'react';
import { MindMapNode, Edge } from '../types/mindmap';

interface EdgeProps {
  edge: Edge;
  sourceNode: MindMapNode;
  targetNode: MindMapNode;
  isSelected?: boolean;
  onSelect?: (edgeId: string) => void;
  onDelete?: (edgeId: string) => void;
}

export const EdgeComponent: React.FC<EdgeProps> = ({
  edge,
  sourceNode,
  targetNode,
  isSelected,
  onSelect,
  onDelete,
}) => {
  if (!sourceNode || !targetNode) return null;

  // Calculate center points for connection
  // Approximate node width/height based on shape and text length
  const getShapeBounds = (node: MindMapNode) => {
    const textLen = node.text ? node.text.length : 8;
    const approxWidth = Math.max(120, textLen * 9 + 32);
    const approxHeight = node.shape === 'circle' ? approxWidth : node.shape === 'diamond' ? approxWidth * 0.9 : 52;
    return {
      cx: node.x,
      cy: node.y,
      w: approxWidth,
      h: approxHeight,
    };
  };

  const s = getShapeBounds(sourceNode);
  const t = getShapeBounds(targetNode);

  // Calculate direction vector between centers
  const dx = t.cx - s.cx;
  const dy = t.cy - s.cy;
  const dist = Math.hypot(dx, dy) || 1;

  // Offset line endpoints to edge of node shapes so arrow ends cleanly at target border
  const sourceOffsetX = (dx / dist) * (s.w / 2.2);
  const sourceOffsetY = (dy / dist) * (s.h / 2.2);

  const targetOffsetX = (dx / dist) * (t.w / 2.2);
  const targetOffsetY = (dy / dist) * (t.h / 2.2);

  const x1 = s.cx + sourceOffsetX;
  const y1 = s.cy + sourceOffsetY;
  const x2 = t.cx - targetOffsetX;
  const y2 = t.cy - targetOffsetY;

  // Control points for smooth bezier curve
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  // Perpendicular curve offset for nicer multi-connections
  const curvature = 0.15;
  const cp1X = midX - dy * curvature;
  const cp1Y = midY + dx * curvature;

  const pathData = `M ${x1} ${y1} Q ${cp1X} ${cp1Y} ${x2} ${y2}`;

  const strokeColor = isSelected ? '#4f46e5' : edge.color || '#64748b';

  return (
    <g className="group cursor-pointer" onClick={(e) => { e.stopPropagation(); onSelect?.(edge.id); }}>
      {/* Invisible wider hit area for easy click selection */}
      <path
        d={pathData}
        fill="none"
        stroke="transparent"
        strokeWidth={16}
        className="pointer-events-auto"
      />

      {/* Main visible connection path */}
      <path
        d={pathData}
        fill="none"
        stroke={strokeColor}
        strokeWidth={isSelected ? 3 : 2}
        strokeDasharray={edge.style === 'dashed' ? '6,6' : edge.style === 'dotted' ? '2,4' : undefined}
        markerEnd={isSelected ? 'url(#arrowhead-selected)' : 'url(#arrowhead-default)'}
        className="transition-all duration-150 group-hover:stroke-indigo-500 group-hover:stroke-[3px]"
      />

      {/* Edge label or delete button at midpoint if selected */}
      {(isSelected || edge.label) && (
        <g transform={`translate(${cp1X}, ${cp1Y})`} className="pointer-events-auto">
          {edge.label && (
            <text
              x={0}
              y={-8}
              textAnchor="middle"
              className="fill-slate-700 dark:fill-slate-200 text-xs font-medium bg-white px-1 py-0.5 rounded shadow-xs"
            >
              {edge.label}
            </text>
          )}

          {isSelected && (
            <g
              transform="translate(0, 0)"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(edge.id);
              }}
              className="cursor-pointer hover:scale-110 transition-transform"
            >
              <circle r={11} fill="#ef4444" className="shadow-md" />
              <path
                d="M -4 -4 L 4 4 M 4 -4 L -4 4"
                stroke="#ffffff"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </g>
          )}
        </g>
      )}
    </g>
  );
};
