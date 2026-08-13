# Architecture Documentation — Mind Mapping Studio

## 1. Executive System Overview

Mind Mapping Studio is built as a modular Single-Page Application (SPA) leveraging React 19, TypeScript, Tailwind CSS, and SVG vector layers. The system follows a client-authoritative state model with local storage synchronization.

---

## 2. Component Hierarchy & Data Flow

```
                     ┌──────────────────┐
                     │     App.tsx      │
                     └────────┬─────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
┌────────▼────────┐  ┌────────▼────────┐  ┌────────▼────────┐
│  Dashboard.tsx  │  │ MindMapEditor   │  │  Templates.tsx  │
└─────────────────┘  └────────┬────────┘  └─────────────────┘
                              │
     ┌────────────────────────┼────────────────────────┐
     │                        │                        │
┌────▼─────────────┐ ┌────────▼─────────┐ ┌────────────▼────┐
│ MindMapCanvas    │ │ Toolbar          │ │ NodeEditor      │
└────┬─────────────┘ └──────────────────┘ └─────────────────┘
     │
 ┌───┴─────────────┐
 │                 │
┌▼──────────────┐ ┌▼──────────────┐
│ MindMapNode   │ │ Edge          │
└───────────────┘ └───────────────┘
```

### Data Flow Pattern
1. **Central State (`MindMapEditor.tsx`)**: Controls `nodes[]` and `edges[]` arrays encapsulated inside `useUndoRedo` hook.
2. **Canvas Rendering (`MindMapCanvas.tsx`)**: Translates mouse viewport client coordinates into canvas scale & pan coordinates:
   $$\text{canvasX} = \frac{\text{clientX} - \text{rect.left} - \text{pan.x}}{\text{zoom}}$$
   $$\text{canvasY} = \frac{\text{clientY} - \text{rect.top} - \text{pan.y}}{\text{zoom}}$$
3. **SVG Edge Calculation (`Edge.tsx`)**: Computes directional vector $\vec{d}$ between source center $(S_x, S_y)$ and target center $(T_x, T_y)$, offsetting start and end points to border shape bounds to cleanly render arrowhead markers without overlapping node content.

---

## 3. Undo/Redo Engine (`useUndoRedo.ts`)

The undo/redo engine maintains a bounded history stack up to 30 past states:
- `past`: `State[]`
- `present`: `State`
- `future`: `State[]`

When a structural change occurs (e.g. node moved, node added, edge deleted, color updated), `set(newState)` pushes `present` onto `past`, updates `present`, and clears `future`.

---

## 4. Storage Schema (`useLocalStorage.ts`)

Data is persisted in browser `localStorage` under key `mindmap_studio_maps_v1`:

```json
[
  {
    "id": "map-1710000000",
    "name": "Study Planner",
    "description": "Academic roadmap for subjects",
    "createdAt": "2026-08-13T06:00:00.000Z",
    "updatedAt": "2026-08-13T06:05:00.000Z",
    "nodes": [
      {
        "id": "sp-root",
        "text": "Study Planner",
        "x": 500,
        "y": 300,
        "color": "indigo",
        "shape": "diamond",
        "fontSize": 20
      }
    ],
    "edges": [
      {
        "id": "e-sp-1",
        "source": "sp-root",
        "target": "sp-math"
      }
    ]
  }
]
```

---

## 5. Performance Optimizations

- **Event Delegation**: Canvas panning and window dragging use passive global listeners.
- **Hardware-Accelerated CSS Transforms**: Node positions and viewport pan/zoom utilize CSS `transform: translate(x, y) scale(z)` with `will-change: transform`.
- **Lightweight Dependencies**: No bloated graph libraries; SVG rendering is handled natively in React for minimal bundle size and immediate response times.
