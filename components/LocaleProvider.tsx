"use client";
import { NextIntlClientProvider } from 'next-intl';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
// Static imports for all locales - required for Next.js build
import enMessages from '@/translations/en.json';
import arMessages from '@/translations/ar.json';

// Map of all available translations
const translationMap: Record<string, any> = {
  en: enMessages,
  ar: arMessages,
};

interface LocaleProviderProps {
  children: React.ReactNode;
  initialMessages: any;
  initialLocale: string;
}

export default function LocaleProvider({ 
  children, 
  initialMessages, 
  initialLocale 
}: LocaleProviderProps) {
  // Get auth context safely - it should be available since LocaleProvider is inside AuthProvider
  const auth = useAuth();
  const selectedLocale = auth?.selectedLocale || initialLocale;
  
  // Initialize with initialMessages, fallback to translation map if needed
  const getInitialMessages = () => {
    if (initialMessages && typeof initialMessages === 'object' && Object.keys(initialMessages).length > 0) {
      return initialMessages;
    }
    return translationMap[initialLocale] || translationMap['en'] || {};
  };
  
  // Initialize messages with proper validation - ensure we always have valid messages
  const initialMessagesValue = getInitialMessages();
  
  // Ensure initialMessagesValue is never empty
  const validatedInitialMessages = (initialMessagesValue && Object.keys(initialMessagesValue).length > 0)
    ? initialMessagesValue
    : (translationMap['en'] || {});
  
  const [messages, setMessages] = useState(validatedInitialMessages);
  const [locale, setLocale] = useState(initialLocale);

  useEffect(() => {
    if (selectedLocale && selectedLocale !== locale && typeof window !== 'undefined') {
      // Get messages from static import map
      const newMessages = translationMap[selectedLocale];
      if (newMessages && Object.keys(newMessages).length > 0) {
        setMessages(newMessages);
        setLocale(selectedLocale);
      } else {
        console.warn(`Translation file for locale "${selectedLocale}" not found. Falling back to current locale.`);
      }
    }
  }, [selectedLocale, locale]);

  // Ensure we always have valid messages before rendering
  // Use a more robust check to ensure messages are valid
  const getValidMessages = () => {
    // First try current messages state
    if (messages && typeof messages === 'object' && Object.keys(messages).length > 0) {
      return messages;
    }
    // Then try translation map for current locale
    if (locale && translationMap[locale] && Object.keys(translationMap[locale]).length > 0) {
      return translationMap[locale];
    }
    // Finally fallback to English
    if (translationMap['en'] && Object.keys(translationMap['en']).length > 0) {
      return translationMap['en'];
    }
    // Last resort - return empty object (should never happen)
    console.error('LocaleProvider: All message sources are empty!');
    return {};
  };

  const currentMessages = getValidMessages();
  const currentLocale = locale || 'en';

  // Ensure messages object is not empty
  if (!currentMessages || typeof currentMessages !== 'object' || Object.keys(currentMessages).length === 0) {
    console.error('LocaleProvider: No valid messages found. This is a critical error.');
    // Return children without provider as last resort (will cause translation errors but won't crash)
    return <>{children}</>;
  }

  return (
    <NextIntlClientProvider 
      messages={currentMessages} 
      locale={currentLocale}
      timeZone="UTC" // Add timeZone to match server-side config
    >
      {children}
    </NextIntlClientProvider>
  );
}

