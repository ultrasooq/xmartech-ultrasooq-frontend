import { NextRequest, NextResponse } from 'next/server';
import translate from 'google-translate-api-x';

// Simple in-memory cache (consider using Redis in production for better performance)
const translationCache = new Map<string, string>();

export async function POST(request: NextRequest) {
  let requestTexts: string[] = [];
  let requestTo = 'ar';

  try {
    // Read body once and store values
    const body = await request.json();
    requestTexts = Array.isArray(body.texts) ? body.texts : [];
    requestTo = body.to || 'ar';

    if (!requestTexts.length || !requestTo) {
      return NextResponse.json(
        { error: 'Texts array and target language (to) are required' },
        { status: 400 }
      );
    }

    // Only translate to Arabic
    if (requestTo !== 'ar') {
      return NextResponse.json({
        success: true,
        translations: requestTexts.map(text => ({
          originalText: text,
          translatedText: text,
        })),
      });
    }

    // Process translations in parallel, checking cache first
    const translationPromises = requestTexts.map(async (text) => {
      const trimmedText = text.trim();
      if (!trimmedText) {
        return { originalText: text, translatedText: text };
      }

      const cacheKey = `${trimmedText}_${requestTo}`;
      
      // Check cache first
      if (translationCache.has(cacheKey)) {
        return {
          originalText: text,
          translatedText: translationCache.get(cacheKey)!,
          cached: true,
        };
      }

      try {
        // Translate using google-translate-api-x
        const result = await translate(trimmedText, {
          from: 'auto',
          to: 'ar',
        });

        // Validate result
        if (!result || !result.text) {
          return { originalText: text, translatedText: text };
        }

        // Cache the result
        translationCache.set(cacheKey, result.text);

        return {
          originalText: text,
          translatedText: result.text,
          from: result.from.language.iso,
        };
      } catch (error: any) {
        console.error('Translation error for:', trimmedText.substring(0, 50), error);
        // Cache original to avoid retrying
        translationCache.set(cacheKey, text);
        return { originalText: text, translatedText: text };
      }
    });

    const translations = await Promise.all(translationPromises);

    return NextResponse.json({
      success: true,
      translations,
    });
  } catch (error: any) {
    console.error('Batch translation error:', error);
    // Return original texts on error
    return NextResponse.json({
      success: false,
      translations: requestTexts.map(text => ({
        originalText: text,
        translatedText: text,
      })),
      error: error.message || 'Translation failed',
    }, { status: 500 });
  }
}
