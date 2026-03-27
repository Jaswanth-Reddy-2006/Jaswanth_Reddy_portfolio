import { ExperienceProvider } from './experience/ExperienceContext';
import { SettingsProvider } from './context/SettingsContext';
import { MapProvider } from './context/MapContext';
import MindsetIntro from './experience/MindsetIntro';
import FullPortfolio from './components/FullPortfolio';
import { useExperience } from './experience/ExperienceContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function FlashOverlay() {
  const { isRevealing } = useExperience();
  return (
    <AnimatePresence>
      {isRevealing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, times: [0, 0.2, 1], ease: "easeInOut" }}
          className="fixed inset-0 z-[999] bg-white pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
}

function AppContent() {
  const { isGuidedMode } = useExperience();

  return (
    <>
      <FlashOverlay />
      <Routes>
        <Route path="/" element={isGuidedMode ? <MindsetIntro /> : <Navigate to="/chapter-1" />} />
        <Route path="/:chapterId" element={<FullPortfolio />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ExperienceProvider>
      <SettingsProvider>
        <MapProvider>
          <AppContent />
        </MapProvider>
      </SettingsProvider>
    </ExperienceProvider>
  );
}

export default App;
