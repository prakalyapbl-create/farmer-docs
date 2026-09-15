import { RAGSearchResult, retrieveKnowledgeBaseContext } from './rag';

export interface AIQueryRequest {
  userQuestion: string;
  preferredLanguage: string;
  documentContext?: string;
}

export interface AIQueryResponse {
  answer: string;
  language: string;
  sources: any[];
  isDemoMode: boolean;
}

const languageNamesMap: Record<string, string> = {
  en: 'English',
  as: 'Assamese (অসমীয়া)',
  bn: 'Bengali (বাংলা)',
  hi: 'Hindi (हिन्दी)',
  ta: 'Tamil (தமிழ்)',
  te: 'Telugu (తెలుగు)',
  kn: 'Kannada (ಕನ್ನಡ)',
  ml: 'Malayalam (മലയാളം)',
  mr: 'Marathi (मराठी)',
  or: 'Odia (ଓଡ଼ିଆ)',
  pa: 'Punjabi (ਪੰਜਾਬੀ)',
  gu: 'Gujarati (ગુજરાતી)',
};

export async function generateAIResponse(req: AIQueryRequest): Promise<AIQueryResponse> {
  const targetLanguage = languageNamesMap[req.preferredLanguage] || 'English';
  const apiKey = process.env.AI_API_KEY;

  // Retrieve RAG Context
  const ragResult: RAGSearchResult = await retrieveKnowledgeBaseContext(
    req.userQuestion,
    req.preferredLanguage
  );

  const systemInstruction = `
System Instruction:
You are Farmer Docx, an agricultural loan AI assistant helping rural farmers.
Respond ONLY in ${targetLanguage}.
Do not switch to another language unless the user explicitly changes their preferred language in the application settings.
Use simple, farmer-friendly vocabulary and short, clear sentences.

Rules:
1. If the uploaded document or source is in English, explain it fully in ${targetLanguage}.
2. For critical legal/banking terms (e.g. Moratorium, Interest Subvention, Penalty Rate), show the original term alongside a simple explanation in ${targetLanguage}.
3. Base your answers strictly on the provided document context and retrieved official knowledge base.
4. If the information is missing from the document or knowledge base, clearly state that it is not available.
5. Do not approve, sanction, or reject loans. Include a disclaimer to consult the issuing bank.
  `.trim();

  // If live Gemini API key is provided, execute real LLM call
  if (apiKey) {
    try {
      const prompt = `${systemInstruction}\n\n[Document Context]\n${req.documentContext || 'No specific document attached.'}\n\n[RAG Context]\n${ragResult.contextText}\n\n[User Question]\n${req.userQuestion}`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await res.json();
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (generatedText) {
        return {
          answer: generatedText,
          language: req.preferredLanguage,
          sources: ragResult.sources,
          isDemoMode: false
        };
      }
    } catch (e) {
      console.error('Live AI generation failed, switching to fallback:', e);
    }
  }

  // DEMO MODE deterministic response engine in target language
  const demoAnswers: Record<string, string> = {
    as: `
আপোনাৰ প্ৰশ্নৰ উত্তৰ আপোনাৰ কৃষি ঋণৰ নথি আৰু চৰকাৰী নিয়ম অনুসৰি:

১. **ঋণৰ পৰিমাণ (Loan Amount):** আপোনাৰ নথিত উল্লেখ কৰা মুঠ ঋণৰ পৰিমাণ হৈছে ₹১,৫০,০০০।
২. **সুদৰ হাৰ (Interest Rate):** বাৰ্ষিক ৭%। সমযমতে ঋণ পৰিশোধ কৰিলে চৰকাৰী ৩% ৰেহাই (Subvention) লাভ কৰিব, ফলত কাৰ্যকৰী সুদৰ হাৰ হ'ব কেৱল ৪%।
৩. **পৰিশোধৰ তাৰিখ (Due Date):** ১৫ জুলাই ২০২৬।

*টোকা:* গুৰুত্বপূৰ্ণ আইনী বা বেংকিং শব্দসমূহৰ বাবে সদায় আপোনাৰ মূল বেংক শাখাৰ সৈতে যোগাযোগ কৰক।
    `.trim(),

    ta: `
உங்கள் கேள்വിക്കான பதில் உங்கள் கடன் ஆவணம் மற்றும் அரசு வழிகாட்டுதல்களின் அடிப்படையில்:

1. **கடன் தொகை (Loan Amount):** உங்கள் ஆவணத்தில் அனுமதிக்கப்பட்ட கடன் தொகை ₹1,50,000 ஆகும்.
2. **வட்டி விகிதம் (Interest Rate):** ஆண்டிற்கு 7%. நீங்கள் கடனை சரியான தவணை தேதியில் செலுத்தினால் 3% அரசு மானியம் (Interest Subvention) கிடைக்கும். இதனால் உங்கள் உண்மையான வட்டி 4% மட்டுமே.
3. **திருப்பிச் செலுத்தும் தேதி (Due Date):** 15 ஜூலை 2026.

*குறிப்பு:* மேலதிக தகவல்களுக்கு உங்கள் கனரா வங்கி கிளையை அணுகவும்.
    `.trim(),

    hi: `
आपके प्रश्न का उत्तर आपके कृषि ऋण दस्तावेज और सरकारी नियमों के अनुसार:

1. **ऋण राशि (Loan Amount):** आपके दस्तावेज में स्वीकृत ऋण राशि ₹1,50,000 है।
2. **ब्याज दर (Interest Rate):** 7% वार्षिक। समय पर भुगतान करने पर 3% सरकारी छूट (Interest Subvention) मिलेगी, जिससे प्रभावी ब्याज दर केवल 4% रह जाएगी।
3. **पुनर्भुगतान तिथि (Due Date):** 15 जुलाई 2026।

*नोट:* अंतिम पुष्टि के लिए अपनी केनरा बैंक शाखा से संपर्क करें।
    `.trim(),

    en: `
Based on your uploaded loan document and official NABARD guidelines:

1. **Loan Amount:** The sanctioned amount under your KCC account is ₹1,50,000.
2. **Interest Rate:** 7.00% per annum base rate. With prompt repayment subvention (3.00%), your effective rate is 4.00%.
3. **Next Repayment Due Date:** 15-Jul-2026.

*Note:* Please confirm final figures with your issuing bank branch.
    `.trim()
  };

  const defaultAnswer = demoAnswers[req.preferredLanguage] || demoAnswers.en;

  return {
    answer: defaultAnswer,
    language: req.preferredLanguage,
    sources: ragResult.sources,
    isDemoMode: true
  };
}
