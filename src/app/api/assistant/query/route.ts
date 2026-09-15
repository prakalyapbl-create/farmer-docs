import { NextResponse } from 'next/server';
import { generateAIResponse } from '@/lib/ai';

export async function POST(req: Request) {
  try {
    const { userQuestion, preferredLanguage, documentContext } = await req.json();

    if (!userQuestion) {
      return NextResponse.json({ error: 'Question text is required' }, { status: 400 });
    }

    const aiResult = await generateAIResponse({
      userQuestion,
      preferredLanguage: preferredLanguage || 'en',
      documentContext,
    });

    return NextResponse.json({
      success: true,
      answer: aiResult.answer,
      language: aiResult.language,
      sources: aiResult.sources,
      isDemoMode: aiResult.isDemoMode,
    });
  } catch (error: any) {
    console.error('Assistant API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
