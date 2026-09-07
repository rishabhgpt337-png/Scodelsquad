"use client";

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Send,
  Sparkles,
  MapPin,
  Globe,
  Bot,
  User as UserIcon,
  Copy,
  Check,
  Menu,
  LocateFixed,
  Sliders,
  AlertCircle,
  Loader2,
  ChevronDown,
  Info,
} from 'lucide-react';
import {
  ChatMessage,
  ChatSession,
  GeminiModelId,
  GroundingMode,
  SavedItem,
} from '@/types/assistant';
import { AVAILABLE_PERSONAS } from '@/lib/assistant/personas';
import GroundingSources from './GroundingSources';

interface ChatViewProps {
  chat: ChatSession | null;
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (text: string) => Promise<void>;
  onUpdateChatSettings: (updates: {
    model?: GeminiModelId;
    groundingMode?: GroundingMode;
    persona?: string;
  }) => void;
  onSaveBookmark: (item: Omit<SavedItem, 'id' | 'savedAt' | 'userId'>) => Promise<void>;
  savedUrls: Set<string>;
  onToggleSidebar: () => void;
  userLocation: { latitude: number; longitude: number } | null;
  onDetectLocation: () => void;
  locationStatus: 'idle' | 'detecting' | 'enabled' | 'denied';
}

