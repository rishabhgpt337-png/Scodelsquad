import { ChatMessage, ChatSession, SavedItem } from '../../types/assistant';

const STORAGE_KEYS = {
  CHATS: 'gemini_guest_chats',
  MESSAGES_PREFIX: 'gemini_guest_msgs_',
  SAVED_ITEMS: 'gemini_guest_saved_items',
};

export function getGuestChats(): ChatSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CHATS);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error loading guest chats from localStorage:', err);
    return [];
  }
}

export function saveGuestChats(chats: ChatSession[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats));
  } catch (err) {
    console.error('Error saving guest chats to localStorage:', err);
  }
}

export function getGuestMessages(chatId: string): ChatMessage[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEYS.MESSAGES_PREFIX}${chatId}`);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error loading guest messages from localStorage:', err);
    return [];
  }
}

export function saveGuestMessages(chatId: string, messages: ChatMessage[]) {
  try {
    localStorage.setItem(
      `${STORAGE_KEYS.MESSAGES_PREFIX}${chatId}`,
      JSON.stringify(messages)
    );
  } catch (err) {
    console.error('Error saving guest messages to localStorage:', err);
  }
}

export function getGuestSavedItems(): SavedItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_ITEMS);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error loading guest saved items from localStorage:', err);
    return [];
  }
}

export function saveGuestSavedItems(items: SavedItem[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_ITEMS, JSON.stringify(items));
  } catch (err) {
    console.error('Error saving guest saved items to localStorage:', err);
  }
}

export function clearGuestData() {
  try {
    const chats = getGuestChats();
    for (const chat of chats) {
      localStorage.removeItem(`${STORAGE_KEYS.MESSAGES_PREFIX}${chat.id}`);
    }
    localStorage.removeItem(STORAGE_KEYS.CHATS);
    localStorage.removeItem(STORAGE_KEYS.SAVED_ITEMS);
  } catch (err) {
    console.error('Error clearing guest data:', err);
  }
}

