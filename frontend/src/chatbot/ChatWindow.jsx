import React, { useState } from "react";
import { Send, Bot, User } from "lucide-react";

const ChatWindow = () => {

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello 👋 Welcome to SupportX AI. How can I assist you today?"
    }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {

    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input
    };

    const botMessage = {
      sender: "bot",
      text: "AI is analyzing your request..."
    };

    setMessages([...messages, userMessage, botMessage]);

    setInput("");
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="border-b border-slate-800 p-5 flex items-center justify-between">
        
        <div>
          <h2 className="text-2xl font-bold text-cyan-400">
            AI Support Assistant
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Real-Time Intelligent Customer Support
          </p>
        </div>

        <div className="bg-green-500 h-3 w-3 rounded-full animate-pulse"></div>

      </div>

      {/* Messages */}
      <div className="h-[500px] overflow-y-auto p-6 space-y-5 bg-[#0f172a]">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex items-start gap-3 ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            {msg.sender === "bot" && (
              <div className="bg-cyan-500 p-2 rounded-full">
                <Bot size={18} />
              </div>
            )}

            <div
              className={`max-w-[70%] px-5 py-3 rounded-2xl shadow-lg ${
                msg.sender === "user"
                  ? "bg-cyan-500"
                  : "bg-slate-800"
              }`}
            >
              {msg.text}
            </div>

            {msg.sender === "user" && (
              <div className="bg-slate-700 p-2 rounded-full">
                <User size={18} />
              </div>
            )}

          </div>

        ))}

      </div>

      {/* Input */}
      <div className="p-5 border-t border-slate-800 flex gap-3 bg-slate-900">

        <input
          type="text"
          placeholder="Ask SupportX AI anything..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3 outline-none focus:border-cyan-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="bg-cyan-500 hover:bg-cyan-600 px-6 rounded-2xl transition-all"
        >
          <Send />
        </button>

      </div>

    </div>
  );
};

export default ChatWindow;