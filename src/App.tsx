import { ExperienceProvider } from './experience/ExperienceContext';
import { SettingsProvider } from './context/SettingsContext';
import StoryExperience from './experience/StoryExperience';
import FullPortfolio from './components/FullPortfolio';
import { useExperience } from './experience/ExperienceContext';

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
      {isGuidedMode ? <StoryExperience /> : <FullPortfolio />}
    </>
  );
}

function App() {
  return (
    <ExperienceProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </ExperienceProvider>
  );
}

export default App;
