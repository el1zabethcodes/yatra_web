"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, FileSearch, Sparkles } from "lucide-react";
import ResumeAnalyzer from "./ResumeAnalyzer";
import { API_BASE_URL } from "@/shared/constants";

/**
 * бульбашка повідомлення в чаті
 */
function Bubble({ role, text }: { role: string, text: string }) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mr-3 mt-1 border border-surface">
          <Image src="/assets/octopus-mentor.png" alt="Kavi" width={32} height={32} className="object-cover" />
        </div>
      )}
      <div
        className={`
          max-w-[85%] px-5 py-3.5 rounded-3xl text-sm font-medium leading-relaxed
          ${isUser ? "bg-primary text-surface rounded-br-none" : "bg-surface/50 text-primary border border-surface rounded-bl-none"}
        `}
      >
        {!isUser && <span className="block font-black text-secondary mb-1 text-[10px] uppercase tracking-widest">Kavi</span>}
        <span className="whitespace-pre-wrap">{text}</span>
      </div>
    </motion.div>
  );
}

/**
 * індикатор друку
 */
function TypingDots() {
  return (
    <div className="flex justify-start mb-4">
      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mr-3 mt-1 border border-surface">
        <Image src="/assets/octopus-mentor.png" alt="Kavi" width={32} height={32} className="object-cover" />
      </div>
      <div className="px-5 py-4 rounded-3xl bg-surface/50 border border-surface rounded-bl-none">
        <div className="flex gap-1.5 items-center h-4">
          {[0, 1, 2].map((i) => (
            <motion.div 
              key={i} 
              className="w-1.5 h-1.5 rounded-full bg-secondary"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * компонент чату з ментором
 */
function MentorChat() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Ахой, Капітане! Я Каві, ваш персональний ментор. Про що хочете поговорити сьогодні — навички, дорожня карта, підготовка до інтерв'ю чи щось інше?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.text,
      }));

      const res = await fetch(`${API_BASE_URL}/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_message: msg,
          chat_history: history,
        }),
      });

      if (!res.ok) throw new Error();

      const reader = res.body?.getReader();
      if (!reader) throw new Error();

      let fullReply = "";
      setMessages((prev) => [...prev, { role: "assistant", text: "" }]);

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = line.slice(6).trim();
              if (data) {
                fullReply += data;
                setMessages((prev) => {
                  const copy = [...prev];
                  copy[copy.length - 1] = { role: "assistant", text: fullReply };
                  return copy;
                });
              }
            } catch (e) {}
          }
        }
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Зв'язок перервано. Спробуйте знову за мить." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="bg-background border border-surface rounded-[32px] overflow-hidden flex flex-col h-[520px] shadow-sm">
      {/* заголовок чату */}
      <div className="px-6 py-4 flex items-center gap-4 border-b border-surface">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-surface">
          <Image src="/assets/octopus-mentor.png" alt="Kavi" width={40} height={40} className="object-cover" />
        </div>
        <div>
          <p className="text-sm font-black text-primary">Kavi</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] text-secondary font-black uppercase tracking-widest">Онлайн</span>
          </div>
        </div>
        <Sparkles size={16} className="ml-auto text-accent opacity-50" />
      </div>

      {/* повідомлення */}
      <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar">
        {messages.map((m, i) => (
          <Bubble key={i} role={m.role} text={m.text} />
        ))}
        {loading && <TypingDots />}
        <div ref={bottomRef} />
      </div>

      {/* поле вводу */}
      <div className="px-6 py-5 border-t border-surface bg-surface/10">
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Запитайте Каві про вашу кар'єру..."
            rows={1}
            className="flex-1 px-5 py-3.5 rounded-2xl text-sm font-medium text-primary placeholder:text-primary/60 focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all resize-none bg-background border border-surface"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className={`
              w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all
              ${input.trim() && !loading ? "bg-accent text-surface shadow-lg shadow-accent/20" : "bg-surface text-primary/50"}
            `}
            aria-label="Надіслати"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-primary/60 font-bold uppercase tracking-[0.2em] mt-3 ml-1">
          Enter для відправки · Shift+Enter для нового рядка
        </p>
      </div>
    </div>
  );
}

/**
 * головний компонент вкладки ментора
 */
export default function MentorTab() {
  const [view, setView] = useState("chat"); // "chat" | "resume"

  return (
    <div className="space-y-8">
      {/* заголовок */}
      <div className="space-y-2">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Поради від ШІ</p>
        <h1 className="text-3xl font-black text-primary tracking-tight">AI Ментор</h1>
        <p className="text-sm text-primary/50 font-medium max-w-lg">
          Спілкуйтеся з Каві або отримайте глибокий аналіз вашого резюме.
        </p>
      </div>

      {/* перемикач режимів */}
      <div className="flex p-1 bg-surface/30 border border-surface rounded-2xl max-w-md">
        {[
          { id: "chat", icon: MessageCircle, label: "Чат з Каві" },
          { id: "resume", icon: FileSearch, label: "Аналіз резюме" },
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={`
              flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
              ${view === id ? "bg-primary text-surface shadow-md" : "text-primary/60 hover:text-primary/60"}
            `}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* контент */}
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {view === "chat" ? <MentorChat /> : <ResumeAnalyzer />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

