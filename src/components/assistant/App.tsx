"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, signInWithGoogle, signOutUser } from '@/lib/firebase';
import {
  ChatSession,
  ChatMessage,
  SavedItem,
  GeminiModelId,
  GroundingMode,
} from '@/types/assistant';
import { AVAILABLE_PERSONAS } from '@/lib/assistant/personas';
import {
  subscribeUserChats,
  createChatSession,
  updateChatSession,
  deleteChatSession,
  subscribeChatMessages,
  saveChatMessage,
  subscribeSavedItems,
  saveBookmarkItem,
  removeSavedItem,
  sendChatToBackend,
} from '@/lib/assistant/chatService';
import {
  getGuestChats,
  saveGuestChats,
  getGuestMessages,
  saveGuestMessages,
  getGuestSavedItems,
  saveGuestSavedItems,
  clearGuestData,
} from '@/lib/assistant/localChatService';
import Sidebar from './Sidebar';
import ChatView from './ChatView';
import { Sparkles, LogIn, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function App() {
  const pathname = usePathname();
  const isFullScreen = pathname === '/assistant';
  const [isOpen, setIsOpen] = useState(isFullScreen);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (isFullScreen) setIsOpen(true);
  }, [isFullScreen]);

  // Window event listener for global triggers
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-assistant', handleOpen);
    return () => window.removeEventListener('open-assistant', handleOpen);
  }, []);

  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dismissGuestBanner, setDismissGuestBanner] = useState(false);

  // Geolocation for Google Maps Grounding
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationStatus, setLocationStatus] = useState<
    'idle' | 'detecting' | 'enabled' | 'denied'
  >('idle');

  // Ref to track whether migration already ran for this session
  const hasMigratedRef = useRef(false);

  // Listen to Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);

      if (currentUser) {
        // Upsert user profile record in Firestore
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          await setDoc(
            userRef,
            {
              id: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || 'Google User',
              photoURL: currentUser.photoURL || '',
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
        } catch (err) {
          console.error('Error saving user profile to Firestore:', err);
        }

        // Migrate any local guest chats to Firestore once
        if (!hasMigratedRef.current) {
          hasMigratedRef.current = true;
          const guestChats = getGuestChats();
          for (const gChat of guestChats) {
            try {
              await createChatSession(
                currentUser.uid,
                gChat.title,
                gChat.model,
                gChat.persona,
                gChat.groundingMode
              );
              const gMsgs = getGuestMessages(gChat.id);
              for (const gMsg of gMsgs) {
                await saveChatMessage(currentUser.uid, gChat.id, {
                  chatId: gChat.id,
                  userId: currentUser.uid,
                  role: gMsg.role,
                  text: gMsg.text,
                  model: gMsg.model,
                  groundingMetadata: gMsg.groundingMetadata,
                });
              }
            } catch (migErr) {
              console.warn('Guest chat migration skipped/error:', migErr);
            }
          }
          const guestSaved = getGuestSavedItems();
          for (const s of guestSaved) {
            try {
              await saveBookmarkItem(currentUser.uid, {
                type: s.type,
                title: s.title,
                uri: s.uri,
                snippet: s.snippet,
              });
            } catch (migErr) {
              console.warn('Guest bookmark migration skipped/error:', migErr);
            }
          }
          clearGuestData();
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Manage Chats Subscription / Guest State
  useEffect(() => {
    if (user) {
      // Authenticated with Firebase: real-time Firestore sync
      const unsubscribe = subscribeUserChats(
        user.uid,
        (fetchedChats) => {
          setChats(fetchedChats);
          if (fetchedChats.length > 0 && !activeChatId) {
            setActiveChatId(fetchedChats[0].id);
          }
        },
        (err) => {
          console.error('Firestore chat subscription error:', err);
        }
      );
      return () => unsubscribe();
    } else if (!authLoading) {
      // Guest mode: load from localStorage
      const local = getGuestChats();
      setChats(local);
      if (local.length > 0 && !activeChatId) {
        setActiveChatId(local[0].id);
      }
    }
  }, [user, authLoading, activeChatId]);

  // Manage Saved Items Subscription / Guest State
  useEffect(() => {
    if (user) {
      const unsubscribe = subscribeSavedItems(user.uid, (items) => {
        setSavedItems(items);
      });
      return () => unsubscribe();
    } else if (!authLoading) {
      setSavedItems(getGuestSavedItems());
    }
  }, [user, authLoading]);

  // Manage Messages Subscription / Guest State
  useEffect(() => {
    if (!activeChatId) {
      setMessages([]);
      return;
    }

    if (user) {
      const unsubscribe = subscribeChatMessages(
        user.uid,
        activeChatId,
        (fetched) => {
          setMessages(fetched);
        },
        (err) => {
          console.error('Firestore message subscription error:', err);
        }
      );
      return () => unsubscribe();
    } else {
      setMessages(getGuestMessages(activeChatId));
    }
  }, [user, activeChatId]);

  // Active chat session object
  const activeChat = chats.find((c) => c.id === activeChatId) || null;

  // Create new chat
  const handleNewChat = useCallback(
    async (
      model: GeminiModelId = 'gemini-1.5-flash',
      persona: string = 'general',
      grounding: GroundingMode = 'none'
    ) => {
      const title = 'New Chat';

      if (user) {
        try {
          const newSession = await createChatSession(
            user.uid,
            title,
            model,
            persona,
            grounding
          );
          setActiveChatId(newSession.id);
          return newSession;
        } catch (err) {
          console.error('Error creating chat session in Firestore:', err);
          return null;
        }
      } else {
        // Guest mode in localStorage
        const newSession: ChatSession = {
          id: 'chat_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
          userId: 'guest',
          title,
          model,
          persona,
          groundingMode: grounding,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const updated = [newSession, ...chats];
        setChats(updated);
        saveGuestChats(updated);
        setActiveChatId(newSession.id);
        setMessages([]);
        return newSession;
      }
    },
    [user, chats]
  );

  // Update active chat settings
  const handleUpdateChatSettings = async (updates: {
    model?: GeminiModelId;
    groundingMode?: GroundingMode;
    persona?: string;
  }) => {
    if (!activeChatId) {
      await handleNewChat(
        updates.model || 'gemini-1.5-flash',
        updates.persona || 'general',
        updates.groundingMode || 'none'
      );
      return;
    }

    if (user) {
      try {
        await updateChatSession(user.uid, activeChatId, updates);
      } catch (err) {
        console.error('Error updating chat settings in Firestore:', err);
      }
    } else {
      const updated = chats.map((c) =>
        c.id === activeChatId
          ? { ...c, ...updates, updatedAt: new Date().toISOString() }
          : c
      );
      setChats(updated);
      saveGuestChats(updated);
    }
  };

  // Delete chat
  const handleDeleteChat = async (chatId: string) => {
    if (user) {
      try {
        await deleteChatSession(user.uid, chatId);
      } catch (err) {
        console.error('Error deleting chat from Firestore:', err);
      }
    } else {
      const updated = chats.filter((c) => c.id !== chatId);
      setChats(updated);
      saveGuestChats(updated);
      localStorage.removeItem(`gemini_guest_msgs_${chatId}`);
    }

    if (activeChatId === chatId) {
      const remaining = chats.filter((c) => c.id !== chatId);
      setActiveChatId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  // Geolocation detection
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('denied');
      return;
    }

    setLocationStatus('detecting');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setLocationStatus('enabled');
      },
      (err) => {
        console.warn('Geolocation error or denied:', err);
        setLocationStatus('denied');
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  // Send message
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isGenerating) return;

    let currentChat = activeChat;

    // If no active chat, create one automatically
    if (!currentChat) {
      const initialTitle = text.slice(0, 36) + (text.length > 36 ? '...' : '');
      currentChat = await handleNewChat('gemini-1.5-flash', 'general', 'none');
      if (!currentChat) return;
      currentChat.title = initialTitle;
    } else if (messages.length === 0 && currentChat.title === 'New Chat') {
      const updatedTitle = text.slice(0, 36) + (text.length > 36 ? '...' : '');
      if (user) {
        await updateChatSession(user.uid, currentChat.id, { title: updatedTitle });
      } else {
        const updated = chats.map((c) =>
          c.id === currentChat!.id ? { ...c, title: updatedTitle } : c
        );
        setChats(updated);
        saveGuestChats(updated);
      }
    }

    const chatId = currentChat.id;
    const persona =
      AVAILABLE_PERSONAS.find((p) => p.id === currentChat!.persona) ||
      AVAILABLE_PERSONAS[0];

    const historyPayload = messages.map((m) => ({
      role: m.role,
      text: m.text,
    }));
    historyPayload.push({ role: 'user', text });

    const userMessage: ChatMessage = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      chatId,
      userId: user ? user.uid : 'guest',
      role: 'user',
      text,
      createdAt: new Date().toISOString(),
    };

    // Save user message
    if (user) {
      try {
        await saveChatMessage(user.uid, chatId, userMessage);
      } catch (err) {
        console.error('Error saving user message to Firestore:', err);
      }
    } else {
      const currentMsgs = [...messages, userMessage];
      setMessages(currentMsgs);
      saveGuestMessages(chatId, currentMsgs);
    }

    setIsGenerating(true);

    try {
      const response = await sendChatToBackend({
        messages: historyPayload,
        model: currentChat.model,
        systemInstruction: persona.systemInstruction,
        grounding: currentChat.groundingMode,
        location: currentChat.groundingMode === 'maps' && userLocation ? userLocation : undefined,
      });

      const modelMessage: ChatMessage = {
        id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        chatId,
        userId: user ? user.uid : 'guest',
        role: 'model',
        text: response.text,
        model: response.model,
        groundingMetadata: response.groundingMetadata,
        createdAt: new Date().toISOString(),
      };

      if (user) {
        await saveChatMessage(user.uid, chatId, modelMessage);
      } else {
        const currentMsgs = getGuestMessages(chatId);
        const updated = [...currentMsgs, modelMessage];
        setMessages(updated);
        saveGuestMessages(chatId, updated);
      }
    } catch (err: any) {
      console.error('Error getting model response:', err);
      const errorMessage: ChatMessage = {
        id: 'msg_' + Date.now() + '_err',
        chatId,
        userId: user ? user.uid : 'guest',
        role: 'model',
        text: `⚠️ **Error Generating Response**: ${
          err.message || 'Unable to communicate with the Gemini API server.'
        }`,
        createdAt: new Date().toISOString(),
      };

      if (user) {
        await saveChatMessage(user.uid, chatId, errorMessage);
      } else {
        const currentMsgs = getGuestMessages(chatId);
        const updated = [...currentMsgs, errorMessage];
        setMessages(updated);
        saveGuestMessages(chatId, updated);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // Save Bookmark (Place or Web link)
  const handleSaveBookmark = async (
    item: Omit<SavedItem, 'id' | 'savedAt' | 'userId'>
  ) => {
    if (user) {
      try {
        await saveBookmarkItem(user.uid, item);
      } catch (err) {
        console.error('Error saving bookmark item to Firestore:', err);
      }
    } else {
      const newItem: SavedItem = {
        ...item,
        id: 'item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        userId: 'guest',
        savedAt: new Date().toISOString(),
      };
      const updated = [newItem, ...savedItems];
      setSavedItems(updated);
      saveGuestSavedItems(updated);
    }
  };

  // Remove saved bookmark
  const handleDeleteSavedItem = async (itemId: string) => {
    if (user) {
      try {
        await removeSavedItem(user.uid, itemId);
      } catch (err) {
        console.error('Error deleting saved bookmark from Firestore:', err);
      }
    } else {
      const updated = savedItems.filter((i) => i.id !== itemId);
      setSavedItems(updated);
      saveGuestSavedItems(updated);
    }
  };

  // Auth handlers
  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error('Google Sign-In failed:', err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setActiveChatId(null);
      setMessages([]);
    } catch (err) {
      console.error('Google Sign-Out failed:', err);
    }
  };

  const savedUrls = new Set(savedItems.map((i) => i.uri));

  const content = (
    <>
      <Sidebar
        user={user}
        chats={chats}
        activeChatId={activeChatId}
        savedItems={savedItems}
        onSelectChat={(chatId) => setActiveChatId(chatId)}
        onNewChat={() => handleNewChat()}
        onDeleteChat={handleDeleteChat}
        onDeleteSavedItem={handleDeleteSavedItem}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col h-full min-h-0 relative">
        {!isFullScreen && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 z-50 p-1.5 rounded-lg bg-[#151310] border border-white/[0.1] text-[#A9A096] hover:text-[#F3EDE3] transition-colors md:hidden"
            title="Close Concierge"
          >
            <X size={16} />
          </button>
        )}

        {!user && !dismissGuestBanner && (
          <div
            id="guest-auth-banner"
            className="bg-[#151310] border-b border-white/[0.08] px-5 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 text-xs text-[#A9A096] shrink-0"
          >
            <div className="flex items-start sm:items-center gap-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C8B79F] shrink-0 mt-0.5 sm:mt-0" />
              <span className="leading-relaxed">
                <strong className="text-[#F3EDE3] font-medium mr-1.5">Guest Mode:</strong>
                Sign in with Google to sync chats across journeys.
              </span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto mt-1 sm:mt-0">
              <button
                type="button"
                id="banner-signin-btn"
                onClick={handleSignIn}
                className="flex-1 sm:flex-none flex justify-center items-center gap-1.5 px-3 py-1.5 rounded bg-[#C8B79F] hover:bg-[#D4C5AF] text-[#0D0C0A] font-medium text-[11px] tracking-wider uppercase transition-colors"
              >
                <LogIn className="w-3 h-3" />
                <span>Sign in</span>
              </button>
              <button
                type="button"
                onClick={() => setDismissGuestBanner(true)}
                className="text-[#A9A096] hover:text-[#F3EDE3] p-1.5 text-xs transition-colors shrink-0"
                title="Dismiss"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        <ChatView
          chat={activeChat}
          messages={messages}
          isLoading={isGenerating}
          onSendMessage={handleSendMessage}
          onUpdateChatSettings={handleUpdateChatSettings}
          onSaveBookmark={handleSaveBookmark}
          savedUrls={savedUrls}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          userLocation={userLocation}
          onDetectLocation={handleDetectLocation}
          locationStatus={locationStatus}
        />
      </div>
    </>
  );

  if (isFullScreen) {
    return (
      <div id="app-root" className="flex h-screen w-screen overflow-hidden bg-[#0D0C0A] font-sans text-[#F3EDE3]">
        {content}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close AI Concierge" : "Open AI Concierge"}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] group flex items-center gap-2.5 px-[18px] py-3.5 bg-[#151310]/95 backdrop-blur-md hover:bg-[#1A1815] border border-[#C8B79F]/40 hover:border-[#C8B79F] rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
      >
        <div className="w-6 h-6 flex items-center justify-center text-[#C8B79F] group-hover:text-[#F3EDE3] transition-colors relative">
          {isOpen ? <X size={20} strokeWidth={2.5} /> : <Sparkles size={20} className="fill-[#C8B79F]" />}
        </div>
        <span className="text-[13px] font-semibold uppercase tracking-widest text-[#F3EDE3] mr-1">
          {isOpen ? "Close" : "Concierge"}
        </span>
      </button>

      {isOpen && (
        <div
          id="app-root"
          className="fixed bottom-[84px] right-4 sm:right-6 z-[9999] w-[calc(100vw-32px)] sm:w-[480px] md:w-[720px] h-[calc(100vh-120px)] sm:h-[80vh] max-h-[720px] bg-[#0D0C0A] border border-white/[0.12] rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.9)] flex overflow-hidden font-sans text-[#F3EDE3] animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {content}
        </div>
      )}
    </>
  );
}

