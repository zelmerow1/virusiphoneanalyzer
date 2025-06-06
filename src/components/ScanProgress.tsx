
import React from 'react';
import { Search, Zap } from 'lucide-react';

interface ScanProgressProps {
  progress: number;
  currentScan: string;
}

export const ScanProgress: React.FC<ScanProgressProps> = ({ progress, currentScan }) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 animate-fade-in">
      <div className="text-center mb-6">
        <div className="relative mb-4">
          <div className="scanner-container">
            <Search className="w-16 h-16 mx-auto text-blue-600 scanner-icon" />
            <div className="scanner-beam"></div>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Skanowanie w toku...
        </h2>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Postęp skanowania</span>
          <span className="text-sm font-bold text-blue-600">{progress}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <div className="flex items-center text-sm text-gray-700">
          <Zap className="w-4 h-4 mr-2 text-yellow-500 animate-pulse" />
          <span className="scanning-text">{currentScan}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center text-sm">
        <div className="bg-green-50 rounded-lg p-3">
          <div className="text-green-600 font-bold text-lg">
            {Math.floor(progress * 2.34)}
          </div>
          <div className="text-green-700">Plików sprawdzonych</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="text-blue-600 font-bold text-lg">
            {Math.floor(progress * 0.12)}
          </div>
          <div className="text-blue-700">Aplikacji sprawdzonych</div>
        </div>
      </div>
    </div>
  );
};
