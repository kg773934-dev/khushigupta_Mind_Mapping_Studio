# Academic Project Report — Mind Mapping Studio

**Project Title:** Mind Mapping Studio  
**Project Type:** Interactive Visual Web Application  
**Author:** Khushi Gupta  
**Course:** B.Tech  
**Technology Stack:** React 19, TypeScript, Tailwind CSS, SVG, Local Storage  

---

## 1. Abstract

Mind Mapping Studio is a visual productivity and concept-mapping web application designed to help students, developers, and educators structure complex information into intuitive, node-based visual graphs. The application features an interactive canvas with fluid node dragging, real-time SVG arrow rendering, customizable node geometry and color palettes, canvas zoom/pan navigation, undo/redo history management, and offline Local Storage persistence.

---

## 2. Introduction & Purpose

In modern educational and technical environments, visual mind mapping is proven to enhance information retention, strategic planning, and creative brainstorming. Existing tools often require paid subscriptions, cloud server accounts, or complex sign-ups. Mind Mapping Studio provides an accessible, high-performance, frontend-only alternative that runs entirely within the client browser while offering rich desktop-class desktop features.

---

## 3. System Requirements & Specifications

### Functional Requirements
1. **Interactive Canvas**:
   - Support arbitrary node placement, mouse drag positioning, canvas panning, and zoom scaling (0.4x–2.5x).
2. **Node Operations**:
   - Creation, inline editing, styling (9 color themes, 4 shapes), font scaling, and deletion.
3. **SVG Connection Layer**:
   - Directed relationships with arrowhead markers that automatically recalculate path geometry during node movement.
4. **State Persistence & History**:
   - Real-time Local Storage save/load and multi-step Undo/Redo stack.
5. **Predefined Blueprints**:
   - Built-in templates for Study Planning, SWOT Analysis, and Brainstorming.

### Non-Functional Requirements
- **Performance**: Render 50+ connected nodes at 60 FPS.
- **Usability**: Accessible keyboard shortcuts (<kbd>Delete</kbd>, <kbd>Ctrl+Z</kbd>, <kbd>Ctrl+Y</kbd>, <kbd>Esc</kbd>).
- **Zero External Dependencies**: Client-side execution without requiring backend APIs or external databases.

---

## 4. Implementation Details & Modules

1. **Dashboard Module (`src/components/Dashboard.tsx`)**:
   - Displays project tagline, quick action cards, starter blueprints, and recent saved maps.
2. **Editor Module (`src/components/MindMapEditor.tsx`)**:
   - Coordinates toolbar actions, inspector drawer toggle, undo/redo state synchronization, and canvas updates.
3. **Canvas Engine (`src/components/MindMapCanvas.tsx`)**:
   - Handles mouse coordinate translation, SVG definition markers, connection preview lines, and drag listeners.
4. **Custom Hooks (`src/hooks/`)**:
   - `useUndoRedo`: Handles history stacks for atomic state operations.
   - `useLocalStorage`: Manages client-side JSON serialization and deserialization.

---

## 5. Testing & Verification

The application was verified against the following test protocol:

| Test Case | Interaction | Expected Outcome | Result |
| :--- | :--- | :--- | :--- |
| **TC-01** | Click "+ New Mind Map" | Opens editor with default starter nodes | **PASS** |
| **TC-02** | Drag Node across canvas | Position updates smoothly; SVG arrows adjust in real-time | **PASS** |
| **TC-03** | Connect Node A to Node B | Directional SVG arrow drawn with arrowhead marker | **PASS** |
| **TC-04** | Change Node Color & Shape | Node background, border, and shape update immediately | **PASS** |
| **TC-05** | Click "Save Map" & Reload | Map state is reloaded from Local Storage intact | **PASS** |
| **TC-06** | Click "Undo" (Ctrl+Z) | Last node drag or edit action is reverted | **PASS** |
| **TC-07** | Load "Study Planner" Template | Academic nodes and connections populate canvas | **PASS** |

---

## 6. Conclusion

Mind Mapping Studio successfully meets all technical objectives, delivering a polished, robust, and responsive visual mind mapping application suitable for college assignment submission and practical real-world usage.
