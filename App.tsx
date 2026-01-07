
import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ReportView from './components/ReportView';
import { BirthDetails, VedicReport } from './types';
import { generateAstrologyReport } from './services/geminiService';

const App: React.FC = () => {
  const [report, setReport] = useState<VedicReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (details: BirthDetails) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateAstrologyReport(details);
      setReport(result);
    } catch (err: any) {
      console.error(err);
      setError("The celestial alignment could not be calculated. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setReport(null);
    setError(null);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Navbar / Logo */}
      <nav className="relative z-10 px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-amber-500 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-amber-500 animate-pulse"></div>
          </div>
          <span className="font-cinzel text-xl tracking-widest text-amber-200">Jyotish Vision</span>
        </div>
      </nav>

      <main className="relative z-10 container mx-auto px-4 min-h-[calc(100vh-100px)] flex items-center justify-center">
        {!report ? (
          <div className="w-full flex flex-col items-center">
            <InputForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            
            {isLoading && (
              <div className="mt-8 text-center animate-pulse">
                <p className="text-amber-500 font-cinzel text-sm tracking-widest">Calculating Celestial Grid...</p>
                <p className="text-stone-500 text-xs italic mt-2">Connecting with ancient Parashara wisdom</p>
              </div>
            )}
            
            {error && (
              <div className="mt-6 p-4 bg-rose-900/20 border border-rose-900/50 rounded-lg text-rose-400 text-sm">
                {error}
              </div>
            )}
          </div>
        ) : (
          <ReportView report={report} onReset={handleReset} />
        )}
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 py-8 text-center opacity-30">
        <p className="text-[10px] uppercase tracking-[0.4em] text-stone-500">Ancient Science • Modern Insight • Ethical Occult</p>
      </footer>
    </div>
  );
};

export default App;
