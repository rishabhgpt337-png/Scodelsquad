"use client";

import { useState } from 'react';
import Link from 'next/link';
import RaahiLogo from '@/components/common/RaahiLogo';
import {
  Plus,
  MessageSquare,
  Bookmark,
  Trash2,
  MapPin,
  Globe,
  LogOut,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  X,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { ChatSession, SavedItem } from '@/types/assistant';

interface SidebarProps {
  user: User | null;
  chats: ChatSession[];
  activeChatId: string | null;
  savedItems: SavedItem[];
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
  onDeleteSavedItem: (itemId: string) => void;
  onSignIn: () => void;
  onSignOut: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  user,
  chats,
  activeChatId,
  savedItems,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  onDeleteSavedItem,
  onSignIn,
  onSignOut,
  isOpen,
  onClose,
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'chats' | 'saved'>('chats');

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          id="sidebar-backdrop"
          onClick={onClose}
          className="fixed inset-0 bg-stone-900/40 z-40 md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      <aside
        id="app-sidebar"
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 sm:w-80 bg-stone-900 text-stone-100 flex flex-col justify-between border-r border-stone-800 transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top Header */}
        <div className="p-4 border-b border-stone-800 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <RaahiLogo size="sm" />
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-500/90 block">
                AI Concierge
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Button: New Chat */}
        <div className="p-3">
          <button
            id="new-chat-btn"
            type="button"
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 768) onClose();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white text-stone-900 hover:bg-stone-100 font-medium text-xs transition-all shadow-xs active:scale-[0.99]"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Tab Switcher: Chats vs Saved Bookmarks */}
        <div className="px-3 pb-2">
          <div className="grid grid-cols-2 p-1 rounded-xl bg-stone-800/80 border border-stone-800 text-xs">
            <button
              type="button"
              id="tab-chats-btn"
              onClick={() => setActiveTab('chats')}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'chats'
                  ? 'bg-stone-700 text-white font-medium shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chats ({chats.length})</span>
            </button>

            <button
              type="button"
              id="tab-saved-btn"
              onClick={() => setActiveTab('saved')}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'saved'
                  ? 'bg-stone-700 text-white font-medium shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved ({savedItems.length})</span>
            </button>
          </div>
        </div>

        {/* Middle Content: Scrollable List */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1.5">
          {activeTab === 'chats' ? (
            chats.length === 0 ? (
              <div className="py-12 text-center text-stone-500 text-xs px-4">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 text-stone-600 opacity-60" />
                <p>No chat conversations yet.</p>
                <p className="text-[11px] text-stone-600 mt-1">
                  Start a new conversation to explore Grounding &amp; AI personas.
                </p>
              </div>
            ) : (
              chats.map((chat) => {
                const isActive = chat.id === activeChatId;
                return (
                  <div
                    key={chat.id}
                    id={`chat-item-${chat.id}`}
                    onClick={() => {
                      onSelectChat(chat.id);
                      if (window.innerWidth < 768) onClose();
                    }}
                    className={`group relative flex items-center justify-between p-2.5 rounded-xl text-xs cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-stone-800 text-white font-medium'
                        : 'text-stone-300 hover:bg-stone-800/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      {chat.groundingMode === 'maps' ? (
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                      ) : chat.groundingMode === 'search' ? (
                        <Globe className="w-3.5 h-3.5 shrink-0 text-sky-400" />
                      ) : (
                        <MessageSquare className="w-3.5 h-3.5 shrink-0 text-stone-400" />
                      )}
                      <span className="truncate">{chat.title || 'Untitled Conversation'}</span>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteChat(chat.id);
                        }}
                        className="p-1 rounded hover:bg-red-500/20 text-stone-400 hover:text-red-400 transition-colors"
                        title="Delete chat"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )
          ) : savedItems.length === 0 ? (
            <div className="py-12 text-center text-stone-500 text-xs px-4">
              <Bookmark className="w-8 h-8 mx-auto mb-2 text-stone-600 opacity-60" />
              <p>No saved bookmarks yet.</p>
              <p className="text-[11px] text-stone-600 mt-1">
                Save Maps places or Search citations directly from chat responses.
              </p>
            </div>
          ) : (
            savedItems.map((item) => (
              <div
                key={item.id}
                id={`saved-item-${item.id}`}
                className="p-2.5 rounded-xl bg-stone-800/60 border border-stone-800 hover:border-stone-700 text-xs space-y-1.5 transition-all"
              >
                <div className="flex items-start justify-between gap-1">
                  <div className="flex items-center gap-1.5 text-stone-300 font-medium">
                    {item.type === 'place' ? (
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    )}
                    <span className="line-clamp-1">{item.title}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onDeleteSavedItem(item.id)}
                    className="p-1 text-stone-500 hover:text-red-400 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                {item.snippet && (
                  <p className="text-[11px] text-stone-400 line-clamp-2 italic">
                    &ldquo;{item.snippet}&rdquo;
                  </p>
                )}

                <div className="pt-1 flex items-center justify-end">
                  <a
                    href={item.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-medium"
                  >
                    <span>{item.type === 'place' ? 'Open in Maps' : 'Visit link'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* User Account & Authentication Footer */}
        <div className="p-3 border-t border-stone-800 bg-stone-950/60">
          {user ? (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-8 h-8 rounded-full border border-stone-700 object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-semibold">
                    {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-xs font-medium text-stone-100 truncate">
                    {user.displayName || 'Authenticated User'}
                  </p>
                  <p className="text-[10px] text-stone-400 truncate">
                    {user.email || 'Firebase Auth'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                id="sign-out-btn"
                onClick={onSignOut}
                className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Sign in to persist your data</span>
              </div>
              <button
                type="button"
                id="sign-in-btn"
                onClick={onSignIn}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-xs text-white font-medium transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.4 8.9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.4 0-.8.2-1.6.4-2.4L1.6 7c-.8 1.6-1.3 3.4-1.3 5.3s.5 3.7 1.3 5.3l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.4-6.7-5.3L1.6 16c1.9 3.8 5.8 7 10.4 7z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

