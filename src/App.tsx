import React, { useEffect } from 'react';
import { useAppStore } from './stores/useAppStore';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { OnboardingModal } from './modules/Onboarding/OnboardingModal';
import { PlannerModule } from './modules/Planner/PlannerModule';
import { AfternoonModule } from './modules/Afternoon/AfternoonModule';
import { TasksModule } from './modules/Tasks/TasksModule';
import { AcreditacionesModule } from './modules/Tasks/AcreditacionesModule';
import { ExamSimulatorModule } from './modules/Exams/ExamSimulatorModule';
import { FlashcardsModule } from './modules/Flashcards/FlashcardsModule';
import { MusicModule } from './modules/Music/MusicModule';
import { FocusModule } from './modules/Focus/FocusModule';
import { SettingsModule } from './modules/Settings/SettingsModule';

export const App: React.FC = () => {
  const { activeTab, isDarkMode } = useAppStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderModule = () => {
    switch (activeTab) {
      case 'planner':
        return <PlannerModule />;
      case 'afternoon':
        return <AfternoonModule />;
      case 'tasks':
        return <TasksModule />;
      case 'acreditaciones':
        return <AcreditacionesModule />;
      case 'exams':
        return <ExamSimulatorModule />;
      case 'flashcards':
        return <FlashcardsModule />;
      case 'music':
        return <MusicModule />;
      case 'focus':
        return <FocusModule />;
      case 'settings':
        return <SettingsModule />;
      default:
        return <PlannerModule />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FAF8FF] dark:bg-[#0F0A1C] text-[#1E1B4B] dark:text-[#F5F3FF]">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {renderModule()}
          </div>
        </main>
      </div>

      {/* 4-Step Onboarding Modal */}
      <OnboardingModal />
    </div>
  );
};

export default App;
