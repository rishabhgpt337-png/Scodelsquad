import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  ChatMessage,
  ChatSession,
  GeminiModelId,
  GroundingMode,
  SavedItem,
} from '../../types/assistant';

// Subscribe to a user's chat sessions ordered by latest update
export function subscribeUserChats(
  userId: string,
  onUpdate: (chats: ChatSession[]) => void,
  onError?: (err: any) => void
) {
  const chatsRef = collection(db, 'users', userId, 'chats');
  const q = query(chatsRef, orderBy('updatedAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const chats: ChatSession[] = [];
      snapshot.forEach((docSnap) => {
        chats.push(docSnap.data() as ChatSession);
      });
      onUpdate(chats);
    },
    (error) => {
      console.error('Error fetching user chats:', error);
      if (onError) onError(error);
    }
  );
}

// Create a new chat session
export async function createChatSession(
  userId: string,
  title: string,
  model: GeminiModelId = 'gemini-3.5-flash-lite',
  persona: string = 'general',
  groundingMode: GroundingMode = 'none'
): Promise<ChatSession> {
  const chatId = 'chat_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const now = new Date().toISOString();

  const newChat: ChatSession = {
    id: chatId,
    userId,
    title,
    model,
    persona,
    groundingMode,
    createdAt: now,
    updatedAt: now,
  };

  const docRef = doc(db, 'users', userId, 'chats', chatId);
  await setDoc(docRef, newChat);
  return newChat;
}

// Update a chat session's properties
export async function updateChatSession(
  userId: string,
  chatId: string,
  updates: Partial<ChatSession>
) {
  const docRef = doc(db, 'users', userId, 'chats', chatId);
  await setDoc(
    docRef,
    {
      ...updates,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

// Delete a chat session
export async function deleteChatSession(userId: string, chatId: string) {
  const docRef = doc(db, 'users', userId, 'chats', chatId);
  await deleteDoc(docRef);
}

// Subscribe to messages in a specific chat
export function subscribeChatMessages(
  userId: string,
  chatId: string,
  onUpdate: (messages: ChatMessage[]) => void,
  onError?: (err: any) => void
) {
  const messagesRef = collection(db, 'users', userId, 'chats', chatId, 'messages');
  const q = query(messagesRef, orderBy('createdAt', 'asc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const messages: ChatMessage[] = [];
      snapshot.forEach((docSnap) => {
        messages.push(docSnap.data() as ChatMessage);
      });
      onUpdate(messages);
    },
    (error) => {
      console.error('Error fetching chat messages:', error);
      if (onError) onError(error);
    }
  );
}

// Add a message to a chat session
export async function saveChatMessage(
  userId: string,
  chatId: string,
  message: Omit<ChatMessage, 'id' | 'createdAt'> & { id?: string }
): Promise<ChatMessage> {
  const messageId = message.id || 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const now = new Date().toISOString();

  const fullMessage: ChatMessage = {
    ...message,
    id: messageId,
    createdAt: now,
  };

  const docRef = doc(db, 'users', userId, 'chats', chatId, 'messages', messageId);
  await setDoc(docRef, fullMessage);

  // Touch the chat's updatedAt timestamp
  const chatRef = doc(db, 'users', userId, 'chats', chatId);
  await setDoc(
    chatRef,
    {
      updatedAt: now,
    },
    { merge: true }
  );

  return fullMessage;
}

// Saved Bookmarks (Places & Web Sources)
export function subscribeSavedItems(
  userId: string,
  onUpdate: (items: SavedItem[]) => void
) {
  const itemsRef = collection(db, 'users', userId, 'savedItems');
  const q = query(itemsRef, orderBy('savedAt', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const items: SavedItem[] = [];
    snapshot.forEach((docSnap) => {
      items.push(docSnap.data() as SavedItem);
    });
    onUpdate(items);
  });
}

export async function saveBookmarkItem(
  userId: string,
  item: Omit<SavedItem, 'id' | 'savedAt' | 'userId'>
) {
  const itemId = 'item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const fullItem: SavedItem = {
    ...item,
    id: itemId,
    userId,
    savedAt: new Date().toISOString(),
  };

  const docRef = doc(db, 'users', userId, 'savedItems', itemId);
  await setDoc(docRef, fullItem);
  return fullItem;
}

export async function removeSavedItem(userId: string, itemId: string) {
  const docRef = doc(db, 'users', userId, 'savedItems', itemId);
  await deleteDoc(docRef);
}

// Call backend API endpoint
export async function sendChatToBackend(payload: {
  messages: Array<{ role: 'user' | 'model'; text: string }>;
  model: GeminiModelId;
  systemInstruction?: string;
  grounding?: GroundingMode;
  location?: { latitude: number; longitude: number };
}) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP ${response.status}: Failed to generate response`);
  }

  return await response.json();
}

