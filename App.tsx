
import React from 'react';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center font-sans p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white">React Calculator</h1>
        <p className="text-slate-400">Ready for Firebase Deployment</p>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <Calculator />
      </main>
      <footer className="w-full text-center p-4 text-slate-500 text-sm mt-8">
        <p>Built with React, TypeScript, and Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
