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

  const quickPrompts = userLocation ? [
    {
      title: 'Nearby Heritage Stays',
      text: 'What are the top boutique havelis and heritage homestays nearby? Provide locations and verified ratings.',
      grounding: 'maps' as GroundingMode,
      model: 'gemini-3.6-flash' as GeminiModelId,
      persona: 'travel_architect',
    },
    {
      title: 'Monuments Near Me',
      text: 'List the most significant ASI-protected monuments and historical sites within 5 kilometers of my current location.',
      grounding: 'maps' as GroundingMode,
      model: 'gemini-3.6-flash' as GeminiModelId,
      persona: 'travel_architect',
    },
    {
      title: 'Local Culinary Trails',
      text: 'What are the authentic local street food clusters or generational eateries near my current location?',
      grounding: 'maps' as GroundingMode,
      model: 'gemini-3.6-flash' as GeminiModelId,
      persona: 'travel_architect',
    },
  ] : [
    {
      title: 'Share Location for Local Tips',
      text: 'I want to discover heritage sites, cafes, and artisan markets around me. Can you help me once I share my location?',
      grounding: 'maps' as GroundingMode,
      model: 'gemini-3.6-flash' as GeminiModelId,
      persona: 'local_guide',
      action: 'detect_location'
    },
    {
      title: 'Explore Indian Heritage',
      text: 'What are the hidden architectural gems of Rajasthan that avoid the main tourist crowds?',
      grounding: 'search' as GroundingMode,
      model: 'gemini-3.6-flash' as GeminiModelId,
      persona: 'travel_architect',
    },
    {
      title: 'Culinary Traditions',
      text: 'Explain the 5,000-year history of Ayurvedic spices in Indian cooking and recommend 3 must-try dishes.',
      grounding: 'none' as GroundingMode,
      model: 'gemini-3.6-flash' as GeminiModelId,
      persona: 'deep_thinker',
    }
  ];

  const currentGrounding = chat?.groundingMode || 'none';
  const currentModel = chat?.model || 'gemini-3.6-flash';

  return (
    <div id="chat-container" className="flex-1 flex flex-col h-full min-h-0 bg-[#0D0C0A] text-[#F3EDE3] relative">
      {/* Top Header Controls Bar */}
      <header
        id="chat-header"
        className="w-full border-b border-white/[0.08] bg-[#151310] px-4 sm:px-6 py-3 shrink-0 flex flex-wrap items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            id="mobile-sidebar-toggle"
            onClick={onToggleSidebar}
            className="md:hidden p-1.5 rounded-lg border border-white/[0.08] text-[#A9A096] hover:text-[#F3EDE3] hover:bg-white/[0.04] transition-colors"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="min-w-0">
            <h2 className="text-sm font-medium text-[#F3EDE3] truncate">
              {chat?.title || 'New Conversation'}
            </h2>
            <div className="flex items-center gap-2 text-[11px] text-[#A9A096]">
              <span className="font-medium text-[#C8B79F]">{activePersona.name}</span>
              <span className="opacity-40">•</span>
              <span className="font-mono text-[10px] text-[#A9A096]">{currentModel}</span>
            </div>
          </div>
        </div>

        {/* Configuration Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Grounding Mode Picker */}
          <div className="flex items-center p-0.5 rounded-lg bg-[#0D0C0A] border border-white/[0.08] text-xs">
            <button
              type="button"
              id="grounding-none-btn"
              onClick={() => onUpdateChatSettings({ groundingMode: 'none' })}
              className={`px-2.5 py-1 rounded text-[11px] uppercase tracking-wider transition-all ${
                currentGrounding === 'none'
                  ? 'bg-white/[0.08] text-[#F3EDE3] font-medium border border-white/[0.08]'
                  : 'text-[#A9A096] hover:text-[#F3EDE3]'
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
                  model: 'gemini-3.6-flash',
                })
              }
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] uppercase tracking-wider transition-all ${
                currentGrounding === 'search'
                  ? 'bg-[#C8B79F] text-[#0D0C0A] font-semibold'
                  : 'text-[#A9A096] hover:text-[#F3EDE3]'
              }`}
              title="Google Search Grounding"
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
                  model: 'gemini-3.6-flash',
                })
              }
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] uppercase tracking-wider transition-all ${
                currentGrounding === 'maps'
                  ? 'bg-[#C8B79F] text-[#0D0C0A] font-semibold'
                  : 'text-[#A9A096] hover:text-[#F3EDE3]'
              }`}
              title="Google Maps Grounding"
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
                  groundingMode: currentGrounding,
                })
              }
              className="appearance-none bg-[#0D0C0A] border border-white/[0.08] text-[#F3EDE3] py-1.5 pl-3 pr-8 rounded-lg font-mono text-[11px] focus:outline-none focus:border-[#C8B79F] cursor-pointer"
            >
              <option value="gemini-3.6-flash" className="bg-[#151310] text-[#F3EDE3]">gemini-3.6-flash</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#A9A096] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Location button for Maps Grounding */}
          {currentGrounding === 'maps' && (
            <button
              type="button"
              id="location-toggle-btn"
              onClick={onDetectLocation}
              disabled={locationStatus === 'detecting'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-medium tracking-wide uppercase transition-all ${
                userLocation
                  ? 'bg-white/[0.08] border-[#C8B79F] text-[#C8B79F]'
                  : 'bg-[#0D0C0A] border-white/[0.08] text-[#A9A096] hover:text-[#F3EDE3] hover:border-white/[0.2]'
              }`}
              title={
                userLocation
                  ? `Active: ${userLocation.latitude.toFixed(2)}, ${userLocation.longitude.toFixed(2)}`
                  : 'Detect my location for accurate local recommendations'
              }
            >
              <LocateFixed
                className={`w-3.5 h-3.5 ${
                  locationStatus === 'detecting' ? 'animate-spin text-[#C8B79F]' : 'text-[#C8B79F]'
                }`}
              />
              <span className="hidden sm:inline">
                {userLocation ? 'Location Active' : 'Share Location'}
              </span>
            </button>
          )}

          {/* Role / Persona Settings Toggle */}
          <button
            type="button"
            id="role-config-btn"
            onClick={() => setShowRoleConfig(!showRoleConfig)}
            className={`p-1.5 rounded-lg border transition-colors ${
              showRoleConfig
                ? 'bg-white/[0.08] border-[#C8B79F] text-[#F3EDE3]'
                : 'border-white/[0.08] bg-[#0D0C0A] text-[#A9A096] hover:text-[#F3EDE3] hover:bg-white/[0.04]'
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
          className="border-b border-white/[0.08] bg-[#151310] px-4 sm:px-6 py-4 text-xs animate-in slide-in-from-top-1"
        >
          <div className="max-w-4xl mx-auto space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C8B79F]">
                Concierge Persona &amp; Instruction
              </span>
              <button
                type="button"
                onClick={() => setShowRoleConfig(false)}
                className="text-[#A9A096] hover:text-[#F3EDE3] text-xs uppercase tracking-wider font-medium"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
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
                    className={`p-3 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'bg-white/[0.06] border-[#C8B79F] text-[#F3EDE3]'
                        : 'bg-[#0D0C0A] border-white/[0.08] text-[#A9A096] hover:border-white/[0.2] hover:text-[#F3EDE3]'
                    }`}
                  >
                    <p className="font-medium text-[#F3EDE3] text-xs">{persona.name}</p>
                    <p className="text-[10px] text-[#A9A096] mt-1 line-clamp-2 font-light">
                      {persona.description}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 text-[11px] text-[#A9A096] flex items-start gap-1.5 border-t border-white/[0.06]">
              <Info className="w-3.5 h-3.5 text-[#C8B79F] shrink-0 mt-0.5" />
              <span className="font-light italic">
                Active Directive: &ldquo;{activePersona.systemInstruction}&rdquo;
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Scrollable Message Thread */}
      <div
        id="messages-thread"
        className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 space-y-6"
      >
        {messages.length === 0 ? (
          <div className="max-w-2xl mx-auto py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-white/[0.04] text-[#C8B79F] flex items-center justify-center mx-auto mb-4 border border-white/[0.08]">
              <Sparkles className="w-5 h-5 text-[#C8B79F]" />
            </div>

            <h3
              className="text-2xl md:text-3xl font-normal text-[#F3EDE3] mb-2 tracking-tight"
              style={{ fontFamily: "var(--font-playfair, serif)" }}
            >
              {activePersona.name}
            </h3>
            <p className="text-xs text-[#A9A096] max-w-md mx-auto mb-8 font-light leading-relaxed">
              {activePersona.description}
            </p>

            <div className="space-y-3 text-left">
              <p className="text-[10px] font-semibold text-[#C8B79F] uppercase tracking-[0.2em] px-1">
                Curated Inquiries
              </p>
              <div className="grid grid-cols-1 gap-2.5">
                {quickPrompts.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    id={`quick-prompt-${idx}`}
                    onClick={() => {
                      if ((item as any).action === 'detect_location') {
                        onDetectLocation();
                        return;
                      }
                      onUpdateChatSettings({
                        groundingMode: item.grounding,
                        model: item.model,
                        persona: item.persona,
                      });
                      onSendMessage(item.text);
                    }}
                    className="p-4 rounded-lg border border-white/[0.08] bg-[#151310] hover:bg-white/[0.03] hover:border-[#C8B79F]/40 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-[#F3EDE3] group-hover:text-[#C8B79F] transition-colors">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-medium text-[#C8B79F] bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded tracking-wider uppercase">
                        {item.grounding === 'maps'
                          ? 'Google Maps'
                          : item.grounding === 'search'
                          ? 'Google Search'
                          : item.model}
                      </span>
                    </div>
                    <p className="text-xs text-[#A9A096] line-clamp-1 font-light">{item.text}</p>
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
                  className={`flex items-start gap-3.5 text-sm ${
                    isUser ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Avatar Icon */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold ${
                      isUser
                        ? 'bg-[#C8B79F] text-[#0D0C0A]'
                        : 'bg-[#151310] border border-white/[0.1] text-[#C8B79F]'
                    }`}
                  >
                    {isUser ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[85%] rounded-xl p-4 sm:p-5 transition-all ${
                      isUser
                        ? 'bg-[#211B16] border border-[#C8B79F]/30 text-[#F3EDE3]'
                        : 'bg-[#151310] border border-white/[0.08] text-[#F3EDE3]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span
                        className={`text-[10px] uppercase tracking-wider font-medium ${
                          isUser ? 'text-[#C8B79F]' : 'text-[#A9A096]'
                        }`}
                      >
                        {isUser ? 'Traveler' : message.model || 'Concierge'}
                      </span>

                      {!isUser && (
                        <button
                          type="button"
                          onClick={() => handleCopy(message.text, message.id)}
                          className="p-1 rounded text-[#A9A096] hover:text-[#F3EDE3] transition-colors"
                          title="Copy text"
                        >
                          {copiedId === message.id ? (
                            <Check className="w-3.5 h-3.5 text-[#C8B79F]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Markdown Content */}
                    <div
                      className={`prose prose-sm max-w-none break-words leading-relaxed text-[#F3EDE3] prose-headings:text-[#F3EDE3] prose-headings:font-serif prose-headings:tracking-tight prose-strong:text-[#F3EDE3] prose-strong:font-semibold prose-a:text-[#C8B79F] prose-a:underline hover:prose-a:text-[#F3EDE3] prose-code:font-mono prose-code:text-[#C8B79F] prose-code:bg-[#0D0C0A] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-white/[0.08] prose-pre:bg-[#0D0C0A] prose-pre:border prose-pre:border-white/[0.08] prose-pre:text-[#F3EDE3] prose-li:text-[#F3EDE3]/90`}
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
                className="flex items-start gap-3.5 max-w-3xl mx-auto"
              >
                <div className="w-8 h-8 rounded-full bg-[#151310] border border-white/[0.1] text-[#C8B79F] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 animate-pulse" />
                </div>
                <div className="bg-[#151310] border border-white/[0.08] rounded-xl p-4 text-[#A9A096] text-xs flex items-center gap-2.5">
                  <Loader2 className="w-4 h-4 animate-spin text-[#C8B79F]" />
                  <span className="font-light">
                    Consulting archives with {currentModel}
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
        className="w-full border-t border-white/[0.08] bg-[#151310] px-4 sm:px-6 py-4 shrink-0"
      >
        <div className="max-w-3xl mx-auto">
          {/* Active ground indicator badge */}
          <div className="flex items-center justify-between text-[11px] text-[#A9A096] mb-2 px-1">
            <div className="flex items-center gap-2">
              {currentGrounding === 'maps' ? (
                <span className="flex items-center gap-1 text-[#C8B79F] font-medium bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider">
                  <MapPin className="w-3 h-3" />
                  Google Maps Grounding
                </span>
              ) : currentGrounding === 'search' ? (
                <span className="flex items-center gap-1 text-[#C8B79F] font-medium bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider">
                  <Globe className="w-3 h-3" />
                  Google Search Grounding
                </span>
              ) : (
                <span className="text-[#A9A096] text-[10px] uppercase tracking-wider">Standard Direct Gemini</span>
              )}

              {currentGrounding === 'maps' && userLocation && (
                <span className="text-[#C8B79F] text-[10px]">
                  (Lat: {userLocation.latitude.toFixed(2)}, Lng:{' '}
                  {userLocation.longitude.toFixed(2)})
                </span>
              )}
            </div>

            <span className="text-[#A9A096]/60 text-[10px] uppercase tracking-wider hidden sm:inline font-light">
              Shift + Enter for newline • Enter to send
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 bg-[#0D0C0A] border border-white/[0.1] focus-within:border-[#C8B79F] rounded-xl p-2 transition-all"
          >
            <textarea
              ref={textareaRef}
              id="message-textarea"
              value={inputText}
              onChange={handleTextareaInput}
              onKeyDown={handleKeyDown}
              placeholder={
                currentGrounding === 'maps'
                  ? 'Inquire about heritage stays, historic trails, culinary clusters...'
                  : currentGrounding === 'search'
                  ? 'Inquire about cultural events, heritage research, historical context...'
                  : 'Message your AI Concierge...'
              }
              rows={1}
              disabled={isLoading}
              className="flex-1 max-h-44 p-2 text-sm text-[#F3EDE3] placeholder:text-[#A9A096]/50 resize-none focus:outline-none bg-transparent leading-relaxed font-light"
            />

            <button
              type="submit"
              id="send-message-btn"
              disabled={!inputText.trim() || isLoading}
              className="w-9 h-9 rounded-lg bg-[#F3EDE3] text-[#0D0C0A] hover:bg-white disabled:opacity-30 disabled:hover:bg-[#F3EDE3] flex items-center justify-center shrink-0 transition-all active:scale-95"
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
