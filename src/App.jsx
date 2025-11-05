import { useState } from 'react';
import FocusSpace from './components/FocusSpace';
import ReflectionSpace from './components/ReflectionSpace';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('focus'); // 'focus' or 'reflection'

  const handleFinishSession = () => {
    // Optionally switch to reflection space after finishing
    // For now, we'll stay in focus mode to allow continuous writing
  };

  const switchToFocus = () => {
    setCurrentView('focus');
  };

  const switchToReflection = () => {
    setCurrentView('reflection');
  };

  return (
    <div className="app">
      <nav className="app-nav">
        <div className="nav-brand">Just Write</div>
        <div className="nav-links">
          <button
            className={`nav-link ${currentView === 'focus' ? 'active' : ''}`}
            onClick={switchToFocus}
          >
            Write
          </button>
          <button
            className={`nav-link ${currentView === 'reflection' ? 'active' : ''}`}
            onClick={switchToReflection}
          >
            Reflect
          </button>
        </div>
      </nav>

      <main className="app-main">
        {currentView === 'focus' ? (
          <FocusSpace onFinish={handleFinishSession} />
        ) : (
          <ReflectionSpace />
        )}
      </main>
    </div>
  );
}

export default App;
