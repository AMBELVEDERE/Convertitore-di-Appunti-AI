import React, { useState, useCallback } from 'react';
import { rewriteNotes } from './services/geminiService';
import type { RewrittenNotes } from './types';
import Header from './components/Header';
import NoteInput from './components/NoteInput';
import NoteOutput from './components/NoteOutput';
import LoadingSpinner from './components/LoadingSpinner';
import { LoginPage } from './components/LoginPage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [rawNotes, setRawNotes] = useState<string>('');
  const [rewrittenNotes, setRewrittenNotes] = useState<RewrittenNotes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRewrite = useCallback(async () => {
    if (!rawNotes.trim()) {
      setError('Per favore, inserisci degli appunti prima di chiedere alla AI.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRewrittenNotes(null);

    try {
      const result = await rewriteNotes(rawNotes);
      setRewrittenNotes(result);
    } catch (e) {
      console.error(e);
      setError('Oops! Qualcosa è andato storto durante la comunicazione con la AI. Riprova più tardi.');
    } finally {
      setIsLoading(false);
    }
  }, [rawNotes]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
          <NoteInput
            notes={rawNotes}
            setNotes={setRawNotes}
            onRewrite={handleRewrite}
            isLoading={isLoading}
          />

          {isLoading && (
            <div className="flex flex-col items-center justify-center mt-8">
              <LoadingSpinner />
              <p className="mt-4 text-lg text-gray-600 animate-pulse">L'AI sta riorganizzando i tuoi appunti...</p>
            </div>
          )}

          {error && (
             <div className="mt-8 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
                <p className="font-bold">Errore</p>
                <p>{error}</p>
            </div>
          )}

          {rewrittenNotes && !isLoading && (
            <div className="mt-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-indigo-200 pb-2">Ecco i tuoi appunti riorganizzati:</h2>
              <NoteOutput notes={rewrittenNotes} />
            </div>
          )}
        </div>
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Powered by Gemini AI</p>
          <p>&copy; {new Date().getFullYear()} Convertitore di Appunti AI. Tutti i diritti riservati.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;