'use client';

import { useChat } from '@ai-sdk/react';
import { Leaf, Send, Loader2, Sprout } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const { messages, sendMessage, error, status } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const isLoading = status === 'streaming' || status === 'awaiting-message';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    console.log('Messages:', messages);
    console.log('Status:', status);
    scrollToBottom();
  }, [messages, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      await sendMessage({ text: input });
      setInput('');
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    await sendMessage({ text: suggestion });
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-4xl flex flex-col h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-leaf-200">
          <div className="bg-leaf-500 p-3 rounded-full">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-leaf-900">PlantPal</h1>
            <p className="text-leaf-700 text-sm">Your friendly houseplant care companion</p>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <Sprout className="w-16 h-16 text-leaf-400 mb-4" />
              <h2 className="text-2xl font-semibold text-leaf-800 mb-2">
                Welcome to PlantPal!
              </h2>
              <p className="text-leaf-600 mb-6 max-w-md">
                I&apos;m here to help you care for your houseplants. Ask me about watering schedules, 
                light requirements, pest problems, or any plant care questions you have.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                {[
                  "Why are my pothos leaves turning yellow?",
                  "How often should I water my snake plant?",
                  "What's the best low-light plant for beginners?",
                  "How do I get rid of fungus gnats?"
                ].map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-3 text-left text-sm bg-white border-2 border-leaf-200 rounded-lg hover:border-leaf-400 hover:bg-leaf-50 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => {
            // Extract text from message - AI SDK v6 uses parts array
            let messageText = '';
            
            console.log('Message object:', message);
            
            if ('parts' in message && Array.isArray(message.parts)) {
              messageText = message.parts
                .filter((part: any) => part.type === 'text')
                .map((part: any) => part.text)
                .join('');
            } else if ('text' in message) {
              messageText = message.text as string;
            } else if ('content' in message && typeof message.content === 'string') {
              messageText = message.content;
            }
            
            console.log('Extracted text:', messageText);
            
            return (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-leaf-500 text-white'
                    : 'bg-white border-2 border-leaf-200 text-leaf-900'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="w-4 h-4 text-leaf-600" />
                    <span className="text-xs font-semibold text-leaf-700">PlantPal</span>
                  </div>
                )}
                <p className="whitespace-pre-wrap">{messageText || JSON.stringify(message)}</p>
              </div>
            </div>
            );
          })}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-white border-2 border-leaf-200">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-leaf-600 animate-spin" />
                  <span className="text-sm text-leaf-700">PlantPal is thinking...</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-red-50 border-2 border-red-200 text-red-800">
                <p className="text-sm">Oops! Something went wrong. Please try again.</p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your plants..."
            className="flex-1 px-4 py-3 rounded-full border-2 border-leaf-300 focus:border-leaf-500 focus:outline-none bg-white text-leaf-900 placeholder-leaf-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-leaf-500 text-white p-3 rounded-full hover:bg-leaf-600 disabled:bg-leaf-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </main>
  );
}
