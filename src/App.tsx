import React, { useState } from 'react';
import { ActiveTab, MindMap } from './types/mindmap';
import { DEFAULT_NEW_MAP, ALL_TEMPLATES } from './data/templates';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { MindMapEditor } from './components/MindMapEditor';
import { Templates } from './components/Templates';
import { SavedMaps } from './components/SavedMaps';
import { Help } from './components/Help';

export default function App() {
  const { maps, saveMap, deleteMap, duplicateMap } = useLocalStorage();
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [currentMap, setCurrentMap] = useState<MindMap>(() => maps[0] || DEFAULT_NEW_MAP);

  // Create brand new blank mind map
  const handleCreateNewMap = () => {
    const newId = `map-${Date.now()}`;
    const newMap: MindMap = {
      ...DEFAULT_NEW_MAP,
      id: newId,
      name: `Mind Map #${maps.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveMap(newMap);
    setCurrentMap(newMap);
    setActiveTab('editor');
  };

  // Create mind map from selected template
  const handleSelectTemplate = (template: MindMap) => {
    const newId = `map-${Date.now()}`;
    const newMap: MindMap = {
      ...JSON.parse(JSON.stringify(template)),
      id: newId,
      name: `${template.name} - ${new Date().toLocaleDateString()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveMap(newMap);
    setCurrentMap(newMap);
    setActiveTab('editor');
  };

  // Quick Action Template Category Handler from Dashboard
  const handleDashboardTemplateCategory = (category: 'study' | 'swot' | 'brainstorm') => {
    const matchedTemplate = ALL_TEMPLATES.find((t) => t.category === category) || ALL_TEMPLATES[0];
    handleSelectTemplate(matchedTemplate);
  };

  // Open existing saved map
  const handleOpenMap = (map: MindMap) => {
    setCurrentMap(map);
    setActiveTab('editor');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased">
      {/* Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewMap={handleCreateNewMap}
        savedCount={maps.length}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {activeTab === 'dashboard' && (
          <Dashboard
            savedMaps={maps}
            onNewMap={handleCreateNewMap}
            onSelectTemplate={handleDashboardTemplateCategory}
            onOpenMap={handleOpenMap}
            onDeleteMap={deleteMap}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'editor' && (
          <MindMapEditor
            initialMap={currentMap}
            onSaveMap={saveMap}
            onBackToDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'templates' && (
          <Templates onSelectTemplate={handleSelectTemplate} />
        )}

        {activeTab === 'saved' && (
          <SavedMaps
            maps={maps}
            onOpenMap={handleOpenMap}
            onDeleteMap={deleteMap}
            onDuplicateMap={duplicateMap}
            onNewMap={handleCreateNewMap}
          />
        )}

        {activeTab === 'help' && <Help />}
      </main>
    </div>
  );
}
