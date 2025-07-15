
import React, { useState, useEffect } from 'react';
import type { RewrittenNotes } from '../types';
import { CopyIcon, DownloadIcon, ShareIcon, CheckIcon } from './icons';

interface NoteOutputProps {
  notes: RewrittenNotes;
}

const NoteOutput: React.FC<NoteOutputProps> = ({ notes }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (navigator.share) {
      setCanShare(true);
    }
  }, []);

  const fullText = `# ${notes.title}\n\n${notes.body}\n\n---\n\n### Conclusione\n\n${notes.conclusion}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };
  
  const handleDownload = () => {
    const blob = new Blob([fullText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${notes.title.replace(/ /g, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Appunti: ${notes.title}`,
          text: fullText,
        });
      } catch (error) {
        console.error('Errore durante la condivisione:', error);
      }
    }
  };


  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-3xl font-bold text-gray-900">{notes.title}</h3>
        
        <div className="mt-6 prose prose-indigo max-w-none">
            <p className="whitespace-pre-wrap">{notes.body}</p>
        </div>

        <hr className="my-6 border-gray-200" />

        <div>
            <h4 className="text-xl font-semibold text-gray-800">Conclusione</h4>
            <p className="mt-2 text-gray-700 italic whitespace-pre-wrap">{notes.conclusion}</p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-4 items-center justify-center sm:justify-start">
            <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors duration-200"
            >
                {isCopied ? <CheckIcon className="w-5 h-5 text-green-500"/> : <CopyIcon className="w-5 h-5"/>}
                {isCopied ? 'Copiato!' : 'Copia'}
            </button>
            <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors duration-200"
            >
                <DownloadIcon className="w-5 h-5" />
                <span>Download (.md)</span>
            </button>
            {canShare && (
                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-pink-600 bg-pink-100 rounded-lg hover:bg-pink-200 transition-colors duration-200"
                >
                    <ShareIcon className="w-5 h-5" />
                    <span>Condividi</span>
                </button>
            )}
        </div>
    </div>
  );
};

export default NoteOutput;
