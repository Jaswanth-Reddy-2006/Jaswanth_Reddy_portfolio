import React, { createContext, useContext, useState } from 'react';

type MapContextType = {
    isMapOpen: boolean;
    setIsMapOpen: (v: boolean) => void;
    activeNodeId: string;
    setActiveNodeId: (id: string) => void;
    visitedNodes: string[];
    markVisited: (id: string) => void;
    animatingToNodeId: string | null;
    setAnimatingToNodeId: (id: string | null) => void;
};

const MapContext = createContext<MapContextType | null>(null);

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
    // Starts true so the map is the very first thing seen
    const [isMapOpen, setIsMapOpen] = useState(true); 
    const [activeNodeId, setActiveNodeId] = useState('chapter-1');
    const [visitedNodes, setVisitedNodes] = useState<string[]>(['chapter-1']);
    const [animatingToNodeId, setAnimatingToNodeId] = useState<string | null>(null);

    const markVisited = (id: string) => {
        if (!visitedNodes.includes(id)) {
            setVisitedNodes(prev => [...prev, id]);
        }
    };

    return (
        <MapContext.Provider value={{ 
            isMapOpen, setIsMapOpen, 
            activeNodeId, setActiveNodeId, 
            visitedNodes, markVisited,
            animatingToNodeId, setAnimatingToNodeId
        }}>
            {children}
        </MapContext.Provider>
    );
};

export const useMapNavigation = () => {
    const context = useContext(MapContext);
    if (!context) throw new Error("useMapNavigation must be used within MapProvider");
    return context;
};
