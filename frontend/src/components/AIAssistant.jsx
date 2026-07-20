import React, { useState } from "react";
import axios from "axios";

function AIAssistant() {

  const [messages, setMessages] =
    useState([
      {
        sender: "bot",  
        text:
          "Hello 👋 Welcome to SupportX AI"
      }
    ]);

  const [input, setInput] =
    useState("");

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input
    };

    setMessages(prev => [
      ...prev,
      userMessage
    ]);

    try {

      const response =
  await axios.post(
    `${import.meta.env.VITE_API_URL}/chat`,
    {
      message: input
    }
  );

      const botMessage = {
        sender: "bot",
        text: response.data.response
      };

      setMessages(prev => [
        ...prev,
        botMessage
        
      ]);

    } catch {

      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text:
            "Backend Error"
        }
      ]);

    }

    setInput("");

  };

  return (

    <div className="page">

      <h1 className="page-title">
        AI Assistant
      </h1>

      <p className="page-subtitle">
        NLP + ML Powered Chatbot Platform
      </p>

      <div className="hero">

        <h2>
          AI Powered <span>Customer Support</span>
        </h2>

        <p>
          Multi-channel chatbot with
          NLP, ML prediction,
          voice AI, analytics and
          live escalation.
        </p>

      </div>

      <div className="cards">

        <div className="card">
          <h3>NLP Accuracy</h3>
          <h1>98%</h1>
        </div>

        <div className="card">
          <h3>Intent Detection</h3>
          <h1>94%</h1>
        </div>

        <div className="card">
          <h3>ML Confidence</h3>
          <h1>96%</h1>
        </div>

      </div>

      <div className="section-box">

        <h2>AI Chatbot</h2>

        <div className="chat-box">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`message ${
                msg.sender === "user"
                  ? "user"
                  : "bot"
              }`}
            >

              {msg.text}

            </div>

          ))}

        </div>

        <div className="input-area">

          <input
            placeholder="Ask AI..."
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
          />

          <button
            className="send-btn"
            onClick={sendMessage}
          >
            Send
          </button>

        </div>

      </div>

    </div>

  );
}

export default AIAssistant;
