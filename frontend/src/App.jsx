import "./App.css";

import React, {
  useState,
  useEffect,
  useRef
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  LayoutDashboard,
  Bot,
  BrainCircuit,
  Activity,
  ShieldCheck,
  Database,
  Radio,
  Users,
  Bell,
  Cpu,
  Sparkles,
  Send,
  Menu,
  Mic,
  MicOff,
  Volume2,
  Upload,
  LogOut,
  BarChart3,
  LineChart as LineChartIcon,
  Globe,
  Server,
  Lock,
  ScanSearch,
  Wifi,
  TrendingUp,
  MessageSquare,
  AudioLines,
  CloudCog,
  Layers3,
  BadgeCheck,
  User,
  Clock3
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";

import { motion } from "framer-motion";

function App() {

  const navigate = useNavigate();

  const messagesEndRef = useRef(null);

  const [sidebarOpen,
    setSidebarOpen] =
    useState(true);

  const [activeSection,
    setActiveSection] =
    useState("assistant");

  const [input,
    setInput] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const [voiceActive,
    setVoiceActive] =
    useState(false);

  const [messages,
    setMessages] =
    useState([
      {
        sender: "bot",
        text:
          "Welcome to SupportX AI Enterprise Platform. AI Assistant connected successfully."
      }
    ]);

  const [analytics,
    setAnalytics] =
    useState({

      total_chats: 1824,

      ai_accuracy: "98.7%",

      active_users: "2,547",

      response_time: "0.8s",

      live_status: "ONLINE"

    });

  const [recentChats,
    setRecentChats] =
    useState([

      {
        user_message:
          "Need refund support",

        bot_response:
          "Refund workflow generated successfully.",

        sentiment:
          "Positive"
      },

      {
        user_message:
          "Reset my account password",

        bot_response:
          "Identity verification initiated.",

        sentiment:
          "Neutral"
      },

      {
        user_message:
          "Voice assistant not responding",

        bot_response:
          "Voice engine restarted successfully.",

        sentiment:
          "Resolved"
      }

    ]);

  // LOGIN CHECK

  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {

      navigate("/login");

    }

  }, [navigate]);

  // CHAT FETCH

  const fetchRecentChats =
    async () => {

      try {

        const response =
          await fetch(
            "http://127.0.0.1:5000/recent-chats"
          );

        const data =
          await response.json();

        setRecentChats(data);

      } catch (err) {

        console.log(err);

      }

    };

  // ANALYTICS FETCH

  const fetchAnalytics =
    async () => {

      try {

        const response =
          await fetch(
            "http://127.0.0.1:5000/analytics"
          );

        const data =
          await response.json();

        setAnalytics(data);

      } catch (err) {

        console.log(err);

      }

    };

  useEffect(() => {

    fetchAnalytics();

    fetchRecentChats();

  }, []);

  // VOICE

  const startVoice = () => {

    if (
      !window.webkitSpeechRecognition
    ) {

      alert(
        "Voice Recognition not supported"
      );

      return;

    }

    const recognition =
      new window.webkitSpeechRecognition();

    recognition.lang =
      "en-US";

    recognition.start();

    setVoiceActive(true);

    recognition.onresult =
      (event) => {

        const transcript =
          event.results[0][0]
            .transcript;

        setInput(transcript);

        setVoiceActive(false);

      };

    recognition.onerror =
      () => {

        setVoiceActive(false);

      };

  };

  // SPEAK AI

  const speakText = (
    text
  ) => {

    const speech =
      new SpeechSynthesisUtterance(
        text
      );

    speech.lang =
      "en-US";

    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(
      speech
    );

  };

  // SEND MESSAGE

  const sendMessage =
    async () => {

      if (!input.trim())
        return;

      const currentInput =
        input;

      const userMessage = {

        sender: "user",

        text: currentInput

      };

      setMessages((prev) => [

        ...prev,

        userMessage

      ]);

      setInput("");

      setLoading(true);

      try {

        const response =
          await fetch(
            "http://127.0.0.1:5000/chat",
            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json"

              },

              body:
                JSON.stringify({

                  message:
                    currentInput

                })

            }
          );

        const data =
          await response.json();

        const botMessage = {

          sender: "bot",

          text:
            data.response

        };

        setMessages((prev) => [

          ...prev,

          botMessage

        ]);

        speakText(
          data.response
        );

        fetchAnalytics();

        fetchRecentChats();

      } catch (error) {

        setMessages((prev) => [

          ...prev,

          {

            sender: "bot",

            text:
              "Realtime AI server temporarily unavailable."

          }

        ]);

      }

      setLoading(false);

    };

  // ENTER KEY

  const handleKeyDown =
    (e) => {

      if (e.key === "Enter") {

        sendMessage();

      }

    };

  // FILE

  const handleFileUpload =
    (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      setMessages((prev) => [

        ...prev,

        {

          sender: "user",

          text:
            "Uploaded File: " +
            file.name

        }

      ]);

    };

  // LOGOUT

  const logoutUser = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "username"
    );

    navigate("/login");

  };

  // CHART DATA

  const chartData = [

    { day: "Mon", chats: 40 },

    { day: "Tue", chats: 65 },

    { day: "Wed", chats: 82 },

    { day: "Thu", chats: 70 },

    { day: "Fri", chats: 120 },

    { day: "Sat", chats: 90 },

    { day: "Sun", chats: 145 }

  ];

  const aiPieData = [

    {
      name: "Resolved",
      value: 78
    },

    {
      name: "Pending",
      value: 14
    },

    {
      name: "Escalated",
      value: 8
    }

  ];

  const COLORS = [

    "#d1d5db",
    "#94a3b8",
    "#64748b"

  ];

  // SECTION RENDER

  const renderSection =
    () => {

      switch (
        activeSection
      ) {

        case "assistant":

          return (

            <>

              <div className="hero-section">

                <div>

                  <h1>
                    AI Assistant
                  </h1>

                  <p>
                    Enterprise NLP +
                    ML Powered AI
                    Platform with
                    voice assistance,
                    sentiment
                    analysis,
                    predictive AI
                    and realtime
                    response engine.
                  </p>

                </div>

                <div className="hero-badge">

                  <BrainCircuit size={18} />

                  Gemini AI Active

                </div>

              </div>

              <div className="cards">

                <StatCard
                  title="NLP Accuracy"
                  value="98%"
                  icon={<Sparkles />}
                />

                <StatCard
                  title="Intent Detection"
                  value="94%"
                  icon={<Cpu />}
                />

                <StatCard
                  title="ML Confidence"
                  value="96%"
                  icon={<BadgeCheck />}
                />

                <StatCard
                  title="Realtime Replies"
                  value="0.8s"
                  icon={<Radio />}
                />

              </div>

              <div className="feature-grid">

                <FeatureCard
                  icon={<Bot />}
                  title="Conversational AI"
                  text="Human-like contextual AI responses powered by NLP."
                />

                <FeatureCard
                  icon={<AudioLines />}
                  title="Voice Assistant"
                  text="Realtime speech recognition and AI voice synthesis."
                />

                <FeatureCard
                  icon={<TrendingUp />}
                  title="Predictive AI"
                  text="Machine learning based customer behavior prediction."
                />

                <FeatureCard
                  icon={<ShieldCheck />}
                  title="Fraud Detection"
                  text="AI anomaly detection and intelligent monitoring."
                />

              </div>

              <div className="content-grid">

                <div className="chat-box">

                  <div className="chat-header">

                    <div>

                      <h2>
                        AI Chatbot
                      </h2>

                      <p>
                        Realtime NLP +
                        ML Assistant
                      </p>

                    </div>

                    <div className="live-indicator">

                      <span></span>

                      LIVE

                    </div>

                  </div>

                  <div className="messages">

                    {messages.map(
                      (
                        msg,
                        index
                      ) => (

                        <div
                          key={index}
                          className={`message-row ${
                            msg.sender ===
                            "user"
                              ? "user-row"
                              : "bot-row"
                          }`}
                        >

                          <div className="message">

                            {msg.sender ===
                              "bot" && (

                              <Avatar
                                icon={
                                  <Bot size={18} />
                                }
                              />

                            )}

                            <div
                              className={`bubble ${
                                msg.sender ===
                                "user"
                                  ? "user-bubble"
                                  : "bot-bubble"
                              }`}
                            >

                              {msg.text}

                            </div>

                            {msg.sender ===
                              "user" && (

                              <Avatar
                                icon={
                                  <User size={18} />
                                }
                              />

                            )}

                          </div>

                        </div>

                      )
                    )}

                    {loading && (

                      <div className="typing">

                        <div className="dot"></div>

                        <div className="dot"></div>

                        <div className="dot"></div>

                      </div>

                    )}

                    <div
                      ref={
                        messagesEndRef
                      }
                    ></div>

                  </div>

                  <div className="input-area">

                    <button
                      className={`icon-btn ${
                        voiceActive
                          ? "mic-active"
                          : ""
                      }`}
                      onClick={
                        startVoice
                      }
                    >

                      {voiceActive ? (
                        <MicOff size={18} />
                      ) : (
                        <Mic size={18} />
                      )}

                    </button>

                    <label className="icon-btn">

                      <Upload size={18} />

                      <input
                        type="file"
                        hidden
                        onChange={
                          handleFileUpload
                        }
                      />

                    </label>

                    <input
                      type="text"
                      className="input"
                      placeholder="Ask AI anything..."
                      value={input}
                      onChange={(e)=>
                        setInput(
                          e.target.value
                        )
                      }
                      onKeyDown={
                        handleKeyDown
                      }
                    />

                    <button
                      className="icon-btn"
                      onClick={() =>
                        speakText(
                          input
                        )
                      }
                    >

                      <Volume2 size={18} />

                    </button>

                    <button
                      className="send-btn"
                      onClick={
                        sendMessage
                      }
                    >

                      <Send size={18} />

                    </button>

                  </div>

                </div>

                <div className="recent-box">

                  <div className="recent-header">

                    <h2>
                      AI Insights
                    </h2>

                  </div>

                  <div className="recent-card">

                    <div className="recent-top">

                      <Server />

                      <span>
                        AI Engine
                      </span>

                    </div>

                    <h3>
                      GPT + Gemini
                      Hybrid
                    </h3>

                    <p>
                      Multi-model AI
                      orchestration
                      enabled.
                    </p>

                  </div>

                  <div className="recent-card">

                    <div className="recent-top">

                      <ScanSearch />

                      <span>
                        Sentiment AI
                      </span>

                    </div>

                    <h3>
                      Emotion
                      Detection
                    </h3>

                    <p>
                      Realtime user
                      sentiment
                      analytics.
                    </p>

                  </div>

                  <div className="recent-card">

                    <div className="recent-top">

                      <Globe />

                      <span>
                        AI Translation
                      </span>

                    </div>

                    <h3>
                      Multi-language
                    </h3>

                    <p>
                      Global customer
                      support enabled.
                    </p>

                  </div>

                </div>

              </div>

            </>

          );

        case "analytics":

          return (

            <>

              <div className="hero-section">

                <div>

                  <h1>
                    AI Analytics
                  </h1>

                  <p>
                    Realtime AI
                    insights,
                    predictive ML
                    analytics and
                    chatbot
                    performance
                    monitoring.
                  </p>

                </div>

              </div>

              <div className="cards">

                <StatCard
                  title="Total AI Queries"
                  value="18.4K"
                  icon={<MessageSquare />}
                />

                <StatCard
                  title="AI Resolution"
                  value="92%"
                  icon={<ShieldCheck />}
                />

                <StatCard
                  title="Escalation Rate"
                  value="6%"
                  icon={<Bell />}
                />

                <StatCard
                  title="Realtime Traffic"
                  value="1.2K"
                  icon={<Wifi />}
                />

              </div>

              <div className="analytics-grid">

                <div className="chart-box">

                  <div className="chart-header">

                    <h2>
                      AI Traffic
                    </h2>

                    <span>
                      Last 7 Days
                    </span>

                  </div>

                  <ResponsiveContainer
                    width="100%"
                    height={300}
                  >

                    <AreaChart
                      data={
                        chartData
                      }
                    >

                      <defs>

                        <linearGradient
                          id="colorChats"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >

                          <stop
                            offset="5%"
                            stopColor="#94a3b8"
                            stopOpacity={
                              0.8
                            }
                          />

                          <stop
                            offset="95%"
                            stopColor="#94a3b8"
                            stopOpacity={
                              0
                            }
                          />

                        </linearGradient>

                      </defs>

                      <XAxis dataKey="day" />

                      <YAxis />

                      <Tooltip />

                      <Area
                        type="monotone"
                        dataKey="chats"
                        stroke="#d1d5db"
                        fillOpacity={
                          1
                        }
                        fill="url(#colorChats)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

                <div className="chart-box">

                  <div className="chart-header">

                    <h2>
                      Ticket Status
                    </h2>

                  </div>

                  <ResponsiveContainer
                    width="100%"
                    height={300}
                  >

                    <PieChart>

                      <Pie
                        data={
                          aiPieData
                        }
                        dataKey="value"
                        outerRadius={
                          100
                        }
                      >

                        {aiPieData.map(
                          (
                            entry,
                            index
                          ) => (

                            <Cell
                              key={index}
                              fill={
                                COLORS[
                                  index
                                ]
                              }
                            />

                          )
                        )}

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </div>

            </>

          );

        case "users":

          return (

            <>

              <div className="hero-section">

                <div>

                  <h1>
                    User Management
                  </h1>

                  <p>
                    AI monitored
                    active sessions,
                    customer
                    engagement and
                    behavior
                    analytics.
                  </p>

                </div>

              </div>

              <div className="cards">

                <StatCard
                  title="Online Users"
                  value="245"
                  icon={<Users />}
                />

                <StatCard
                  title="Resolved Tickets"
                  value="91%"
                  icon={<BadgeCheck />}
                />

                <StatCard
                  title="AI Satisfaction"
                  value="4.8"
                  icon={<Sparkles />}
                />

                <StatCard
                  title="Support Agents"
                  value="34"
                  icon={<User />}
                />

              </div>

              <div className="table-box">

                <div className="table-header">

                  <h2>
                    Active Sessions
                  </h2>

                </div>

                <table>

                  <thead>

                    <tr>

                      <th>
                        User
                      </th>

                      <th>
                        Location
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        AI Score
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    <tr>

                      <td>
                        Sarah
                      </td>

                      <td>
                        USA
                      </td>

                      <td>
                        Active
                      </td>

                      <td>
                        96%
                      </td>

                    </tr>

                    <tr>

                      <td>
                        Michael
                      </td>

                      <td>
                        UK
                      </td>

                      <td>
                        Resolved
                      </td>

                      <td>
                        92%
                      </td>

                    </tr>

                    <tr>

                      <td>
                        Daniel
                      </td>

                      <td>
                        India
                      </td>

                      <td>
                        Waiting
                      </td>

                      <td>
                        88%
                      </td>

                    </tr>

                  </tbody>

                </table>

              </div>

            </>

          );

        case "live":

          return (

            <>

              <div className="hero-section">

                <div>

                  <h1>
                    Live Monitoring
                  </h1>

                  <p>
                    Realtime AI
                    events,
                    websocket
                    tracking and
                    live escalation
                    system.
                  </p>

                </div>

              </div>

              <div className="activity-feed">

                <ActivityItem
                  icon={<Wifi />}
                  title="User connected"
                  time="2 sec ago"
                />

                <ActivityItem
                  icon={<Bot />}
                  title="AI generated response"
                  time="10 sec ago"
                />

                <ActivityItem
                  icon={<Mic />}
                  title="Voice assistant activated"
                  time="22 sec ago"
                />

                <ActivityItem
                  icon={<Database />}
                  title="MongoDB synced"
                  time="1 min ago"
                />

              </div>

            </>

          );

        case "database":

          return (

            <>

              <div className="hero-section">

                <div>

                  <h1>
                    Database Cloud
                  </h1>

                  <p>
                    Realtime cloud
                    storage,
                    AI logs,
                    conversation
                    history and
                    analytics sync.
                  </p>

                </div>

              </div>

              <div className="cards">

                <StatCard
                  title="Collections"
                  value="18"
                  icon={<Layers3 />}
                />

                <StatCard
                  title="Cloud Status"
                  value="LIVE"
                  icon={<CloudCog />}
                />

                <StatCard
                  title="AI Logs"
                  value="14K"
                  icon={<Database />}
                />

                <StatCard
                  title="Server Sync"
                  value="99%"
                  icon={<Server />}
                />

              </div>

            </>

          );

        case "voice":

          return (

            <>

              <div className="hero-section">

                <div>

                  <h1>
                    Voice AI
                  </h1>

                  <p>
                    Realtime speech
                    recognition,
                    text-to-speech
                    synthesis and
                    multilingual AI
                    voice support.
                  </p>

                </div>

              </div>

              <div className="voice-grid">

                <FeatureCard
                  icon={<Mic />}
                  title="Speech Recognition"
                  text="Realtime voice transcription system."
                />

                <FeatureCard
                  icon={<Volume2 />}
                  title="AI Voice Output"
                  text="Human-like speech synthesis."
                />

                <FeatureCard
                  icon={<Globe />}
                  title="Multi-language Voice"
                  text="Global multilingual voice AI support."
                />

                <FeatureCard
                  icon={<Clock3 />}
                  title="Realtime Streaming"
                  text="Low latency audio processing."
                />

              </div>

            </>

          );

        case "security":

          return (

            <>

              <div className="hero-section">

                <div>

                  <h1>
                    Security Center
                  </h1>

                  <p>
                    Enterprise-grade
                    JWT auth,
                    Firebase
                    security,
                    AI threat
                    monitoring and
                    fraud detection.
                  </p>

                </div>

              </div>

              <div className="cards">

                <StatCard
                  title="JWT Tokens"
                  value="Protected"
                  icon={<Lock />}
                />

                <StatCard
                  title="Threat Detection"
                  value="Realtime"
                  icon={<ShieldCheck />}
                />

                <StatCard
                  title="Firebase Auth"
                  value="Connected"
                  icon={<BadgeCheck />}
                />

                <StatCard
                  title="AI Firewall"
                  value="Enabled"
                  icon={<ShieldCheck />}
                />

              </div>

              <div className="security-panel">

                <div className="security-item">

                  <h3>
                    AI Threat Detection
                  </h3>

                  <p>
                    Machine learning
                    based attack
                    pattern analysis.
                  </p>

                </div>

                <div className="security-item">

                  <h3>
                    Secure API Layer
                  </h3>

                  <p>
                    Token validation
                    with encrypted
                    API communication.
                  </p>

                </div>

                <div className="security-item">

                  <h3>
                    Firebase Rules
                  </h3>

                  <p>
                    Advanced
                    authentication
                    and role-based
                    access.
                  </p>

                </div>

              </div>

            </>

          );

        default:

          return null;

      }

    };

  return (

    <div className="app">

      {/* SIDEBAR */}

      {sidebarOpen && (

        <div className="sidebar">

          <div className="logo">

            <h1>
              SupportX AI
            </h1>

            <p>
              Enterprise Intelligence
            </p>

          </div>

          <SidebarItem
            icon={<BrainCircuit />}
            title="AI Assistant"
            subtitle="NLP Engine"
            active={
              activeSection ===
              "assistant"
            }
            onClick={() =>
              setActiveSection(
                "assistant"
              )
            }
          />

          <SidebarItem
            icon={<BarChart3 />}
            title="AI Insights"
            subtitle="Analytics"
            active={
              activeSection ===
              "analytics"
            }
            onClick={() =>
              setActiveSection(
                "analytics"
              )
            }
          />

          <SidebarItem
            icon={<Users />}
            title="Users"
            subtitle="Sessions"
            active={
              activeSection ===
              "users"
            }
            onClick={() =>
              setActiveSection(
                "users"
              )
            }
          />

          <SidebarItem
            icon={<Activity />}
            title="Live Activity"
            subtitle="Realtime"
            active={
              activeSection ===
              "live"
            }
            onClick={() =>
              setActiveSection(
                "live"
              )
            }
          />

          <SidebarItem
            icon={<Database />}
            title="Database"
            subtitle="Cloud Storage"
            active={
              activeSection ===
              "database"
            }
            onClick={() =>
              setActiveSection(
                "database"
              )
            }
          />

          <SidebarItem
            icon={<Mic />}
            title="Voice AI"
            subtitle="Speech AI"
            active={
              activeSection ===
              "voice"
            }
            onClick={() =>
              setActiveSection(
                "voice"
              )
            }
          />

          <SidebarItem
            icon={<ShieldCheck />}
            title="Security"
            subtitle="JWT + Firebase"
            active={
              activeSection ===
              "security"
            }
            onClick={() =>
              setActiveSection(
                "security"
              )
            }
          />

          <div className="ai-status-box">

            <h3>
              AI System Status
            </h3>

            <div className="status-line">

              <span className="green-dot"></span>

              NLP Active

            </div>

            <div className="status-line">

              <span className="green-dot"></span>

              ML Engine Running

            </div>

            <div className="status-line">

              <span className="green-dot"></span>

              Gemini Connected

            </div>

            <div className="status-line">

              <span className="green-dot"></span>

              Voice Streaming Enabled

            </div>

          </div>

        </div>

      )}

      {/* MAIN */}

      <div className="main">

        <div className="topbar">

          <button
            className="menu-btn"
            onClick={() =>
              setSidebarOpen(
                !sidebarOpen
              )
            }
          >

            <Menu />

          </button>

          <div className="top-right">

            <div className="system-status">

              <span></span>

              AI System Active

            </div>

            <button
              className="logout-btn"
              onClick={
                logoutUser
              }
            >

              <LogOut size={16} />

              Logout

            </button>

          </div>

        </div>

        {renderSection()}

      </div>

    </div>

  );

}

