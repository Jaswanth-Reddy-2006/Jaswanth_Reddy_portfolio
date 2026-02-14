import { ExperienceProvider } from './experience/ExperienceContext';
import { SettingsProvider } from './context/SettingsContext';
import GuidedExperience from './experience/GuidedExperience';
import FullPortfolio from './components/FullPortfolio';
import { useExperience } from './experience/ExperienceContext';

function AppContent() {
  const { isGuidedMode } = useExperience();

  if (isGuidedMode) {
    return <GuidedExperience />;
  }

  return <FullPortfolio />;
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
