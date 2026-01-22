import { NextRequest, NextResponse } from 'next/server';
// Suppress deprecation warnings from the package
process.removeAllListeners('warning');
process.on('warning', (warning) => {
  if (warning.name === 'DeprecationWarning' && warning.message.includes('url.parse')) {
    // Suppress the deprecation warning from google-translate-api-x
    return;
  }
  console.warn(warning.name, warning.message);
});

import translate from 'google-translate-api-x';

// Simple in-memory cache (consider using Redis in production for better performance)
const translationCache = new Map<string, string>();

export async function POST(request: NextRequest) {
  let requestText = '';
  let requestTo = 'ar';

  try {
    // Read body once and store values
    const body = await request.json();
    requestText = body.text || '';
    requestTo = body.to || 'ar';

    if (!requestText || !requestTo) {
      return NextResponse.json(
        { error: 'Text and target language (to) are required' },
        { status: 400 }
      );
    }

    // Only translate to Arabic
    if (requestTo !== 'ar') {
      return NextResponse.json({
        success: true,
        originalText: requestText,
        translatedText: requestText,
        from: 'en',
        to: requestTo,
      });
    }

    // Check cache first
    const cacheKey = `${requestText.trim()}_${requestTo}`;
    if (translationCache.has(cacheKey)) {
      return NextResponse.json({
        success: true,
        originalText: requestText,
        translatedText: translationCache.get(cacheKey),
        from: 'en',
        to: 'ar',
        cached: true,
      });
    }

    // Translate using google-translate-api-x
    let result;
    try {
      result = await translate(requestText.trim(), {
        from: 'auto', // Auto-detect source language
        to: 'ar', // Always Arabic
      });
    } catch (translateError: any) {
      console.error('Google Translate API error:', translateError);
      // If translation fails, return original text
      return NextResponse.json({
        success: false,
        originalText: requestText,
        translatedText: requestText,
        error: translateError.message || 'Translation service error',
      }, { status: 500 });
    }

    // Validate result
    if (!result || !result.text) {
      console.error('Invalid translation result:', result);
      return NextResponse.json({
        success: false,
        originalText: requestText,
        translatedText: requestText,
        error: 'Invalid translation result',
      }, { status: 500 });
    }

    // Cache the result
    translationCache.set(cacheKey, result.text);

    return NextResponse.json({
      success: true,
      originalText: requestText,
      translatedText: result.text,
      from: result.from.language.iso,
      to: 'ar',
    });
  } catch (error: any) {
    console.error('Translation error:', error);
    // Return original text on error (using stored values, not reading body again)
    return NextResponse.json({
      success: false,
      originalText: requestText,
      translatedText: requestText,
      error: error.message || 'Translation failed',
    }, { status: 500 });
  }
}
