import React from 'react';
import { Edit3 } from './icons';

const Header: React.FC = () => {
  return (
    <header className="py-8 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-4">
           <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-lg">
             <Edit3 className="w-8 h-8"/>
           </div>
           <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Convertitore di Appunti AI
           </h1>
        </div>
        <p className="mt-3 text-lg text-gray-600">
          Trasforma i tuoi appunti disordinati in documenti chiari e strutturati.
        </p>
      </div>
    </header>
  );
};

export default Header;