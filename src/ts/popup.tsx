import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import '../assets/popup.css'; // Import CSS for styling

const Popup = () => {
  async function extractChatMessages(): Promise<string[]> {
    // Function to extract chat messages from ChatGPT (implementation not shown here)
    return ['Hello', 'How are you?', 'Goodbye'];
  }

  function formatMessagesForFlomo(messages: string[]): { topic: string; messages: { bot: string; user: string }[] } {
    const formattedMessages = {
      topic: 'ChatGPT Conversation',
      messages: messages.map((message) => ({ bot: message, user: '' })),
    };
    return formattedMessages;
  }

  async function handleSendChatToFlomo() {
    const chatMessages = await extractChatMessages();
    const formattedMessages = formatMessagesForFlomo(chatMessages);
    // Function to send formatted chat messages to Flomo API (implementation not shown here)
    console.log('Sending chat messages to Flomo:', formattedMessages);
  }

  return (
    <div className="popup-container">
      <h2 className="popup-title">ChatGPT to Flomo</h2>
      <button className="popup-button" onClick={handleSendChatToFlomo}>Send Chat to Flomo</button>
    </div>
  );
};

const root = createRoot(document.getElementById("app")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
