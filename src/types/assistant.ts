export type GeminiModelId =
  | 'gemini-3.5-flash'
  | 'gemini-3.1-pro-preview'
  | 'gemini-3.1-flash-lite';

export type GroundingMode = 'none' | 'maps' | 'search';

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri?: string;
    title?: string;
    placeAnswerSources?: {
      reviewSnippets?: Array<{
        snippetText?: string;
      }>;
    };
  };
}

export interface GroundingMetadata {
  webSearchQueries?: string[];
  groundingChunks?: GroundingChunk[];
}

export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  role: 'user' | 'model';
  text: string;
  model?: string;
  groundingMetadata?: GroundingMetadata | null;
  createdAt: string;
}

export interface ChatSession {
  id: string;
  userId: string;
  title: string;
  model: GeminiModelId;
  persona: string;
  groundingMode: GroundingMode;
  createdAt: string;
  updatedAt: string;
}

export interface SavedItem {
  id: string;
  userId: string;
  type: 'place' | 'web';
  title: string;
  uri: string;
  snippet?: string;
  savedAt: string;
}

export interface PersonaConfig {
  id: string;
  name: string;
  description: string;
  iconName: string;
  systemInstruction: string;
  defaultModel: GeminiModelId;
  defaultGrounding: GroundingMode;
}

