'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Bot, Send, Mic, Volume2, Sparkles, BookOpen, ShieldCheck, User } from 'lucide-react';

export default function AssistantPage() {
  const { t, language } = useLanguage();

  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; sources?: any[] }>>([
    {
      sender: 'assistant',
      text: language === 'as'
        ? 'নমস্কাৰ! মই আপোনাৰ কৃষি ঋণ AI সহায়ক। আপোনাৰ ঋণ বা আঁচনি সম্পৰ্কে যিকোনো প্ৰশ্ন সোধক।'
        : language === 'ta'
        ? 'வணக்கம்! நான் உங்கள் விவசாயக் கடன் AI உதவியாளர். உங்கள் கடன் அல்லது திட்டங்கள் குறித்து எதுவும் கேட்கலாம்.'
        : language === 'hi'
        ? 'नमस्ते! मैं आपका कृषि ऋण AI सहायक हूं। अपने ऋण या योजनाओं के बारे में कोई भी प्रश्न पूछें।'
        : 'Hello! I am your Farmer Docx AI Assistant. Ask me anything about your uploaded loan documents or government schemes.'
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const suggestedQuestions = [
    'What is my sanctioned loan amount?',
    'What is the interest rate and government subsidy?',
    'When is my next repayment due date?',
    'What happens if I pay late?',
    'What does moratorium mean in agricultural loans?',
    'Which documents are required for KCC renewal?'
  ];

  const handleSend = async (questionText?: string) => {
    const query = questionText || input;
    if (!query.trim() || loading) return;

    const newMessages = [...messages, { sender: 'user' as const, text: query }];
    setMessages(newMessages);
    if (!questionText) setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('farmer_docx_token');
      const res = await fetch('/api/assistant/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          userQuestion: query,
          preferredLanguage: language
        })
      });

      const data = await res.json();
      if (res.ok) {
        setMessages([
          ...newMessages,
          {
            sender: 'assistant',
            text: data.answer,
            sources: data.sources
          }
        ]);
      } else {
        throw new Error(data.error);
      }
    } catch (e: any) {
      setMessages([
        ...newMessages,
        {
          sender: 'assistant',
          text: 'Error generating AI response. Please try again.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoicePlay = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-black">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900">{t('nav.assistant')}</h1>
            <p className="text-xs text-gray-500">
              RAG Knowledge Base Active • Strictly Responding in <strong className="text-emerald-800 uppercase">{language}</strong>
            </p>
          </div>
        </div>

        <div className="px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-full">
          AI & RAG Grounded
        </div>
      </div>

      {/* Suggested Questions Pills */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-gray-500 uppercase">{t('chat.suggested')}</div>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 bg-white hover:bg-emerald-50 border border-gray-200 text-gray-700 hover:text-emerald-900 text-xs font-semibold rounded-xl transition-colors text-left"
            >
              💡 {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm min-h-[400px] max-h-[550px] overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                m.sender === 'user' ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-emerald-400'
              }`}
            >
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed space-y-2 ${
                m.sender === 'user'
                  ? 'bg-emerald-700 text-white rounded-tr-none'
                  : 'bg-slate-50 border border-slate-200 text-slate-900 rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-line font-medium">{m.text}</p>

              {m.sender === 'assistant' && (
                <div className="pt-2 flex items-center justify-between border-t border-slate-200/60 text-xs text-slate-500">
                  <button
                    onClick={() => handleVoicePlay(m.text)}
                    className="flex items-center gap-1 text-emerald-700 font-bold hover:underline"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    Read Aloud ({language.toUpperCase()})
                  </button>
                </div>
              )}

              {/* RAG Source Citations */}
              {m.sources && m.sources.length > 0 && (
                <div className="pt-2 border-t border-slate-200/80 space-y-1">
                  <div className="text-[10px] font-bold text-emerald-800 uppercase flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    Official Sources Cited:
                  </div>
                  {m.sources.map((src: any, sIdx: number) => (
                    <div key={sIdx} className="text-[11px] bg-white p-2 rounded-lg border border-slate-200 text-slate-700">
                      <strong>{src.documentTitle}</strong> ({src.section})
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 animate-pulse p-2">
            <Bot className="w-4 h-4" />
            Analyzing document & knowledge base in {language.toUpperCase()}...
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="bg-white rounded-2xl border border-gray-200 p-2 shadow-sm flex items-center gap-2">
        <button
          onClick={() => handleSend('Voice Assistant Query')}
          className="p-3 text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
          title="Voice Assistant Input"
        >
          <Mic className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-grow px-3 py-2 text-sm border-none focus:outline-none focus:ring-0"
          placeholder={t('chat.placeholder')}
        />

        <button
          onClick={() => handleSend()}
          disabled={loading}
          className="p-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-sm transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
