import { DOMMessage, DOMMessageResponse } from './types';


function extractChatMessages(): DOMMessageResponse {
  // Function to extract chat messages from ChatGPT
  const elements = document.querySelectorAll<HTMLDivElement>("div.text-message");
  const chatText = Array.from(elements, (element) => element.innerText);
  console.log(chatText, elements);

  const topic = chatText.shift() || "";
  var chatData = chatText.join("\n" + "--------------------------" + "\n");

  const response: DOMMessageResponse = {
    topic: topic,
    content: chatData
  };

  return response;
}

const messagesFromReactAppListener = (msg: DOMMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: DOMMessageResponse) => void) => {
  console.log('[content.js]. Message received', msg);
  const chatMessages = extractChatMessages();
  console.log('[content.js]. Message response', chatMessages);
  sendResponse(chatMessages);
}

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);