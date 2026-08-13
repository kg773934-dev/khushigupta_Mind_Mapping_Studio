import { useState, useEffect, useCallback } from 'react';
import { MindMap } from '../types/mindmap';
import { ALL_TEMPLATES } from '../data/templates';

const STORAGE_KEY = 'mindmap_studio_maps_v1';

export function useLocalStorage() {
  const [maps, setMaps] = useState<MindMap[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load mind maps from local storage', e);
    }
    // Seed with initial template sample maps if empty
    return [
      {
        ...ALL_TEMPLATES[0],
        id: 'sample-study-planner',
        name: 'My First Study Planner',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  });

  // Save to local storage whenever maps state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(maps));
    } catch (e) {
      console.error('Failed to write to local storage', e);
    }
  }, [maps]);

  const saveMap = useCallback((mapToSave: MindMap) => {
    setMaps((prev) => {
      const now = new Date().toISOString();
      const updatedMap = {
        ...mapToSave,
        updatedAt: now
      };

      const existingIndex = prev.findIndex((m) => m.id === mapToSave.id);
      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex] = updatedMap;
        return copy;
      } else {
        return [updatedMap, ...prev];
      }
    });
  }, []);

  const deleteMap = useCallback((id: string) => {
    setMaps((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const duplicateMap = useCallback((id: string) => {
    setMaps((prev) => {
      const source = prev.find((m) => m.id === id);
      if (!source) return prev;

      const newId = `map-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const duplicated: MindMap = {
        ...JSON.parse(JSON.stringify(source)),
        id: newId,
        name: `${source.name} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      return [duplicated, ...prev];
    });
  }, []);

  const getMapById = useCallback(
    (id: string): MindMap | undefined => {
      return maps.find((m) => m.id === id);
    },
    [maps]
  );

  return {
    maps,
    saveMap,
    deleteMap,
    duplicateMap,
    getMapById
  };
}
