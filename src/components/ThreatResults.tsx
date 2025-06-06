
import React, { useState } from 'react';
import { AlertTriangle, Shield, Trash2, X, CheckCircle, Clock } from 'lucide-react';

interface ThreatResultsProps {
  onReset: () => void;
}

export const ThreatResults: React.FC<ThreatResultsProps> = ({ onReset }) => {
  const [removalAttempts, setRemovalAttempts] = useState(0);
  const [isRemoving, setIsRemoving] = useState(false);
  const [removalStatus, setRemovalStatus] = useState<'none' | 'partial' | 'success'>('none');

  const threats = [
    {
      name: 'Trojan.iOS.FakeBank.A',
      type: 'Trojan',
      severity: 'Wysokie',
      location: '/System/Library/PrivateFrameworks/MobileBackup.framework/',
      color: 'red'
    },
    {
      name: 'Adware.Generic.iOS',
      type: 'Adware',
      severity: 'Średnie',
      location: '/var/mobile/Applications/Safari.app/',
      color: 'orange'
    }
  ];

  const handleRemoval = () => {
    setIsRemoving(true);
    
    setTimeout(() => {
      const newAttempts = removalAttempts + 1;
      setRemovalAttempts(newAttempts);
      
      if (newAttempts < 6) {
        setRemovalStatus('partial');
      } else {
        setRemovalStatus('success');
      }
      
      setIsRemoving(false);
    }, 3000);
  };

  if (removalStatus === 'success') {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-6 animate-fade-in">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <h2 className="text-xl font-bold text-green-600 mb-2">
            Zagrożenia zostały usunięte!
          </h2>
          <p className="text-gray-600 text-sm">
            Wszystkie wykryte zagrożenia zostały pomyślnie usunięte z Twojego urządzenia
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-green-800 mb-1">Urządzenie zabezpieczone</p>
              <p className="text-green-700">
                Twoje urządzenie jest teraz bezpieczne. Zalecamy regularne skanowanie w celu utrzymania ochrony.
              </p>
            </div>
          </div>
        </div>

        <button 
          onClick={onReset}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Skanuj ponownie
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 animate-fade-in">
      <div className="text-center mb-6">
        <div className="relative mb-4">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-600 animate-pulse" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-red-600 mb-2">
          Wykryto zagrożenia!
        </h2>
        <p className="text-gray-600 text-sm">
          Znaleziono {threats.length} zagrożenia na Twoim urządzeniu
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {threats.map((threat, index) => (
          <div key={index} className="threat-card border border-red-200 rounded-xl p-4 bg-red-50">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center mb-2">
                  <div className={`w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse`}></div>
                  <h3 className="font-semibold text-gray-800 text-sm">{threat.name}</h3>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>Typ: <span className="font-medium">{threat.type}</span></div>
                  <div>Poziom: <span className={`font-medium ${threat.color === 'red' ? 'text-red-600' : 'text-orange-600'}`}>{threat.severity}</span></div>
                  <div className="break-all">Lokalizacja: <span className="font-mono text-xs">{threat.location}</span></div>
                </div>
              </div>
              <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0 ml-2" />
            </div>
          </div>
        ))}
      </div>

      {removalStatus === 'partial' && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-4 mb-6 shadow-lg animate-pulse">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-yellow-800" />
            </div>
            <div className="text-sm flex-1">
              <p className="font-bold text-yellow-800 mb-1">Usuwanie częściowo się powiodło</p>
              <p className="text-yellow-700">
                Niektóre zagrożenia wymagają dodatkowego skanowania. Spróbuj jeszcze raz.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
        <div className="flex items-start">
          <Shield className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-yellow-800 mb-1">Natychmiastowe działanie wymagane</p>
            <p className="text-yellow-700">
              Wykryte zagrożenia mogą kraść dane osobowe. 
              Usuń je natychmiast, aby zabezpieczyć swoje urządzenie.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button 
          onClick={handleRemoval}
          disabled={isRemoving}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:transform-none"
        >
          {isRemoving ? (
            <>
              <div className="w-5 h-5 inline mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Usuwanie zagrożeń...
            </>
          ) : (
            <>
              <Trash2 className="w-5 h-5 inline mr-2" />
              Usuń wszystkie zagrożenia (PREMIUM)
            </>
          )}
        </button>
        
        <button 
          onClick={onReset}
          className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
        >
          Skanuj ponownie
        </button>
      </div>

      <div className="mt-4 text-center text-xs text-gray-500">
        Skanowanie zakończone • {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};
