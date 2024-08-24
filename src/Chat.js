import React, { useState } from "react";
import axios from "axios";
import "./Chat.css";

function Chat() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!query) return;

    const newMessage = { type: "user", text: query };
    setMessages([...messages, newMessage]);

    try {
      const res = await axios.post("http://localhost:8000/api/v1/chat/", {
        query: query,
        user_id: 1, // Assuming a static user ID for now
      });
      const botResponse = res.data.response;

      setMessages([...messages, newMessage, { type: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Error sending query:", error);
    }

    setQuery("");
  };

  return (
    <div className="chat-container">
      <h2>Chat with the Bot</h2>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === "user" ? "user-message" : "bot-message"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-box">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your question here..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
