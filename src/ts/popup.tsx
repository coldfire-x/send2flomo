import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import '../../public/assets/popup.css'; // Import CSS for styling
import { DOMMessage, DOMMessageResponse } from './types';

const Popup = () => {
  // Function to display an alert message
  function showAlertMessage(message: string) {
    window.alert(message);
  }

  function formatMessagesForFlomo(data: DOMMessageResponse): string {
    console.log(data);
    const formattedMessages = `#gpt-chat/${data.topic} \n ${data.content}`;
    return formattedMessages;
  }

  // Function to send formatted chat messages to Flomo API
  async function sendMessagesToFlomo(data: string): Promise<boolean> {
    const apiUrl = localStorage.getItem('flomoApiUrl'); // Flomo API endpoint
    if (apiUrl === null) {
      console.log("Returned value is null");
      showAlertMessage("set flomo api first!");
      return false;
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({content: data}),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      if (!response.ok) {
        throw new Error('Failed to send messages to Flomo API');
      }
      console.log('Messages sent to Flomo API successfully');
      return true;
    } catch (error) {
      console.error('Error sending messages to Flomo API:', error);
      return false;
    }
  }

  async function handleSendChatToFlomo() {
      /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
      chrome.tabs && chrome.tabs.query({
        active: true,
        currentWindow: true
      }, tabs => {
        /**
         * Sends a single message to the content script(s) in the specified tab,
         * with an optional callback to run when a response is sent back.
         *
         * The runtime.onMessage event is fired in each content script running
         * in the specified tab for the current extension.
         */
        chrome.tabs.sendMessage(
          tabs[0].id || 0,
          { type: 'GET_DOM' } as DOMMessage,
          (response: DOMMessageResponse) => {
            const formattedMessages = formatMessagesForFlomo(response);
            // Function to send formatted chat messages to Flomo API (implementation not shown here)
            console.log('Sending chat messages to Flomo:', formattedMessages);
            sendMessagesToFlomo(formattedMessages);
          });
      });
  }

  return (
    <div className="popup-container">
      <h2 className="popup-title">GPT to flomo</h2>
      <button className="popup-button" onClick={handleSendChatToFlomo}>Send2flomo</button>
    </div>
  );
};

const root = createRoot(document.getElementById("app")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
