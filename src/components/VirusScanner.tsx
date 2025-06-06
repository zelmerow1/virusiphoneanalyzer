
import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Search } from 'lucide-react';
import { ScanProgress } from './ScanProgress';
import { ThreatResults } from './ThreatResults';

export const VirusScanner = () => {
  const [scanStage, setScanStage] = useState<'initial' | 'scanning' | 'results'>('initial');
  const [progress, setProgress] = useState(0);
  const [currentScan, setCurrentScan] = useState('');

  const scanSteps = [
    'Skanowanie pamięci systemowej...',
    'Sprawdzanie aplikacji...',
    'Analiza plików tymczasowych...',
    'Wykrywanie trojańskich koni...',
    'Sprawdzanie rootkitów...',
    'Skanowanie złośliwego oprogramowania...',
    'Analiza zagrożeń sieciowych...',
    'Finalizacja skanowania...'
  ];

  useEffect(() => {
    if (scanStage === 'scanning') {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress <= 100) {
            const stepIndex = Math.floor((newProgress / 100) * scanSteps.length);
            if (stepIndex < scanSteps.length) {
              setCurrentScan(scanSteps[stepIndex]);
            }
            
            if (newProgress === 100) {
              setTimeout(() => setScanStage('results'), 1000);
            }
            
            return newProgress;
          }
          clearInterval(interval);
          return prev;
        });
      }, 80);

      return () => clearInterval(interval);
    }
  }, [scanStage]);

  const startScan = () => {
    setScanStage('scanning');
    setProgress(0);
    setCurrentScan('Inicjalizacja skanowania...');
  };

  const resetScan = () => {
    setScanStage('initial');
    setProgress(0);
    setCurrentScan('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {scanStage === 'initial' && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center animate-fade-in">
            <div className="mb-6">
              <div className="relative">
                <Shield className="w-20 h-20 mx-auto text-blue-600 animate-pulse" />
                <div className="absolute -top-2 -right-2">
                  <div className="w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
                  <div className="w-6 h-6 bg-red-500 rounded-full absolute top-0"></div>
                </div>
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Mobilny Antywirus Pro
            </h1>
            <p className="text-gray-600 mb-6">
              Ochrona iPhone w czasie rzeczywistym
            </p>
            
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6 rounded">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                <p className="text-sm text-orange-700">
                  Wykryto podejrzaną aktywność. Zalecane natychmiastowe skanowanie.
                </p>
              </div>
            </div>
            
            <button
              onClick={startScan}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <Search className="w-5 h-5 inline mr-2" />
              Rozpocznij Pełne Skanowanie
            </button>
            
            <div className="mt-4 text-xs text-gray-500">
              Ostatnie skanowanie: Nigdy
            </div>
          </div>
        )}

        {scanStage === 'scanning' && (
          <ScanProgress progress={progress} currentScan={currentScan} />
        )}

        {scanStage === 'results' && (
          <ThreatResults onReset={resetScan} />
        )}
      </div>
    </div>
  );
};
