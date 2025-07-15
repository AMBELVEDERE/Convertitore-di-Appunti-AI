
import { GoogleGenAI, Type } from "@google/genai";
import type { RewrittenNotes } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "Un titolo conciso e accattivante per gli appunti."
    },
    body: {
      type: Type.STRING,
      description: "Il corpo principale degli appunti, riorganizzato in modo chiaro e logico, usando paragrafi, elenchi puntati o numerati se necessario. Formatta come una singola stringa, usando \\n per le nuove righe."
    },
    conclusion: {
      type: Type.STRING,
      description: "Una breve conclusione o riassunto dei punti chiave."
    },
  },
  required: ['title', 'body', 'conclusion']
};

export const rewriteNotes = async (rawNotes: string): Promise<RewrittenNotes> => {
  const prompt = `
Sei un assistente esperto nella riorganizzazione di appunti. Il tuo compito è prendere il testo fornito, analizzarlo e strutturarlo in modo chiaro e conciso. Devi restituire un oggetto JSON con tre campi: 'title', 'body', e 'conclusion'.

- 'title': Un titolo breve e significativo per gli appunti.
- 'body': Il corpo principale degli appunti, formattato con paragrafi, elenchi puntati o numerati per la massima leggibilità. Usa \\n per le interruzioni di riga.
- 'conclusion': Un breve paragrafo conclusivo che riassume i punti chiave.

Ecco gli appunti da elaborare:
---
${rawNotes}
---
`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: responseSchema,
      temperature: 0.5,
    },
  });

  const jsonText = response.text.trim();
  try {
    const parsedJson = JSON.parse(jsonText);
    return parsedJson as RewrittenNotes;
  } catch (error) {
    console.error("Failed to parse Gemini response:", jsonText);
    throw new Error("La risposta della AI non era in un formato JSON valido.");
  }
};
