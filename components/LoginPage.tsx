import React, { useState } from 'react';
import { UserIcon } from './icons';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === 'andrea' && password === 'Blvrcn@2025!') {
      onLogin();
    } else {
      setError('ID o password non validi. Riprova.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
            <div className="inline-block p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-lg mb-4">
                <UserIcon className="w-8 h-8"/>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Accesso Richiesto</h1>
            <p className="text-gray-500 mt-2">Inserisci le tue credenziali per continuare.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="id-input" className="block text-sm font-medium text-gray-700">
              ID
            </label>
            <input
              type="text"
              id="id-input"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Il tuo ID utente"
              required
            />
          </div>

          <div>
            <label htmlFor="password-input" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="La tua password"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md">
                <p className="text-sm">{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
            >
              Accedi
            </button>
          </div>
        </form>
      </div>
       <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Convertitore di Appunti AI. Tutti i diritti riservati.</p>
        </footer>
    </div>
  );
};