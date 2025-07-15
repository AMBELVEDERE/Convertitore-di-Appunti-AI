
import React from 'react';

interface NoteInputProps {
  notes: string;
  setNotes: (notes: string) => void;
  onRewrite: () => void;
  isLoading: boolean;
}

const NoteInput: React.FC<NoteInputProps> = ({ notes, setNotes, onRewrite, isLoading }) => {
  return (
    <div>
      <label htmlFor="notes-input" className="block text-lg font-semibold text-gray-700 mb-2">
        I tuoi appunti
      </label>
      <p className="text-sm text-gray-500 mb-4">
        Incolla o scrivi qui i tuoi appunti. L'AI li riorganizzerà per te.
      </p>
      <textarea
        id="notes-input"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Es: Meeting con il team di marketing - discutere nuova campagna social - budget €5k - target 18-25 - lanciare la prossima settimana..."
        className="w-full h-48 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-y"
        disabled={isLoading}
      />
      <div className="mt-6 text-center">
        <button
          onClick={onRewrite}
          disabled={isLoading || !notes.trim()}
          className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md"
        >
          {isLoading ? 'Elaborazione...' : 'Chiedi alla AI'}
        </button>
      </div>
    </div>
  );
};

export default NoteInput;
