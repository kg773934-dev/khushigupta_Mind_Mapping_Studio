# Mind Mapping Studio

> **Visual Idea Architecture & Interactive Mind Mapping Application**

Mind Mapping Studio is a full-featured, assignment-ready web application designed for students, researchers, project planners, and teams to visually organize concepts, build structured roadmaps, and brainstorm connected ideas.

---

## 📌 Project Overview

Mind Mapping Studio provides a modern, interactive canvas where users can create mind maps from scratch or start from predefined academic and strategic templates. It supports fluid node dragging, directional SVG arrows, rich node color & shape customization, canvas zooming & panning, undo/redo history tracking, and instant Local Storage persistence—all without requiring any server infrastructure or user authentication.

---

## 🎯 Project Objective

To demonstrate practical mastery of modern frontend development concepts:
- Component-based architecture in **React** and **TypeScript**
- Responsive utility styling with **Tailwind CSS**
- Dynamic mathematical vector calculations using **SVG**
- State management and undo/redo history stacks
- Client-side data persistence with browser **Local Storage**

---

## ✨ Features

- **Interactive Mind Map Canvas**: Drag nodes, pan canvas, and zoom smoothly (0.4x to 2.5x).
- **Dynamic Node System**:
  - Add, inline-edit, and delete nodes.
  - Automatically remove associated connections when a node is deleted.
- **Directional SVG Connections**:
  - Connect nodes with clean curved lines and directional arrowhead markers.
  - SVG arrows update dynamically in real time as nodes are dragged.
- **Node Styling & Customization**:
  - **9 Preset Colors**: Ocean Blue, Emerald Green, Warm Amber, Royal Purple, Rose Pink, Indigo Velvet, Teal Mint, Sunset Orange, Classic Slate.
  - **4 Shapes**: Rounded Box, Rectangle, Circle/Oval, Diamond Card.
  - Custom font size adjustments.
- **Canvas View Controls**:
  - Zoom In (+), Zoom Out (-), Reset Zoom (100%), and **Fit View** (centers all nodes).
- **Undo & Redo History**: Complete history tracking for adding, editing, moving, styling, or deleting nodes and connections.
- **Local Storage Persistence**: Save, load, duplicate, export, and delete mind maps locally in the browser.
- **Predefined Blueprints**:
  1. **Study Planner**: Academic roadmap for Mathematics, Chemistry, Electronics, and Mechanics.
  2. **SWOT Analysis**: Strategic matrix for Strengths, Weaknesses, Opportunities, and Threats.
  3. **Brainstorm Map**: Structure feature ideas, user needs, solutions, and future plans.
- **Import & Export**: Export maps as JSON files or download visual representations.
- **Responsive & Accessible**: Desktop and tablet optimized with keyboard shortcuts (<kbd>Delete</kbd>, <kbd>Ctrl+Z</kbd>, <kbd>Ctrl+Y</kbd>, <kbd>Esc</kbd>).

---

## 🛠️ Technologies Used

- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **SVG Vector Graphics**
- **Lucide React Icons**
- **Browser Local Storage**

---

## 🚀 How to Run

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/username/mind-mapping-studio.git
   cd mind-mapping-studio
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:3000` to access the application.

---

## 🗺️ How to Use

1. **Dashboard**: Launch a new mind map or choose from ready-to-use starter templates.
2. **Mind Map Editor**:
   - **Add Node**: Click `+ Add Node` or double-click an existing node to edit text.
   - **Move Node**: Click and drag any node across the canvas.
   - **Connect Nodes**: Switch to `Connect` mode, click a source node, then click a target node to draw an arrow.
   - **Style Node**: Select a node to open the Node Inspector and change its color, shape, or text size.
   - **Pan & Zoom**: Scroll mouse wheel to zoom, or drag canvas background in `Pan` mode.
   - **Save Map**: Click `Save Map` to persist your mind map locally in your browser.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx         # Top application navigation bar
│   ├── Dashboard.tsx      # Dashboard view with hero banner and quick actions
│   ├── MindMapEditor.tsx  # Main editor workspace container
│   ├── MindMapCanvas.tsx  # Interactive canvas with pan, zoom, & SVG overlay
│   ├── MindMapNode.tsx    # Individual rendered node component
│   ├── Edge.tsx           # SVG directional arrow line component
│   ├── Toolbar.tsx        # Floating canvas controls toolbar
│   ├── NodeEditor.tsx     # Side inspector panel for selected nodes
│   ├── TemplateCard.tsx   # Individual template card component
│   ├── Templates.tsx      # Templates selection showcase
│   ├── SavedMaps.tsx      # Saved mind maps grid & manager
│   ├── Help.tsx           # User guide and project metadata
│   └── ConfirmDialog.tsx # Modal dialog for destructive actions
├── hooks/
│   ├── useLocalStorage.ts # Custom hook for Local Storage persistence
│   └── useUndoRedo.ts     # Custom hook for history stack management
├── data/
│   └── templates.ts       # Predefined Study Planner, SWOT, & Brainstorm templates
├── types/
│   └── mindmap.ts         # TypeScript interfaces, enums, & color definitions
└── App.tsx                # Main entry point & view router
```

---

## ✅ Testing Checklist

- [x] **Dashboard**: Loads properly, navigate between views, create new map.
- [x] **Node System**: Add node, inline edit text, drag position, change color/shape, delete node.
- [x] **Connections**: Connect source to target, arrowhead direction, dynamic path update on drag.
- [x] **Canvas Controls**: Zoom in/out, fit view, pan background, clear canvas.
- [x] **Undo/Redo**: Revert and restore node position, styling, and creation changes.
- [x] **Local Storage**: Save map, reload browser, open saved map, duplicate map, delete map.
- [x] **Templates**: Study Planner, SWOT Analysis, and Brainstorm Map load and remain fully editable.

---

## 🌐 Deployment Links

- **Live Demo Link**: [ADD LIVE DEMO LINK]
- **GitHub Repository**: [ADD GITHUB REPOSITORY LINK]

---

## 👤 Author Information

- **Author Name**: Khushi Gupta
- **Course**: B.Tech
- **Project Purpose**: Interactive visual productivity web application developed for academic evaluation.