export default function ChatView({
  chat,
  messages,
  isLoading,
  onSendMessage,
  onUpdateChatSettings,
  onSaveBookmark,
  savedUrls,
  onToggleSidebar,
  userLocation,
  onDetectLocation,
  locationStatus,
}: ChatViewProps) {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showRoleConfig, setShowRoleConfig] = useState(false);
  const [customInstruction, setCustomInstruction] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activePersona =
    AVAILABLE_PERSONAS.find((p) => p.id === chat?.persona) || AVAILABLE_PERSONAS[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    const text = inputText.trim();
    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    onSendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 180)}px`;
  };

  const quickPrompts = [
    {
      title: 'Nearby Coffee & Workspaces',
      text: 'What are the top 3 cozy cafes with good Wi-Fi and quiet atmosphere nearby? Provide locations and highlights.',
      grounding: 'maps' as GroundingMode,
      model: 'gemini-2.5-flash' as GeminiModelId,
      persona: 'local_guide',
    },
    {
      title: 'Current Tech Breakthroughs',
      text: 'What are the latest AI and technology headlines from this week? Ground with web sources and citations.',
      grounding: 'search' as GroundingMode,
      model: 'gemini-2.5-flash' as GeminiModelId,
      persona: 'researcher',
    },
    {
      title: 'Complex Code Architecture',
      text: 'Analyze the trade-offs between CQRS and traditional CRUD for high-concurrency event-driven systems in TypeScript.',
      grounding: 'none' as GroundingMode,
      model: 'gemini-1.5-pro' as GeminiModelId,
      persona: 'deep_thinker',
    },
  ];

  const currentGrounding = chat?.groundingMode || 'none';
  const currentModel = chat?.model || 'gemini-2.0-flash';

  return (
    <div id="chat-container" className="flex-1 flex flex-col h-full min-h-0 bg-white relative">
      {/* Top Header Controls Bar */}
      <header
        id="chat-header"
        className="w-full border-b border-stone-200/90 bg-stone-50/70 px-4 py-3 shrink-0 flex flex-wrap items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            id="mobile-sidebar-toggle"
            onClick={onToggleSidebar}
            className="md:hidden p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-stone-900 truncate">
              {chat?.title || 'New Conversation'}
            </h2>
            <div className="flex items-center gap-2 text-[11px] text-stone-500">
              <span className="font-medium text-stone-700">{activePersona.name}</span>
              <span>•</span>
              <span className="font-mono text-stone-600">{currentModel}</span>
            </div>
          </div>
        </div>

        {/* Configuration Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Grounding Mode Picker */}
          <div className="flex items-center p-0.5 rounded-lg bg-stone-200/70 border border-stone-300/60 text-xs">
            <button
              type="button"
              id="grounding-none-btn"
              onClick={() => onUpdateChatSettings({ groundingMode: 'none' })}
              className={`px-2.5 py-1 rounded-md transition-all ${
                currentGrounding === 'none'
                  ? 'bg-white text-stone-900 font-medium shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Standard AI without external grounding"
            >
              Standard
            </button>

            <button
              type="button"
              id="grounding-search-btn"
              onClick={() =>
                onUpdateChatSettings({
                  groundingMode: 'search',
                  model: 'gemini-2.5-flash',
                })
              }
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                currentGrounding === 'search'
                  ? 'bg-sky-600 text-white font-medium shadow-2xs'
                  : 'text-stone-600 hover:text-sky-700'
              }`}
              title="Google Search Grounding with gemini-2.5-flash"
            >
              <Globe className="w-3 h-3" />
              <span>Search</span>
            </button>

            <button
              type="button"
              id="grounding-maps-btn"
              onClick={() =>
                onUpdateChatSettings({
                  groundingMode: 'maps',
                  model: 'gemini-2.5-flash',
                })
              }
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                currentGrounding === 'maps'
                  ? 'bg-emerald-600 text-white font-medium shadow-2xs'
                  : 'text-stone-600 hover:text-emerald-700'
              }`}
              title="Google Maps Grounding with gemini-2.5-flash"
            >
              <MapPin className="w-3 h-3" />
              <span>Maps</span>
            </button>
          </div>

          {/* Model Selector Dropdown */}
          <div className="relative inline-block text-xs">
            <select
              id="model-select"
              value={currentModel}
              onChange={(e) =>
                onUpdateChatSettings({
                  model: e.target.value as GeminiModelId,
                  // If switching while grounding is active
                  groundingMode:
                    e.target.value !== 'gemini-2.5-flash' && e.target.value !== 'gemini-2.0-flash' && currentGrounding !== 'none'
                      ? 'none'
                      : currentGrounding,
                })
              }
              className="appearance-none bg-white border border-stone-300 text-stone-800 py-1.5 pl-3 pr-8 rounded-lg font-mono text-[11px] shadow-2xs focus:outline-none focus:ring-1 focus:ring-stone-400 cursor-pointer"
            >
              <option value="gemini-2.5-flash">gemini-2.5-flash (Fast &amp; Grounding)</option>
              <option value="gemini-2.0-flash">gemini-2.0-flash (Balanced)</option>
              <option value="gemini-1.5-pro">gemini-1.5-pro (Deep Reasoning)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Location button for Maps Grounding */}
          {currentGrounding === 'maps' && (
            <button
              type="button"
              id="location-toggle-btn"
              onClick={onDetectLocation}
              disabled={locationStatus === 'detecting'}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-all ${
                userLocation
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-white border-stone-300 text-stone-600 hover:bg-stone-50'
              }`}
              title={
                userLocation
                  ? `Active: ${userLocation.latitude.toFixed(2)}, ${userLocation.longitude.toFixed(2)}`
                  : 'Detect my location for accurate local recommendations'
              }
            >
              <LocateFixed
                className={`w-3.5 h-3.5 ${
                  locationStatus === 'detecting' ? 'animate-spin text-emerald-600' : ''
                }`}
              />
              <span className="hidden sm:inline">
                {userLocation ? 'Location Shared' : 'Share Location'}
              </span>
            </button>
          )}

          {/* Role / Persona Settings Toggle */}
          <button
            type="button"
            id="role-config-btn"
            onClick={() => setShowRoleConfig(!showRoleConfig)}
            className={`p-1.5 rounded-lg border text-stone-600 hover:bg-stone-100 transition-colors ${
              showRoleConfig ? 'bg-stone-200 border-stone-300' : 'border-stone-200 bg-white'
            }`}
            title="Chatbot Role & System Instructions"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Role / System Instruction Drawer */}
      {showRoleConfig && (
        <div
          id="role-config-drawer"
          className="border-b border-stone-200 bg-stone-50 px-4 py-3.5 text-xs animate-in slide-in-from-top-1"
        >
          <div className="max-w-4xl mx-auto space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-800">
                Chatbot Role &amp; System Instruction
              </span>
              <button
                type="button"
                onClick={() => setShowRoleConfig(false)}
                className="text-stone-400 hover:text-stone-700 text-xs"
              >
                Done
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {AVAILABLE_PERSONAS.map((persona) => {
                const isSelected = activePersona.id === persona.id;
                return (
                  <button
                    key={persona.id}
                    type="button"
                    onClick={() => {
                      onUpdateChatSettings({
                        persona: persona.id,
                        model: persona.defaultModel,
                        groundingMode: persona.defaultGrounding,
                      });
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-white border-stone-800 ring-1 ring-stone-800 shadow-2xs'
                        : 'bg-white/70 border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <p className="font-semibold text-stone-900 text-xs">{persona.name}</p>
                    <p className="text-[10px] text-stone-500 mt-1 line-clamp-2">
                      {persona.description}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 text-[11px] text-stone-500 flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
              <span>
                Active System Instruction: &ldquo;{activePersona.systemInstruction}&rdquo;
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Scrollable Message Thread */}
      <div
        id="messages-thread"
        className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-6"
      >
        {messages.length === 0 ? (
          <div className="max-w-2xl mx-auto py-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center mx-auto mb-4 border border-stone-200">
              <Sparkles className="w-6 h-6 text-emerald-600" />
            </div>

            <h3 className="text-xl font-semibold text-stone-900 mb-2">
              {activePersona.name}
            </h3>
            <p className="text-sm text-stone-500 max-w-md mx-auto mb-8">
              {activePersona.description}
            </p>

            <div className="space-y-2.5 text-left">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider px-1">
                Suggested Starters
              </p>
              <div className="grid grid-cols-1 gap-2.5">
                {quickPrompts.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    id={`quick-prompt-${idx}`}
                    onClick={() => {
                      onUpdateChatSettings({
                        groundingMode: item.grounding,
                        model: item.model,
                        persona: item.persona,
                      });
                      onSendMessage(item.text);
                    }}
                    className="p-3 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 hover:border-stone-300 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-stone-800 group-hover:text-emerald-700 transition-colors">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                        {item.grounding === 'maps'
                          ? 'Google Maps'
                          : item.grounding === 'search'
                          ? 'Google Search'
                          : item.model}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 line-clamp-1">{item.text}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => {
              const isUser = message.role === 'user';
              return (
                <div
                  key={message.id}
                  id={`message-${message.id}`}
                  className={`flex items-start gap-3 text-sm ${
                    isUser ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Avatar Icon */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold ${
                      isUser
                        ? 'bg-stone-900 text-white'
                        : 'bg-emerald-700 text-white shadow-2xs'
                    }`}
                  >
                    {isUser ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 transition-all ${
                      isUser
                        ? 'bg-stone-900 text-stone-100 rounded-tr-xs'
                        : 'bg-stone-50/90 border border-stone-200/90 text-stone-900 rounded-tl-xs shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <span
                        className={`text-[11px] font-medium ${
                          isUser ? 'text-stone-400' : 'text-stone-500'
                        }`}
                      >
                        {isUser ? 'You' : message.model || 'Gemini'}
                      </span>

                      {!isUser && (
                        <button
                          type="button"
                          onClick={() => handleCopy(message.text, message.id)}
                          className="p-1 rounded text-stone-400 hover:text-stone-700 transition-colors"
                          title="Copy text"
                        >
                          {copiedId === message.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Markdown Content */}
                    <div
                      className={`prose prose-sm max-w-none break-words leading-relaxed ${
                        isUser
                          ? 'text-stone-100 prose-invert'
                          : 'text-stone-800 prose-headings:text-stone-900 prose-code:font-mono prose-code:bg-stone-200/60 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-stone-900 prose-pre:text-stone-100'
                      }`}
                    >
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>

                    {/* Grounding Sources (Maps places / Web citations) */}
                    {!isUser && message.groundingMetadata && (
                      <GroundingSources
                        metadata={message.groundingMetadata}
                        onSaveItem={onSaveBookmark}
                        savedUrls={savedUrls}
                      />
                    )}
                  </div>
                </div>
              );
            })}

            {/* Loading / Generating indicator */}
            {isLoading && (
              <div
                id="loading-message-indicator"
                className="flex items-start gap-3 max-w-3xl mx-auto"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Bot className="w-4 h-4 animate-pulse" />
                </div>
                <div className="bg-stone-50 border border-stone-200 rounded-2xl rounded-tl-xs p-4 text-stone-600 text-xs flex items-center gap-2.5">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                  <span>
                    Generating response with {currentModel}
                    {currentGrounding === 'maps'
                      ? ' (Grounding with Google Maps)...'
                      : currentGrounding === 'search'
                      ? ' (Grounding with Google Search)...'
                      : '...'}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input Bottom Bar */}
      <footer
        id="chat-input-bar"
        className="w-full border-t border-stone-200 bg-stone-50/80 px-4 py-3 shrink-0"
      >
        <div className="max-w-3xl mx-auto">
          {/* Active ground indicator badge */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-2 px-1">
            <div className="flex items-center gap-2">
              {currentGrounding === 'maps' ? (
                <span className="flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <MapPin className="w-3 h-3" />
                  Google Maps Grounding
                </span>
              ) : currentGrounding === 'search' ? (
                <span className="flex items-center gap-1 text-sky-700 font-medium bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full">
                  <Globe className="w-3 h-3" />
                  Google Search Grounding
                </span>
              ) : (
                <span className="text-stone-400">Direct Gemini Generation</span>
              )}

              {currentGrounding === 'maps' && userLocation && (
                <span className="text-emerald-700 text-[10px]">
                  (Lat: {userLocation.latitude.toFixed(2)}, Lng:{' '}
                  {userLocation.longitude.toFixed(2)})
                </span>
              )}
            </div>

            <span className="text-stone-400 hidden sm:inline">
              Shift + Enter for new line • Enter to send
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 bg-white border border-stone-300 focus-within:border-stone-500 focus-within:ring-1 focus-within:ring-stone-500 rounded-2xl p-2 shadow-xs transition-all"
          >
            <textarea
              ref={textareaRef}
              id="message-textarea"
              value={inputText}
              onChange={handleTextareaInput}
              onKeyDown={handleKeyDown}
              placeholder={
                currentGrounding === 'maps'
                  ? 'Ask about restaurants, places to visit, local venues...'
                  : currentGrounding === 'search'
                  ? 'Ask about current events, research, real-time facts...'
                  : 'Message Gemini...'
              }
              rows={1}
              disabled={isLoading}
              className="flex-1 max-h-44 p-2 text-sm text-stone-900 placeholder:text-stone-400 resize-none focus:outline-none bg-transparent leading-relaxed"
            />

            <button
              type="submit"
              id="send-message-btn"
              disabled={!inputText.trim() || isLoading}
              className="w-9 h-9 rounded-xl bg-stone-900 text-white hover:bg-stone-800 disabled:opacity-30 disabled:hover:bg-stone-900 flex items-center justify-center shrink-0 transition-all active:scale-95 shadow-xs"
              title="Send message"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}