// SIDEBAR ITEM

function SidebarItem({

  icon,

  title,

  subtitle,

  active,

  onClick

}) {

  return (

    <div
      className={`sidebar-item ${
        active
          ? "sidebar-active"
          : ""
      }`}
      onClick={onClick}
    >

      <div className="sidebar-icon">

        {icon}

      </div>

      <div>

        <span>{title}</span>

        <p className="sidebar-subtitle">

          {subtitle}

        </p>

      </div>

    </div>

  );

}

// STAT CARD

function StatCard({

  title,

  value,

  icon

}) {

  return (

    <motion.div
      whileHover={{
        y: -5
      }}
      className="card"
    >

      <div className="card-top">

        <div className="card-icon">

          {icon}

        </div>

      </div>

      <h3>{title}</h3>

      <h1>{value}</h1>

    </motion.div>

  );

}

// FEATURE

function FeatureCard({

  icon,

  title,

  text

}) {

  return (

    <motion.div
      whileHover={{
        y: -5
      }}
      className="feature-card"
    >

      <div className="feature-icon">

        {icon}

      </div>

      <h3>{title}</h3>

      <p>{text}</p>

    </motion.div>

  );

}

// AVATAR

function Avatar({

  icon

}) {

  return (

    <div className="avatar">

      {icon}

    </div>

  );

}

// ACTIVITY

function ActivityItem({

  icon,

  title,

  time

}) {

  return (

    <div className="activity-item">

      <div className="activity-icon">

        {icon}

      </div>

      <div>

        <h3>{title}</h3>

        <p>{time}</p>

      </div>

    </div>

  );

}

export default App;
